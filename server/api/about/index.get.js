import { About } from "~~/server/models/about-model";

export default defineEventHandler( async (event) => {
    const item = await About.find()
    return {
      data: item[0]
    }

})