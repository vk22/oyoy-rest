import { Blog } from "~~/server/models/blog-model";
import ImagesService from "~~/server/services/imagesService.js"

export default defineEventHandler( async (event) => {
    const body = await readBody(event);
    const itemForDelete = await Blog.findOne({_id: body._id});
    const imagesForDelete = itemForDelete.images.concat(itemForDelete.gallery);
    console.log('imagesForDelete ', imagesForDelete);

    try {
      for (const item of imagesForDelete) {
        console.log('item ', item)
        if (item.file) {
          const res = await ImagesService.delete(item.file.url);
          console.log('res ', res)
        }
      }
    } catch (error) {
      console.log(error.message)
    }

    try {
      const deleted = await Blog.deleteOne({ _id: body._id })
      if (!deleted) return false;
      return {
        success: true,
        message: 'Post deleted successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }

})