import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const deleted = await Menu.deleteOne({ _id: body._id })
    if (!deleted) return false
    return {
      success: true,
      message: 'Menu deleted successfully'
    }

})