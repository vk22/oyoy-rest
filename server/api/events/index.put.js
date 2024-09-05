import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const eventOne = await Event.findById(body._id)
    if (!eventOne) return false
    eventOne.title = body.title
    eventOne.text = body.text
    if (body.imageNew) {
      eventOne.image = body.imageNew
    }
    const saveItem = await eventOne.save()
    return {
      success: true,
      message: 'Event saved successfully',
      data: saveItem
    }

})