import { User } from "~~/server/models/user-model";
import { Reservation } from "~~/server/models/reservation-model";
const result = {
  success: {
    success: true,
    status: 'success',
    message: {
      title: "Your reservation has been accepted",
      subtitle: "We look forward to seeing you in our restaurant."
    }
  },
  error: {
    success: false,
    status: 'error',
    message: {
      title: "There was an error",
      subtitle: "The error has been sent to our quality officer."
    }
  }
}

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const newReservation = new Reservation(body);
    const saving = await newReservation.save();
    if (saving) {
      return result.success
    } else {
      return result.error
    }
})