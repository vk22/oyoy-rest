import { About } from "~~/server/models/about-model";

export default defineEventHandler( async (event) => {
    const item = await About.find()
    console.log('item ', item[0])
    return {
      data: item[0]
    }

})