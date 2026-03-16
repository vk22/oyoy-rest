import { MenuPDF } from "~~/server/models/menuPDF-model";

export default defineEventHandler( async (event) => {
    const query = getQuery(event);
    const publishedPosts = query.published === "1" ? { published: true } : {};
    const data = await MenuPDF.find(publishedPosts).sort({ order: 1 });
    return {
      success: true,
      data: data
    }

})