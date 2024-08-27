import { Auth } from "~~/server/models/auth-model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default defineEventHandler( async (event) => {

    try {
      const body = await readBody(event)
      const { username, password } = body;
      console.log("username ", username);
      const users = await Auth.find();
      console.log("users ", users);
      const user = await Auth.findOne({ username: username });
      if (!user) {
        return {
          success: false,
          message: "User not found"
        }
      }
      const validPassword = bcrypt.compareSync(password, user.passwordHash);
      if (!validPassword) {
        return {
          success: false,
          message: "Wrong password"
        }
      }
      const jwtToken = '7383dj2948fk0';
      const token = jwt.sign({ username, password }, jwtToken);
      return { 
        success: true, 
        token: token, 
        username: username 
      }

    } catch (err) {
      console.log(err);
      return {
        success: false,
        message: "Error access"
      }
    }

})