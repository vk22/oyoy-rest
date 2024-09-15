import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
    const items = await Gallery.find()
    return {
      success: true,
      items: items
    }

})