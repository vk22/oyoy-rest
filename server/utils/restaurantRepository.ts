import mongoose from "mongoose";
import { Company } from "~~/server/models/company-model";
import { Menu as MenuModel } from "~~/server/models/menu-model";
import {
  buildBookingLink,
  buildCatalog,
  buildRestaurantInfo,
  filterItems,
  type CompanyDocLike,
  type MenuDocLike,
} from "./restaurantData";
import {
  CANONICAL_BASE_URL,
  type BookingLink,
  type Menu,
  type Restaurant,
  type SearchMenuInput,
  type SearchMenuResult,
} from "./restaurantTypes";

/**
 * The only place in the app that talks to Mongoose for restaurant/menu data.
 * REST routes, the MCP tools and the /menu page's data endpoint all go
 * through these functions so they stay consistent (same price, currency,
 * unit for a given item everywhere).
 */

/**
 * Mirrors the "mongoUnavailable" fallback already used by server/api/menu
 * and friends: if Mongo isn't connected, return the empty/unknown shape
 * instead of letting a buffered Mongoose call hang or throw.
 */
function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

async function loadMenuDocs(): Promise<MenuDocLike[]> {
  if (!isMongoConnected()) return [];
  try {
    const docs = await MenuModel.find({ published: true }).sort({ order: 1 }).lean();
    return docs as unknown as MenuDocLike[];
  } catch (error) {
    console.error("Failed to load menu for public/MCP access", error);
    return [];
  }
}

async function loadCompanyDoc(): Promise<CompanyDocLike | null> {
  if (!isMongoConnected()) return null;
  try {
    const doc = await Company.findOne().lean();
    return (doc as unknown as CompanyDocLike) ?? null;
  } catch (error) {
    console.error("Failed to load company for public/MCP access", error);
    return null;
  }
}

export async function getRestaurantInfo(): Promise<Restaurant> {
  const company = await loadCompanyDoc();
  return buildRestaurantInfo(company);
}

/** Full published catalog, grouped by menu/category — used only by the /menu page. */
export async function getFullMenuCatalog(): Promise<Menu[]> {
  const docs = await loadMenuDocs();
  return buildCatalog(docs);
}

/** Bounded search used by both GET /api/public/menu and the MCP search_menu tool. */
export async function searchMenuItems(input: SearchMenuInput): Promise<SearchMenuResult> {
  const docs = await loadMenuDocs();
  const { items, excludedByBudget, appliedFilters } = filterItems(docs, input);

  const updatedAt = docs.reduce<string | null>((latest, doc) => {
    const value = doc.updatedAt ? new Date(doc.updatedAt).toISOString() : null;
    if (!value) return latest;
    return !latest || value > latest ? value : latest;
  }, null);

  return {
    items,
    appliedFilters,
    excludedByBudget,
    sourceUrl: `${CANONICAL_BASE_URL}/full-menu`,
    updatedAt,
  };
}

export function getBookingLink(): BookingLink {
  return buildBookingLink();
}
