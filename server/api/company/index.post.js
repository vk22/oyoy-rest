import { Company } from "~~/server/models/company-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const itemNew = await Company.create(body)
    return {
      itemNew
    }

})