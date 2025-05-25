import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler(async (gallery) => {
  const body = await readBody(gallery)
  const galleryItem = await Gallery.findById(body._id)
  if (!galleryItem) return false
  galleryItem.name = body.name
  const imagesFiltered = body.images.filter((item, index) => {
    if (item) {
      if (item.file) {
        item.index = index
        return item
      }
    }

  })
  galleryItem.images = imagesFiltered
  const saveItem = await galleryItem.save()
  if (saveItem) {
    return {
      success: true,
      message: 'Gallery saved successfully',
      data: saveItem
    }
  } else {
    return {
      success: false,
      message: 'Something wrong'
    }
  }


})