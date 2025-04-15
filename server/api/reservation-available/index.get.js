import { ReservationAvailable } from "~~/server/models/reservation-available-model";

export default defineEventHandler( async (event) => {
    const item = await ReservationAvailable.find()
    return {
      data: item[0]
    }

})