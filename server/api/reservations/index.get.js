import { Reservation } from "~~/server/models/reservation-model";

export default defineEventHandler( async (event) => {
    const reservations = await Reservation.find()
    return {
      reservations: reservations
    }
})