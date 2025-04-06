import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('gallery post ', body)
    /// images map
    const imagesFiltered = body.images.filter((item, index) => {
      if (item) {
        if (item.file) {
          item.index = index
          return item
        }
      }
  
    })
    body.date = new Date().toISOString()
    body.images = imagesFiltered
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