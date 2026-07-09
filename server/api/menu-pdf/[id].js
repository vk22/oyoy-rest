import { MenuPDF } from "~~/server/models/menuPDF-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return null
  }

  try {
    const id = getRouterParam(event, 'id')
    const item = await MenuPDF.findById(id)
    return item
  } catch (error) {
    console.error("Failed to load menu pdf item", error)
    return null
  }
})
