import { Event } from "~~/server/models/event-model";

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    console.log('body ', body.title)
    const eventOne = await Event.findById(body._id)
    if (!eventOne) return false
    eventOne.title = body.title
    eventOne.text = body.text
    eventOne.url = body.url
    if (body.imageNew) {
      eventOne.file = body.imageNew
    }
    const saveItem = await eventOne.save()
    if (saveItem) {
      return {
        success: true,
        message: 'Event saved successfully',
        data: saveItem
      }
    } else {
      return {
        success: false,
        message: 'Something wrong'
      }
    }

})