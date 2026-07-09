import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return null
  }

  try {
    const id = getRouterParam(event, 'id')
    const eventOne = await Event.findOne({_id: id})
    return eventOne
  } catch (error) {
    console.error("Failed to load event item", error)
    return null
  }
}) 
