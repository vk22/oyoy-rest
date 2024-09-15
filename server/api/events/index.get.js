import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    const events = await Event.find()
    return {
      success: true,
      events: events
    }

})