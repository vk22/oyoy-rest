import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const deleted = await Gallery.deleteOne({ _id: body._id })
    if (!deleted) return false
    return {
      success: true,
      message: 'Gallery deleted successfully'
    }

})