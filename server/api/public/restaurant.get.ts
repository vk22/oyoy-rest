/**
 * GET /api/public/restaurant — verified restaurant info + booking link.
 * Shares getRestaurantInfo() with the MCP get_restaurant_info tool.
 */
export default defineEventHandler(async (event) => {
  const restaurant = await getRestaurantInfo();

  return {
    success: true,
    data: restaurant,
    sourceUrl: restaurant.sourceUrl,
    updatedAt: restaurant.updatedAt,
  };
});
