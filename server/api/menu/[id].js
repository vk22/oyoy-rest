import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    const id = getRouterParam(event, 'id')
    const item = await Menu.findById(id)
    return item
})