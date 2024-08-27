import { Topslide } from "~~/server/models/topslide-model";

export default defineEventHandler( async (event) => {
    const item = await Topslide.find()
    return {
      data: item[0]
    }

})