import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    // console.log('getmenu ', getQuery(event))
    // const category = getQuery(event).category
    const items = await Menu.find()
    return {
      items: items
    }

})