import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('body: ' + JSON.stringify(body))
    const item = await Menu.findById(body._id)
    if (!item) return false
    item.section = body.section
    item.content = body.content
  
    const saveItem = await item.save()
    console.log('saveItem ', saveItem)
    
    return {
      success: true,
      message: 'Menu saved successfully',
      data: saveItem
    }

})