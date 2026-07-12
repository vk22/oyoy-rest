import mongoose from "mongoose";

const mongoState = globalThis.__oyoyMongo ?? {
  connectionPromise: undefined,
  instanceId: crypto.randomUUID(),
};
globalThis.__oyoyMongo = mongoState;

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
  "/api/public/mobile-home",
];

const dbApiPrefixes = [
  ...publicGetApiPrefixes,
  "/api/blob-upload-url",
  "/api/blog-migrate",
  "/api/getusers",
  "/api/image-storage",
  "/api/login",
  "/api/menu-sort",
  "/api/parsecsv",
  "/api/public/home",
  "/api/public/mobile-home",
  "/api/reservations",
  "/api/sitemap",
  "/api/subscribers",
  "/api/uploadgallery_old",
];

export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname;
  const isPublicGetApi =
    event.method === "GET" &&
    publicGetApiPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  const needsMongo =
    pathname.startsWith("/api/") &&
    dbApiPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (!needsMongo) {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  const config = useRuntimeConfig();

  try {
    if (mongoose.connection.readyState !== 2) {
      console.log("MongoDB connection created", {
        instanceId: mongoState.instanceId,
        deployment: process.env.VERCEL_DEPLOYMENT_ID,
        region: process.env.VERCEL_REGION,
      });

      mongoState.connectionPromise = mongoose.connect(config.mongodbUri, {
        appName: "oyoy-rest-vercel",
        maxPoolSize: 1,
        minPoolSize: 0,
        maxIdleTimeMS: 30_000,
        serverSelectionTimeoutMS: 5000,
      });
    }

    await mongoState.connectionPromise;
  } catch (error) {
    mongoState.connectionPromise = undefined;

    if (isPublicGetApi) {
      event.context.mongoUnavailable = true;
      console.error(`MongoDB connection failed for public API: ${pathname}`, error);
      return;
    }

    throw error;
  }
});
