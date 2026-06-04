import { getCookie, getHeader, createError } from "h3";
import jwt from "jsonwebtoken";
import { Auth } from "~~/server/models/auth-model";

export const requireAuth = async (event) => {
  const config = useRuntimeConfig(event);

  if (!config.jwtSecret) {
    throw createError({
      statusCode: 500,
      statusMessage: "Authentication is not configured",
    });
  }

  const authorization = getHeader(event, "authorization");
  const bearerToken = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : undefined;
  const token = bearerToken || getCookie(event, "token");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Not authenticated",
    });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = payload.sub
      ? await Auth.findById(payload.sub)
      : await Auth.findOne({ username: payload.username });

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "User not found",
      });
    }

    event.context.auth = {
      payload,
      user,
    };

    return event.context.auth;
  } catch (error) {
    if (error.statusCode) throw error;

    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    });
  }
};
