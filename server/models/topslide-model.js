import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  images: {
    type: Array
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  }
}, { 
  versionKey: false 
})

export const Topslide = model("Topslide", SchemaData);