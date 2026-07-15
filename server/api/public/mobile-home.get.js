import { Company } from "~~/server/models/company-model";
import { Gallery } from "~~/server/models/gallery-model";
import { Nav } from "~~/server/models/nav-model";
import { MobileHome } from "~~/server/models/mobile-home-model";
import { ReservationAvailable } from "~~/server/models/reservation-available-model";
import { MenuPDF } from "~~/server/models/menuPDF-model";

const GALLERY_LIMIT = 8;

const fallbackData = {
  company: {},
  mobileHome: {},
  nav: [],
  gallery: [],
  topGallery: [],
  reservationAvailable: { isAvailable: true },
  menuPdf: [],
};

const normalizeImage = (image) => ({
  title: image?.title,
  file: image?.file,
  index: image?.index,
  _id: image?._id,
});

const getLimitedImages = (gallery) => {
  return (gallery?.images ?? [])
    .filter((item) => item?.file?.url)
    .slice(0, GALLERY_LIMIT)
    .map(normalizeImage);
};

export default defineEventHandler(async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      success: true,
      data: fallbackData,
    };
  }

  try {
    const [company, mobileHome, nav, galleryItems, reservationAvailable, menuPdf] =
      await Promise.all([
        Company.findOne().select("address phone map email").lean(),
        MobileHome.findOne().lean(),
        Nav.find()
          .sort({ order: 1 })
          .select("text href type isHomePageAnchor isActive isPublished order")
          .lean(),
        Gallery.find({ name: { $in: ["main", "top"] } })
          .select("name images.title images.file images.index")
          .lean(),
        ReservationAvailable.findOne().select("isAvailable").lean(),
        MenuPDF.find({ published: true })
          .sort({ order: 1 })
          .select("category title link published order")
          .lean(),
      ]);

    const mainGallery = galleryItems.find((item) => item.name === "main");
    const topGallery = galleryItems.find((item) => item.name === "top");
    const mainImages = getLimitedImages(mainGallery);
    const topImages = getLimitedImages(topGallery);

    return {
      success: true,
      data: {
        company: company ?? {},
        mobileHome: mobileHome ?? {},
        nav: nav ?? [],
        gallery: mainImages.length
          ? [{ name: "main", images: mainImages }]
          : [],
        topGallery: topImages,
        reservationAvailable:
          reservationAvailable ?? fallbackData.reservationAvailable,
        menuPdf,
      },
    };
  } catch (error) {
    console.error("Failed to load public mobile home data", error);
    return {
      success: true,
      data: fallbackData,
    };
  }
});
