import { MobileHome } from "~~/server/models/mobile-home-model";

const defaultMobileHome = {
  intro: "Mediterranean restaurant in Spinola Bay",
  menuButtonLabel: "View Menu",
  findUsEyebrow: "Find us",
  mapLinkLabel: "Open in Google Maps",
  photosEyebrow: "Photos",
  photosTitle: "Spinola Bay views, terrace, food and drinks",
  bookingButtonLabel: "Book a Table",
};

export default defineEventHandler(async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      data: defaultMobileHome,
    };
  }

  try {
    const item = await MobileHome.findOne().lean();
    return {
      data: {
        ...defaultMobileHome,
        ...(item ?? {}),
      },
    };
  } catch (error) {
    console.error("Failed to load mobile home content", error);
    return {
      data: defaultMobileHome,
    };
  }
});
