import mongoose from "mongoose";

let connectionPromise;

export default defineEventHandler(async (event) => {
  const pathname = getRequestURL(event).pathname;

  if (!pathname.startsWith("/api/")) {
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  const config = useRuntimeConfig();

  connectionPromise ||= mongoose.connect(config.mongodbUri);
  await connectionPromise;
});
