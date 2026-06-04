import { MenuPDF } from "~~/server/models/menuPDF-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event)
    const deleted = await MenuPDF.deleteOne({ _id: body._id })
    if (!deleted) return false
    return {
      success: true,
      message: 'Menu deleted successfully'
    }

})