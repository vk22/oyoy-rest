import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event)
    const postItem = await Blog.findById(body._id)
    if (!postItem) return false
    postItem.published = body.published
    postItem.title = body.title
    postItem.contentItems = body.contentItems
    postItem.text = body.text
    postItem.url = body.url
    const imagesFiltered = body.images.filter((item, index) => {
      if (item) {
        if (item.file) {
          item.index = index
          return item
        }
      }
    })
    const galleryFiltered = body.gallery.filter((item, index) => {
      if (item) {
        if (item.file) {
          item.index = index
          return item
        }
      }
    })
    postItem.images = imagesFiltered
    postItem.gallery = galleryFiltered
    postItem.mainImage = body.mainImage
    postItem.previewImage = body.previewImage
    const saveItem = await postItem.save()
    if (saveItem) {
      return {
        success: true,
        message: 'Post saved successfully',
        data: saveItem
      }
    } else {
      return {
        success: false,
        message: 'Something wrong'
      }
    }

})