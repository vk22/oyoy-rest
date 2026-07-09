import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return null
  }

  try {
    const id = getRouterParam(event, 'id')
    const item = await Menu.findById(id)
    return item
  } catch (error) {
    console.error("Failed to load menu item", error)
    return null
  }
})
