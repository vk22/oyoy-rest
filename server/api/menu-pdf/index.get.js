import { MenuPDF } from "~~/server/models/menuPDF-model";

export default defineEventHandler( async (event) => {
    const data = await MenuPDF.find().sort({ order: 1 });
    return {
      success: true,
      data: data
    }

})