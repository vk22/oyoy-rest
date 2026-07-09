import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return null
  }

  try {
    const id = getRouterParam(event, 'id')
    const galleryItem = await Gallery.findById(id)
    return galleryItem
  } catch (error) {
    console.error("Failed to load gallery item", error)
    return null
  }
})
