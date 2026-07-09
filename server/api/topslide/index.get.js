import { Topslide } from "~~/server/models/topslide-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      data: {}
    }
  }

  try {
    const item = await Topslide.findOne()
    return {
      data: item ?? {}
    }
  } catch (error) {
    console.error("Failed to load topslide", error);
    return {
      data: {}
    }
  }
})
