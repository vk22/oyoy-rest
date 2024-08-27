import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('_id: ' + body._id)
    const deleted = await Gallery.deleteOne({ _id: body._id })
    console.log('deleted: ' + deleted)
    if (!deleted) return false
    return {
      success: true,
      message: 'Gallery deleted successfully'
    }

})