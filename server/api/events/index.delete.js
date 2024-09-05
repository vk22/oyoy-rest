import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const deleted = await Event.deleteOne({ _id: body._id })
    if (!deleted) return false
    return {
      success: true,
      message: 'Event deleted successfully'
    }

})