import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const menuNew = await Menu.create(body)
    return {
      menuNew
    }

})