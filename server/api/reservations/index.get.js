import { Reservation } from "~~/server/models/reservation-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const reservations = await Reservation.find().sort({ date: -1 });
    return {
      reservations: reservations
    }
})