import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return null
  }

  try {
    const url = getRouterParam(event, 'url')
    const eventOne = await Blog.findOne({url: url})
    return eventOne
  } catch (error) {
    console.error("Failed to load blog item", error)
    return null
  }

})
