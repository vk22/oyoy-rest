import { MenuPDF } from "~~/server/models/menuPDF-model";

export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id')
    const item = await MenuPDF.findById(id)
    return item
})