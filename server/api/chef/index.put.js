import { Chef } from "~~/server/models/chef-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event)
    const item = await Chef.findById(body._id)
    if (!item) return false
    item.title = body.title
    item.text = body.text
    item.image = body.image
    const saveItem = await item.save()
    
    return {
      success: true,
      message: 'Chef saved successfully',
      data: saveItem
    }

})