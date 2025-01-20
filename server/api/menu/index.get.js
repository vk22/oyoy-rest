import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    const items = await Menu.find().sort({ order: 1 });
    return {
      success: true,
      items: items
    }

})