import { z } from "zod";

/**
 * Single source of truth for restaurant/menu shapes and the search input
 * contract shared by REST (/api/public/menu) and the MCP `search_menu` tool,
 * so both validate the same way with the same limits.
 */

export const CANONICAL_BASE_URL = "https://oyoyrestaurant.com";

export const pricingTypeSchema = z.enum(["fixed", "from", "market", "unknown"]);
export type PricingType = z.infer<typeof pricingTypeSchema>;

export const itemStatusSchema = z.enum(["published", "unavailable", "draft"]);
export type ItemStatus = z.infer<typeof itemStatusSchema>;

export const tagListSchema = z.union([z.array(z.string()), z.literal("unknown")]);
export type TagList = z.infer<typeof tagListSchema>;

export const menuItemSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  category: z.string(),
  menuId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().nullable(),
  currency: z.literal("EUR"),
  pricingType: pricingTypeSchema,
  unit: z.string().nullable(),
  status: itemStatusSchema,
  dietaryTags: tagListSchema,
  allergens: tagListSchema,
  sourceUrl: z.string(),
  updatedAt: z.string().nullable(),
});
export type MenuItem = z.infer<typeof menuItemSchema>;

export const menuCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(menuItemSchema),
});
export type MenuCategory = z.infer<typeof menuCategorySchema>;

export const menuSchema = z.object({
  id: z.string(),
  title: z.string(),
  language: z.literal("en"),
  currency: z.literal("EUR"),
  updatedAt: z.string().nullable(),
  categories: z.array(menuCategorySchema),
});
export type Menu = z.infer<typeof menuSchema>;

export const geoSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const restaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  canonicalUrl: z.string(),
  address: z.string().nullable(),
  geo: geoSchema.nullable(),
  telephone: z.string().nullable(),
  email: z.string().nullable(),
  timezone: z.literal("Europe/Malta"),
  cuisines: z.array(z.string()),
  currency: z.literal("EUR"),
  weeklyOpeningHours: z.null(),
  specialOpeningHours: z.array(z.unknown()),
  features: z.array(z.string()),
  bookingUrl: z.string(),
  socialLinks: z.array(z.string()),
  updatedAt: z.string().nullable(),
  sourceUrl: z.string(),
  missingFields: z.array(z.string()),
});
export type Restaurant = z.infer<typeof restaurantSchema>;

export const bookingLinkSchema = z.object({
  bookingUrl: z.string(),
  provider: z.literal("TheFork"),
  bookingMode: z.literal("external"),
  canCheckAvailability: z.literal(false),
  disclaimer: z.string(),
  sourceUrl: z.string(),
});
export type BookingLink = z.infer<typeof bookingLinkSchema>;

/**
 * Shared by the REST query-string parser and the MCP `search_menu` tool.
 * Only validates shape/bounds here; whether `category` actually exists is
 * data-dependent and checked by the repository against the live category list.
 */
export const searchMenuInputSchema = z.object({
  query: z.string().trim().max(200, "query must be at most 200 characters").optional(),
  category: z.string().trim().min(1).max(100).optional(),
  maxPrice: z
    .number()
    .finite("maxPrice must be a finite number")
    .nonnegative("maxPrice must not be negative")
    .optional(),
  limit: z.number().int().min(1).max(50).optional(),
});
export type SearchMenuInput = z.infer<typeof searchMenuInputSchema>;

export const DEFAULT_SEARCH_LIMIT = 20;
export const MAX_SEARCH_LIMIT = 50;

/**
 * Same bounds as searchMenuInputSchema, but for REST query-string values
 * (always strings) rather than the MCP tool's already-typed JSON input.
 */
export const searchMenuQueryStringSchema = z.object({
  query: z
    .string()
    .trim()
    .max(200, "query must be at most 200 characters")
    .optional(),
  category: z.string().trim().min(1).max(100).optional(),
  maxPrice: z.coerce
    .number({ invalid_type_error: "maxPrice must be a finite number" })
    .finite("maxPrice must be a finite number")
    .nonnegative("maxPrice must not be negative")
    .optional(),
  limit: z.coerce
    .number({ invalid_type_error: "limit must be an integer" })
    .int("limit must be an integer")
    .min(1, "limit must be at least 1")
    .max(MAX_SEARCH_LIMIT, `limit must be at most ${MAX_SEARCH_LIMIT}`)
    .optional(),
});

export const excludedItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  reason: z.string(),
});

export const searchMenuResultSchema = z.object({
  items: z.array(menuItemSchema),
  appliedFilters: z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    maxPrice: z.number().optional(),
    limit: z.number(),
  }),
  excludedByBudget: z.array(excludedItemSchema),
  sourceUrl: z.string(),
  updatedAt: z.string().nullable(),
});
export type SearchMenuResult = z.infer<typeof searchMenuResultSchema>;

export class UnknownCategoryError extends Error {
  availableCategories: string[];

  constructor(category: string, availableCategories: string[]) {
    super(`Unknown menu category: ${category}`);
    this.name = "UnknownCategoryError";
    this.availableCategories = availableCategories;
  }
}
