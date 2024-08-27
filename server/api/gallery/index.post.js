import { Gallery } from "~~/server/models/gallery-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('body: ' + JSON.stringify(body))
    body.date = new Date().toISOString()
    const itemNew = await Gallery.create(body)
    return {
      itemNew
    }

})