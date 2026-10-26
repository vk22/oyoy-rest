import { describe, expect, it } from "vitest";
import {
  buildBookingLink,
  buildCatalog,
  buildRestaurantInfo,
  filterItems,
  listCategoryNames,
  type MenuDocLike,
} from "../restaurantData";
import { UnknownCategoryError } from "../restaurantTypes";

/**
 * Fixture docs modeled on the real shape found in dump/oyoy.menus.json
 * (same field names/values as the live CMS), isolated here as test-only
 * data — never served to a page, REST route or MCP tool.
 */
const FIXTURE_DOCS: MenuDocLike[] = [
  {
    _id: "sec-crudo",
    section: "Crudo",
    category: "food",
    order: 0,
    published: true,
    updatedAt: "2024-01-01T00:00:00.000Z",
    content: [
      { title: "Fresh Oyster Gillardeau", ingredients: "Served with Lemon", price: "4.9", type: "Seafood" },
      {
        title: "Five Fresh Oysters",
        ingredients: "Served with Lemon and a Variety of Sauces",
        price: "23.5",
        type: "Seafood",
      },
    ],
  },
  {
    _id: "sec-main",
    section: "Main Course",
    category: "food",
    order: 1,
    published: true,
    updatedAt: "2024-02-01T00:00:00.000Z",
    content: [
      { title: "Full Fish Of The Day", ingredients: "Ceviche, Sashimi, Tacos", price: "Market price", type: "Seafood" },
    ],
  },
  {
    _id: "sec-draft",
    section: "Secret Specials",
    category: "food",
    order: 2,
    published: false,
    content: [{ title: "Hidden Dish", price: "10" }],
  },
  {
    _id: "sec-wine",
    section: "Red Wine",
    category: "drinks",
    order: 3,
    published: true,
    updatedAt: "2024-01-15T00:00:00.000Z",
    content: [{ title: "House Red", price: "7.9" }],
  },
];

describe("buildCatalog", () => {
  const menus = buildCatalog(FIXTURE_DOCS);

  it("groups into the two public menus with the right titles", () => {
    const food = menus.find((m) => m.id === "food");
    const drinks = menus.find((m) => m.id === "drinks");
    expect(food?.title).toBe("Menu");
    expect(drinks?.title).toBe("Wine List");
  });

  it("excludes unpublished/draft sections entirely", () => {
    const names = menus.flatMap((m) => m.categories.map((c) => c.name));
    expect(names).not.toContain("Secret Specials");
  });

  it("gives every item EUR currency and a /menu#section sourceUrl", () => {
    const allItems = menus.flatMap((m) => m.categories.flatMap((c) => c.items));
    for (const item of allItems) {
      expect(item.currency).toBe("EUR");
      expect(item.sourceUrl).toMatch(/^https:\/\/oyoyrestaurant\.com\/full-menu#/);
    }
  });

  it("takes the latest category updatedAt as the menu updatedAt", () => {
    const food = menus.find((m) => m.id === "food");
    expect(food?.updatedAt).toBe("2024-02-01T00:00:00.000Z");
  });
});

describe("listCategoryNames", () => {
  it("only lists categories from published sections", () => {
    expect(listCategoryNames(FIXTURE_DOCS).sort()).toEqual(["Crudo", "Main Course", "Red Wine"]);
  });
});

describe("filterItems", () => {
  it("returns every published item when no filters are given", () => {
    const { items, appliedFilters } = filterItems(FIXTURE_DOCS, {});
    expect(items).toHaveLength(4);
    expect(appliedFilters.limit).toBe(20);
  });

  it("matches query case-insensitively against name/description/category", () => {
    const { items } = filterItems(FIXTURE_DOCS, { query: "oyster" });
    expect(items.map((i) => i.name).sort()).toEqual(["Five Fresh Oysters", "Fresh Oyster Gillardeau"]);
  });

  it("returns an honest empty list for a query with no matches", () => {
    const { items } = filterItems(FIXTURE_DOCS, { query: "sushi" });
    expect(items).toEqual([]);
  });

  it("filters by category case-insensitively and normalizes to the canonical name", () => {
    const { items, appliedFilters } = filterItems(FIXTURE_DOCS, { category: "crudo" });
    expect(items).toHaveLength(2);
    expect(appliedFilters.category).toBe("Crudo");
  });

  it("throws UnknownCategoryError with the real available categories for an unknown category", () => {
    try {
      filterItems(FIXTURE_DOCS, { category: "Desserts" });
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(UnknownCategoryError);
      expect((error as UnknownCategoryError).availableCategories.sort()).toEqual([
        "Crudo",
        "Main Course",
        "Red Wine",
      ]);
    }
  });

  it("maxPrice only matches fixed-price items and reports non-fixed ones as excludedByBudget", () => {
    const { items, excludedByBudget } = filterItems(FIXTURE_DOCS, { maxPrice: 5 });
    expect(items.map((i) => i.name)).toEqual(["Fresh Oyster Gillardeau"]);
    expect(excludedByBudget).toHaveLength(1);
    expect(excludedByBudget[0].name).toBe("Full Fish Of The Day");
    expect(excludedByBudget[0].reason).toMatch(/market/);
  });

  it("respects limit", () => {
    const { items } = filterItems(FIXTURE_DOCS, { limit: 1 });
    expect(items).toHaveLength(1);
  });
});

describe("buildRestaurantInfo", () => {
  it("flags hours/features as missing and surfaces known company fields", () => {
    const restaurant = buildRestaurantInfo({
      address: "94 Triq Spinola St, Saint Julian's, Malta",
      phone: "+356 7778 8007",
      email: "info@oyoyrest.com",
      coords: "35.919872,14.492764",
    });

    expect(restaurant.weeklyOpeningHours).toBeNull();
    expect(restaurant.missingFields).toContain("weeklyOpeningHours");
    expect(restaurant.missingFields).not.toContain("address");
    expect(restaurant.geo).toEqual({ latitude: 35.919872, longitude: 14.492764 });
    expect(restaurant.currency).toBe("EUR");
    expect(restaurant.timezone).toBe("Europe/Malta");
  });

  it("marks address/telephone/email/geo as missing when there is no company doc", () => {
    const restaurant = buildRestaurantInfo(null);
    expect(restaurant.address).toBeNull();
    expect(restaurant.geo).toBeNull();
    for (const field of ["address", "telephone", "email", "geo"]) {
      expect(restaurant.missingFields).toContain(field);
    }
  });
});

describe("buildBookingLink", () => {
  it("is explicit that it cannot check or create a reservation", () => {
    const booking = buildBookingLink();
    expect(booking.provider).toBe("TheFork");
    expect(booking.bookingMode).toBe("external");
    expect(booking.canCheckAvailability).toBe(false);
    expect(booking.bookingUrl).toBe("https://oyoyrestaurant.com/reservations");
  });
});
