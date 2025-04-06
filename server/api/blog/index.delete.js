import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const deleted = await Blog.deleteOne({ _id: body._id })
    if (!deleted) return false
    return {
      success: true,
      message: 'Post deleted successfully'
    }

})