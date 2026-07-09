import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      success: true,
      data: []
    }
  }

  try {
    const query = getQuery(event);
    const publishedPosts = (query.published === '1') ? {published: true} : {};
    const data = await Blog.find(publishedPosts).sort({ date: -1 });
    return {
      success: true,
      data: data
    }
  } catch (error) {
    console.error("Failed to load blog", error);
    return {
      success: true,
      data: []
    }
  }

})
