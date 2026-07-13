import { Blog } from "~~/server/models/blog-model";

const isValidImage = (item) => {
  return Boolean(item?.file?.url && item?.file?.type);
};

const normalizeImage = (item) => {
  if (!isValidImage(item)) return undefined;

  return {
    file: {
      url: item.file.url,
      type: item.file.type,
    },
    index: item.index ?? 0,
  };
};

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
    const imagesFiltered = body.images.filter(isValidImage).map((item, index) => ({
      ...item,
      index,
    }))
    const galleryFiltered = body.gallery.filter(isValidImage).map((item, index) => ({
      ...item,
      index,
    }))
    postItem.images = imagesFiltered
    postItem.gallery = galleryFiltered
    postItem.mainImage = normalizeImage(body.mainImage)
    postItem.previewImage = normalizeImage(body.previewImage)
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
