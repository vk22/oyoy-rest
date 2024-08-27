import { About } from "~~/server/models/about-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('body: ' + JSON.stringify(body))
    const item = await About.findById(body._id)
    if (!item) return false
    item.title = body.title
    item.text = body.text

    const saveItem = await item.save()
    console.log('saveItem ', saveItem)
    
    return {
      success: true,
      message: 'About saved successfully',
      data: saveItem
    }

})