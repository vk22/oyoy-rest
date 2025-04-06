import { User } from "~~/server/models/user-model";
import { Subscribers } from "~~/server/models/subscribers-model";

export default defineEventHandler( async (event) => {
  const body = await readBody(event)
  const deleted = await Subscribers.deleteOne({ _id: body._id })
  if (!deleted) return false;
  const subscribers = await Subscribers.find()
  return {
    success: true,
    message: 'subscriber deleted successfully',
    subscribers: subscribers
  }

})