import { About } from "~~/server/models/about-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      data: {}
    }
  }

  try {
    const item = await About.findOne()
    return {
      data: item ?? {}
    }
  } catch (error) {
    console.error("Failed to load about", error);
    return {
      data: {}
    }
  }
})
