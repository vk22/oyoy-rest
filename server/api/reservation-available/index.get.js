import { ReservationAvailable } from "~~/server/models/reservation-available-model";

export default defineEventHandler( async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      data: { isAvailable: true }
    }
  }

  try {
    const item = await ReservationAvailable.findOne()
    return {
      data: item ?? { isAvailable: true }
    }
  } catch (error) {
    console.error("Failed to load reservation availability", error);
    return {
      data: { isAvailable: true }
    }
  }

})
