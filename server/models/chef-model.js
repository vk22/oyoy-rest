import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  image: {
    file: {
      url: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    index: {
      type: Number
    }
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

export const Chef = model("Chef", SchemaData);