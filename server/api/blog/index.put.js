import { Blog } from "~~/server/models/blog-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('body.images ', body.images)
    const postItem = await Blog.findById(body._id)
    if (!postItem) return false
    postItem.title = body.title
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
    console.log('imagesFiltered ', imagesFiltered)
    postItem.images = imagesFiltered
    postItem.gallery = galleryFiltered
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