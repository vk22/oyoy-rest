import { parsePrice } from "./pricing";
import {
  CANONICAL_BASE_URL,
  DEFAULT_SEARCH_LIMIT,
  MAX_SEARCH_LIMIT,
  UnknownCategoryError,
  type BookingLink,
  type Menu,
  type MenuCategory,
  type MenuItem,
  type Restaurant,
  type SearchMenuInput,
} from "./restaurantTypes";

/** Raw shape of a Mongoose `Menu` document (server/models/menu-model.js). */
export interface MenuDocLike {
  _id: unknown;
  section?: string;
  category?: string;
  order?: number;
  published?: boolean;
  updatedAt?: Date | string | null;
  content?: Array<{
    title?: string;
    ingredients?: string;
    price?: string | number;
    type?: string;
  }>;
}

/** Raw shape of the Mongoose `Company` document (server/models/company-model.js). */
export interface CompanyDocLike {
  address?: string;
  phone?: string;
  email?: string;
  coords?: string;
  updatedAt?: Date | string | null;
}

const MENU_TITLES: Record<string, string> = {
  food: "Menu",
  drinks: "Wine List",
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function toIsoOrNull(value: Date | string | null | undefined): string | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * Maps one Menu section document into the shared MenuCategory shape.
 * Item ids are derived (`${sectionId}:${index}`) because the CMS stores
 * menu items as plain array entries with no stable id of their own; the id
 * therefore changes if items are reordered, which is documented in
 * docs/ai-access.md.
 */
export function mapMenuDoc(doc: MenuDocLike): { menuId: string; category: MenuCategory } {
  const categoryId = String(doc._id);
  const categoryName = doc.section ?? "Untitled";
  const sectionSlug = slugify(categoryName);
  const menuId = doc.category === "drinks" ? "drinks" : "food";
  const updatedAt = toIsoOrNull(doc.updatedAt);

  const items: MenuItem[] = (doc.content ?? []).map((raw, index) => {
    const { price, pricingType } = parsePrice(raw.price);
    return {
      id: `${categoryId}:${index}`,
      categoryId,
      category: categoryName,
      menuId,
      name: (raw.title ?? "").trim(),
      description: raw.ingredients?.trim() || null,
      price,
      currency: "EUR",
      pricingType,
      unit: null,
      status: doc.published ? "published" : "unavailable",
      dietaryTags: "unknown",
      allergens: "unknown",
      sourceUrl: `${CANONICAL_BASE_URL}/full-menu#${sectionSlug}`,
      updatedAt,
    };
  });

  return { menuId, category: { id: categoryId, name: categoryName, items } };
}

/** Groups published menu documents into the two public menus (food / drinks). */
export function buildCatalog(docs: MenuDocLike[]): Menu[] {
  const byMenu = new Map<string, { categories: MenuCategory[]; updatedAt: string | null }>();

  for (const doc of docs) {
    if (!doc.published) continue;
    const { menuId, category } = mapMenuDoc(doc);
    const publishedItems = category.items.filter((item) => item.status === "published");
    if (!publishedItems.length) continue;

    const entry = byMenu.get(menuId) ?? { categories: [], updatedAt: null };
    entry.categories.push({ ...category, items: publishedItems });
    const categoryUpdatedAt = toIsoOrNull(doc.updatedAt);
    if (categoryUpdatedAt && (!entry.updatedAt || categoryUpdatedAt > entry.updatedAt)) {
      entry.updatedAt = categoryUpdatedAt;
    }
    byMenu.set(menuId, entry);
  }

  return Array.from(byMenu.entries()).map(([menuId, { categories, updatedAt }]) => ({
    id: menuId,
    title: MENU_TITLES[menuId] ?? menuId,
    language: "en" as const,
    currency: "EUR" as const,
    updatedAt,
    categories,
  }));
}

function flattenPublishedItems(docs: MenuDocLike[]): MenuItem[] {
  return buildCatalog(docs).flatMap((menu) => menu.categories.flatMap((cat) => cat.items));
}

export function listCategoryNames(docs: MenuDocLike[]): string[] {
  const names = new Set<string>();
  for (const doc of docs) {
    if (doc.published && doc.section) names.add(doc.section);
  }
  return Array.from(names);
}

export interface FilterResult {
  items: MenuItem[];
  excludedByBudget: Array<{ id: string; name: string; reason: string }>;
  appliedFilters: { query?: string; category?: string; maxPrice?: number; limit: number };
}

/**
 * Deterministic, case-insensitive filtering — no LLM calls, as required.
 * `maxPrice` only ever matches `pricingType === 'fixed'` items; from/market/
 * unknown items are reported in `excludedByBudget` with a reason instead of
 * silently disappearing or falsely satisfying the budget.
 */
export function filterItems(
  allDocs: MenuDocLike[],
  input: SearchMenuInput,
): FilterResult {
  const limit = input.limit ?? DEFAULT_SEARCH_LIMIT;
  const appliedFilters: FilterResult["appliedFilters"] = { limit };
  if (input.query) appliedFilters.query = input.query;
  if (input.maxPrice !== undefined) appliedFilters.maxPrice = input.maxPrice;

  if (input.category) {
    const available = listCategoryNames(allDocs);
    const match = available.find((name) => name.toLowerCase() === input.category!.toLowerCase());
    if (!match) {
      throw new UnknownCategoryError(input.category, available);
    }
    appliedFilters.category = match;
  }

  let items = flattenPublishedItems(allDocs);

  if (appliedFilters.category) {
    items = items.filter((item) => item.category === appliedFilters.category);
  }

  if (input.query) {
    const needle = input.query.toLowerCase();
    items = items.filter((item) => {
      const haystack = [item.name, item.description ?? "", item.category].join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }

  const excludedByBudget: FilterResult["excludedByBudget"] = [];
  if (input.maxPrice !== undefined) {
    const maxPrice = input.maxPrice;
    items = items.filter((item) => {
      if (item.pricingType !== "fixed") {
        excludedByBudget.push({
          id: item.id,
          name: item.name,
          reason: `pricingType is "${item.pricingType}", so a fixed price under the budget cannot be confirmed`,
        });
        return false;
      }
      if (item.price === null || item.price > maxPrice) return false;
      return true;
    });
  }

  return { items: items.slice(0, limit), excludedByBudget, appliedFilters };
}

const SOCIAL_LINKS = [
  "https://www.instagram.com/oyoyrestaurant?igsh=M3h3NDcyMml6MGp2",
  "https://www.facebook.com/oyoy.mlt",
  "https://www.tiktok.com/@oyoyrestaurant",
];

function parseCoords(coords: string | undefined): { latitude: number; longitude: number } | null {
  if (!coords) return null;
  const [lat, lng] = coords.split(",").map((part) => Number.parseFloat(part.trim()));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { latitude: lat, longitude: lng };
}

/**
 * Builds the single Restaurant record from the Company document plus the
 * small set of facts already published elsewhere on the live site
 * (cuisine/description in pages/index.vue, social links in Footer.vue).
 * Opening hours have no source anywhere in the repo or DB, so they stay
 * `null` rather than being guessed, per the spec's explicit instruction.
 */
export function buildRestaurantInfo(company: CompanyDocLike | null): Restaurant {
  const missingFields: string[] = ["weeklyOpeningHours", "specialOpeningHours", "features"];
  const geo = parseCoords(company?.coords);
  if (!geo) missingFields.push("geo");
  if (!company?.address) missingFields.push("address");
  if (!company?.phone) missingFields.push("telephone");
  if (!company?.email) missingFields.push("email");

  return {
    id: "oyoy-restaurant",
    name: "OyOy Restaurant",
    description:
      "Mediterranean restaurant with views on Spinola Bay, St Julian's, Malta.",
    canonicalUrl: `${CANONICAL_BASE_URL}/`,
    address: company?.address ?? null,
    geo,
    telephone: company?.phone ?? null,
    email: company?.email ?? null,
    timezone: "Europe/Malta",
    cuisines: ["Mediterranean"],
    currency: "EUR",
    weeklyOpeningHours: null,
    specialOpeningHours: [],
    features: [],
    bookingUrl: `${CANONICAL_BASE_URL}/reservations`,
    socialLinks: SOCIAL_LINKS,
    updatedAt: toIsoOrNull(company?.updatedAt),
    sourceUrl: `${CANONICAL_BASE_URL}/`,
    missingFields,
  };
}

export function buildBookingLink(): BookingLink {
  return {
    bookingUrl: `${CANONICAL_BASE_URL}/reservations`,
    provider: "TheFork",
    bookingMode: "external",
    canCheckAvailability: false,
    disclaimer:
      "Availability and completion of the booking must be verified and finished in the TheFork widget embedded on /reservations. This link does not create, confirm, or guarantee a reservation.",
    sourceUrl: `${CANONICAL_BASE_URL}/reservations`,
  };
}

export { flattenPublishedItems };
