import { ReservationAvailable } from "~~/server/models/reservation-available-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event)
    const itemNew = await ReservationAvailable.create(body)
    return {
      itemNew
    }

})