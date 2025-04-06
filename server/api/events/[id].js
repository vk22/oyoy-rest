import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    console.log('get event')
    const id = getRouterParam(event, 'id')
    const eventOne = await Event.findById(id)
    return eventOne
}) 