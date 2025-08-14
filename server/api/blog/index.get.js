import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {

    const query = getQuery(event);
    const publishedPosts = (query.published === '1') ? {published: true} : {};
    const data = await Blog.find(publishedPosts).sort({ date: -1 });
    return {
      success: true,
      data: data
    }

})