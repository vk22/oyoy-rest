import { ReservationAvailable } from "~~/server/models/reservation-available-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event)
    const item = await ReservationAvailable.findById(body._id)
    if (!item) return false
    item.isAvailable = body.isAvailable
    const saveItem = await item.save()
    const isActive = (saveItem.isAvailable) ? 'Enabled' : 'Disabled';
    return {
      success: true,
      message: `Reservations ${isActive}`,
      data: saveItem
    }

})