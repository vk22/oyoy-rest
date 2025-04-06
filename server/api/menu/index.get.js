import { Menu } from "~~/server/models/menu-model";

export default defineEventHandler( async (event) => {
    const data = await Menu.find().sort({ order: 1 });
    return {
      success: true,
      data: data
    }

})