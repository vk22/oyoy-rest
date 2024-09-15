import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const menuNew = await Menu.create(body)
    if (menuNew) {
      return {
        success: true,
        message: 'Menu created successfully',
        data: menuNew
      }
    } else {
      return {
        success: false,
        message: 'Something wrong'
      }
    }

})