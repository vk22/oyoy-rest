import { MobileHome } from "~~/server/models/mobile-home-model";

const getPayload = (body) => ({
  intro: body.intro,
  menuButtonLabel: body.menuButtonLabel,
  findUsEyebrow: body.findUsEyebrow,
  mapLinkLabel: body.mapLinkLabel,
  photosEyebrow: body.photosEyebrow,
  photosTitle: body.photosTitle,
  bookingButtonLabel: body.bookingButtonLabel,
});

export default defineEventHandler(async (event) => {
  await requireAuth(event);
  const body = await readBody(event);
  const payload = getPayload(body);

  const item = body._id
    ? await MobileHome.findByIdAndUpdate(body._id, payload, { new: true })
    : await MobileHome.findOneAndUpdate({}, payload, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      });

  return {
    success: true,
    message: "Mobile home content saved successfully",
    data: item,
  };
});
