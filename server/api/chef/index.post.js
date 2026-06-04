import { Chef } from "~~/server/models/chef-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event)
    const itemNew = await Chef.create(body)
    return {
      itemNew
    }

})