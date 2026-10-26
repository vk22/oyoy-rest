/**
 * GET /api/public/menu — documented, bounded search/filter contract shared
 * with the MCP `search_menu` tool (same validation, same limit 20/50).
 * For the full published catalog used to render /menu itself, see
 * /api/public/menu/full.get.ts (not part of this AI-search contract).
 */
export default defineEventHandler(async (event) => {
  const rawQuery = getQuery(event);
  const parsed = searchMenuQueryStringSchema.safeParse(rawQuery);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid query parameters",
      data: { error: "invalid_query", issues: parsed.error.issues },
    });
  }

  try {
    const result = await searchMenuItems(parsed.data);
    return { success: true, data: result, sourceUrl: result.sourceUrl, updatedAt: result.updatedAt };
  } catch (error) {
    if (error instanceof UnknownCategoryError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Unknown menu category",
        data: { error: "unknown_category", availableCategories: error.availableCategories },
      });
    }
    throw error;
  }
});
