import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    /// images map
    body.images = body.images.map((item, index) => {
      item.file = item.file.url
      item.index = index
      return item
    })
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