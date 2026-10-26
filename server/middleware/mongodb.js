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
  "/api/mobile-home",
  "/api/menu",
  "/api/menu-pdf",
  "/api/blog",
  "/api/events",
  "/api/gallery",
  "/api/public/mobile-home",
  "/api/public/restaurant",
  "/api/public/menu",
];

// Not GET-only like publicGetApiPrefixes: MCP tools are invoked via POST and
// must get the same honest "data unavailable" fallback as the public GET API
// rather than a hard 500 if Mongo can't be reached.
const publicAnyMethodPrefixes = ["/mcp"];

const dbApiPrefixes = [
  ...publicGetApiPrefixes,
  ...publicAnyMethodPrefixes,
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
  const matchesPrefix = (prefixes) =>
    prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  const isPublicGetApi =
    (event.method === "GET" && matchesPrefix(publicGetApiPrefixes)) ||
    matchesPrefix(publicAnyMethodPrefixes);
  const needsMongo = matchesPrefix(dbApiPrefixes);

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
