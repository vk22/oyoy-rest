import { Company } from "~~/server/models/company-model";
import { Gallery } from "~~/server/models/gallery-model";
import { ReservationAvailable } from "~~/server/models/reservation-available-model";
import { MenuPDF } from "~~/server/models/menuPDF-model";

const GALLERY_LIMIT = 8;

const fallbackData = {
  company: {},
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
    const [company, galleryItems, reservationAvailable, menuPdf] =
      await Promise.all([
        Company.findOne().select("address phone map email").lean(),
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
