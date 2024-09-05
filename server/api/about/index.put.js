import { About } from "~~/server/models/about-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const item = await About.findById(body._id)
    if (!item) return false
    item.title = body.title
    item.text = body.text
    const saveItem = await item.save()
    
    return {
      success: true,
      message: 'About saved successfully',
      data: saveItem
    }

})