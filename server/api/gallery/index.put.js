import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (gallery) => {
    const body = await readBody(gallery)
    console.log('Gallery edit: ' + JSON.stringify(body))
    const galleryItem = await Gallery.findById(body._id)
    if (!galleryItem) return false
    galleryItem.name = body.name
    const images = body.images.map((item, index) => {
      item.index = index
      return item
    })
    console.log('images: ' + images)
    galleryItem.images = images
    
    const saveItem = await galleryItem.save()
    console.log('saveItem ', saveItem)
    
    return {
      success: true,
      message: 'Gallery saved successfully',
      data: saveItem
    }

})