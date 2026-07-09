import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      success: true,
      items: []
    }
  }

  try {
    const items = await Gallery.find()
    return {
      success: true,
      items: items
    }
  } catch (error) {
    console.error("Failed to load gallery", error);
    return {
      success: true,
      items: []
    }
  }

})
