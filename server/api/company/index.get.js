import { Company } from "~~/server/models/company-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      data: {}
    }
  }

  try {
    const company = await Company.findOne()
    return {
      data: company ?? {}
    }
  } catch (error) {
    console.error("Failed to load company", error);
    return {
      data: {}
    }
  }
})
