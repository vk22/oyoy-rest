import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  address: {
    type: String
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  map: {
    type: String,
  },
  coords: {
    type: String
  }
}, { 
  versionKey: false 
})

export const Company = model("Company", SchemaData);