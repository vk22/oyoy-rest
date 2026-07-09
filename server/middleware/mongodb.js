import mongoose from "mongoose";

let connectionPromise;

const publicGetApiPrefixes = [
  "/api/reservation-available",
  "/api/company",
  "/api/nav",
  "/api/about",
  "/api/chef",
  "/api/topslide",
  "/api/menu",
  "/api/menu-pdf",
  "/api/blog",
  "/api/events",
  "/api/gallery",
];

export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname;
  const isPublicGetApi =
    event.method === "GET" &&
    publicGetApiPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (!pathname.startsWith("/api/")) {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  const config = useRuntimeConfig();

  try {
    if (mongoose.connection.readyState !== 2) {
      connectionPromise = mongoose.connect(config.mongodbUri, {
        serverSelectionTimeoutMS: 5000,
      });
    }

    await connectionPromise;
  } catch (error) {
    connectionPromise = undefined;

    if (isPublicGetApi) {
      event.context.mongoUnavailable = true;
      console.error(`MongoDB connection failed for public API: ${pathname}`, error);
      return;
    }

    throw error;
  }
});
