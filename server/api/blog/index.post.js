import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event);
    body.date = new Date().toISOString()
    const itemNew = await Blog.create(body)
    if (itemNew) {
      return {
        success: true,
        message: 'Post created successfully',
        data: itemNew
      }
    } else {
      return {
        success: false,
        message: 'Something wrong'
      }
    }

})