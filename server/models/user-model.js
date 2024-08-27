import { Schema, model } from "mongoose";
const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    // unique: true
  },
  phone: {
    type: String,
    //unique: true
  },
  message: {
    type: String
  },
  date: {
    type: Date
  },
  userData: {
    type: Object
  },
  filename: {
    type: String
  }
}, { 
  versionKey: false 
})

export const User = model("User", UserSchema);