import { Company } from "~~/server/models/company-model";

export default defineEventHandler( async (event) => {
    const company = await Company.find()
    return {
      data: company[0]
    }

})