import { Topslide } from "~~/server/models/topslide-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const item = await Topslide.findById(body._id)
    if (!item) return false
    item.title = body.title
    item.subtitle = body.subtitle
    const saveItem = await item.save()
    return {
      success: true,
      message: 'Topslide saved successfully',
      data: saveItem
    }

})