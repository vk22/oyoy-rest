import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('event post new: ' + JSON.stringify(body))
    body.date = new Date().toISOString()
    const eventNew = await Event.create(body)
    return {
      eventNew
    }

})