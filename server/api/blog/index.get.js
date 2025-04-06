import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
    const data = await Blog.find().sort({ date: -1 });
    // console.log('posts ', posts)
    return {
      success: true,
      data: data
    }

})