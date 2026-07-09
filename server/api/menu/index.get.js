import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler(async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      success: true,
      data: [],
    };
  }

  try {
  const query = getQuery(event);
  const publishedPosts = query.published === "1" ? { published: true } : {};
  const data = await Menu.find(publishedPosts).sort({ order: 1 });
  return {
    success: true,
    data: data,
  };
  } catch (error) {
    console.error("Failed to load menu", error);
    return {
      success: true,
      data: [],
    };
  }
});
