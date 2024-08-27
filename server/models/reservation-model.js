import { Schema, model } from "mongoose";
const SchemaData = new Schema({
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
  persons: {
    type: String,
    //unique: true
  },
  message: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  userData: {
    type: Object
  },
}, { 
  versionKey: false 
})

export const Reservation = model("Reservation", SchemaData);