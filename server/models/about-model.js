import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  image: {
    type: String
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  }
}, { 
  versionKey: false 
})

export const About = model("About", SchemaData);