/**
 * GET /api/public/menu/full — the complete published catalog, grouped by
 * menu/category, with no result-count cap.
 *
 * This is NOT part of the documented AI-search contract (that's
 * GET /api/public/menu, bounded to limit<=50, mirrored by the MCP
 * search_menu tool). It exists only so the human-facing /menu page can
 * render the entire real menu in SSR HTML, using the exact same mapping
 * functions (restaurantRepository -> restaurantData) as every other
 * channel, so prices/units/currency stay consistent everywhere.
 */
export default defineEventHandler(async (event) => {
  const menus = await getFullMenuCatalog();
  const updatedAt = menus.reduce<string | null>((latest, menu) => {
    if (!menu.updatedAt) return latest;
    return !latest || menu.updatedAt > latest ? menu.updatedAt : latest;
  }, null);

  return {
    success: true,
    data: { menus },
    sourceUrl: "https://oyoyrestaurant.com/full-menu",
    updatedAt,
  };
});
