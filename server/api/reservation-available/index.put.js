import { ReservationAvailable } from "~~/server/models/reservation-available-model";

export default defineEventHandler( async (event) => {
    await requireAuth(event);
    const body = await readBody(event)
    const item = body._id
      ? await ReservationAvailable.findById(body._id)
      : await ReservationAvailable.findOne()

    if (!item) {
      const saveItem = await ReservationAvailable.create({
        isAvailable: body.isAvailable ?? true
      })
      const isActive = (saveItem.isAvailable) ? 'Enabled' : 'Disabled';
      return {
        success: true,
        message: `Reservations ${isActive}`,
        data: saveItem
      }
    }

    item.isAvailable = body.isAvailable
    const saveItem = await item.save()
    const isActive = (saveItem.isAvailable) ? 'Enabled' : 'Disabled';
    return {
      success: true,
      message: `Reservations ${isActive}`,
      data: saveItem
    }

})
