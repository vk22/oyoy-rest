import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    const events = await Event.find().sort({ date: -1 });
    return {
      success: true,
      events: events
    }

})