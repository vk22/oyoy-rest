import { Auth } from "~~/server/models/auth-model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  try {
    if (!config.jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return {
        success: false,
        message: "Authentication is not configured",
      };
    }

    const body = await readBody(event);
    const { username, password } = body;

    if (!username || !password) {
      return {
        success: false,
        message: "Username and password are required",
      };
    }

    const user = await Auth.findOne({ username });
    if (!user) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    const validPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!validPassword) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        username: user.username,
        usergroup: user.usergroup,
      },
      config.jwtSecret,
      { expiresIn: "8h" },
    );

    return {
      success: true,
      token,
      username: user.username,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      message: "Error access",
    };
  }
});
