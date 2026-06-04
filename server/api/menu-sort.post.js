import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event);
    console.log('body ', body)
    for (const [index, item] of body.entries()) {
      const menu = await Menu.findById(item._id)
      console.log('menu ', menu)
      if (menu) {
        menu.order = index
        await menu.save()    
      }
    }
    return {
      success: true,
      message: 'Menu has been sorted',
    }

})