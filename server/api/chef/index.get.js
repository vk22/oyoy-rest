import { Chef } from "~~/server/models/chef-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      data: {}
    }
  }

  try {
    const item = await Chef.findOne()
    return {
      data: item ?? {}
    }
  } catch (error) {
    console.error("Failed to load chef", error);
    return {
      data: {}
    }
  }
})
