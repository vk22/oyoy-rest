import { User } from "~~/server/models/user-model";
import { Reservation } from "~~/server/models/reservation-model";

export default defineEventHandler( async (event) => {
  const body = await readBody(event)
  console.log('body: ' + JSON.stringify(body))
  const deleted = await Reservation.deleteOne({ _id: body._id })
  if (!deleted) return false;
  const reservations = await Reservation.find()
  return {
    success: true,
    message: 'Reservation deleted successfully',
    reservations: reservations
  }

})