import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    body.date = new Date().toISOString()
    const itemNew = await Gallery.create(body)
    if (itemNew) {
      return {
        success: true,
        message: 'Gallery created successfully',
        data: itemNew
      }
    } else {
      return {
        success: false,
        message: 'Something wrong'
      }
    }


})