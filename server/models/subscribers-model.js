import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    //unique: true
  },
  persons: {
    type: String,
    //unique: true
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

export const Subscribers = model("Subscribers", SchemaData);