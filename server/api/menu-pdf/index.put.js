import { MenuPDF } from "~~/server/models/menuPDF-model";

export default defineEventHandler( async (event) => {
  
  try {
      const body = await readBody(event)
      // console.log('MenuPDF Edit ', body)
      const item = await MenuPDF.findById(body._id)
      if (!item) return false
      item.category = body.category
      item.section = body.section
      item.title = body.title
      item.text = body.text
      item.link = body.link
      item.image_preview = body.image_preview
      item.published = body.published
      const saveItem = await item.save()    
      if (saveItem) {
        return {
          success: true,
          message: 'Menu saved successfully',
          data: saveItem
        }
      } else {
        return {
          success: false,
          message: 'Something wrong'
        }
      }
  } catch (error) {
      console.log('error ', error.message);
      return {
        success: false,
        message: error.message
    }
  }


})