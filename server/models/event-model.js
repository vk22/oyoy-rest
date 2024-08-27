import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  title: {
    type: String
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  gallery: {
    type: Array,
  },
  date: {
    type: Date
  }
}, { 
  versionKey: false 
})

export const Event = model("Event", SchemaData);