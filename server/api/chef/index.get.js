import { Chef } from "~~/server/models/chef-model";

export default defineEventHandler( async (event) => {
    const item = await Chef.find()
    return {
      data: item[0]
    }

})