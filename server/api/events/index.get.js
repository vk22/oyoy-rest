import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    const data = await Event.find().sort({ date: -1 });
    return {
      success: true,
      data: data
    }

})