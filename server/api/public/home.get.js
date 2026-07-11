import { Company } from "~~/server/models/company-model";
import { About } from "~~/server/models/about-model";
import { Chef } from "~~/server/models/chef-model";
import { Topslide } from "~~/server/models/topslide-model";
import { Nav } from "~~/server/models/nav-model";
import { Blog } from "~~/server/models/blog-model";
import { Event } from "~~/server/models/event-model";
import { Gallery } from "~~/server/models/gallery-model";
import { ReservationAvailable } from "~~/server/models/reservation-available-model";
import { Menu } from "~~/server/models/menu-model";
import { MenuPDF } from "~~/server/models/menuPDF-model";

const fallbackData = {
  company: {},
  about: {},
  chef: {},
  topslide: {},
  nav: [],
  gallery: [],
  topGallery: [],
  reservationAvailable: { isAvailable: true },
  menu: [],
  menuPdf: [],
  events: [],
  blog: [],
};

const getNavCounters = async () => {
  const [blogCount, eventsCount] = await Promise.all([
    Blog.countDocuments(),
    Event.countDocuments(),
  ]);

  return {
    Blog: blogCount,
    Events: eventsCount,
  };
};

const checkNavData = async (data, itemsForCheck) => {
  const items = await getNavCounters();

  return Promise.all(
    data.map(async (el) => {
      if (itemsForCheck.includes(el.text)) {
        el.isActive = Boolean(items[el.text]);
      }
      return el;
    })
  );
};

export default defineEventHandler(async (event) => {
  if (event.context.mongoUnavailable) {
    return {
      success: true,
      data: fallbackData,
    };
  }

  try {
    const [
      company,
      about,
      chef,
      topslide,
      nav,
      galleryItems,
      reservationAvailable,
      menu,
      menuPdf,
      events,
      blog,
    ] = await Promise.all([
      Company.findOne(),
      About.findOne(),
      Chef.findOne(),
      Topslide.findOne(),
      Nav.find().sort({ order: 1 }),
      Gallery.find(),
      ReservationAvailable.findOne(),
      Menu.find({ published: true }).sort({ order: 1 }),
      MenuPDF.find({ published: true }).sort({ order: 1 }),
      Event.find({ published: true }).sort({ date: -1 }),
      Blog.find({ published: true }).sort({ date: -1 }),
    ]);

    const navChecked = await checkNavData(nav, ["Events", "Blog"]);
    const topGallery = galleryItems.find((item) => item.name === "top")?.images ?? [];

    return {
      success: true,
      data: {
        company: company ?? {},
        about: about ?? {},
        chef: chef ?? {},
        topslide: topslide ?? {},
        nav: navChecked,
        gallery: galleryItems,
        topGallery,
        reservationAvailable: reservationAvailable ?? fallbackData.reservationAvailable,
        menu,
        menuPdf,
        events,
        blog,
      },
    };
  } catch (error) {
    console.error("Failed to load public home data", error);
    return {
      success: true,
      data: fallbackData,
    };
  }
});
