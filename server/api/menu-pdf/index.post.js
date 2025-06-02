import { MenuPDF } from "~~/server/models/menuPDF-model";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    // console.log('Add MenuPDF ', body)
    const menuNew = await MenuPDF.create(body)
      if (menuNew) {
        return {
          success: true,
          message: 'MenuPDF created successfully',
          data: menuNew
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


