import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    body.date = new Date().toISOString()
    const eventNew = await Event.create(body)
    if (eventNew) {
      return {
        success: true,
        message: 'Event created successfully',
        data: eventNew
      }
    } else {
      return {
        success: false,
        message: 'Something wrong'
      }
    }

})