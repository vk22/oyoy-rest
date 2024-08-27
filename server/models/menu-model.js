import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  section: {
    type: String
  },
  content: [
    {
      title: {
        type: String
      },
      ingredients: {
        type: String
      },
      price: {
        type: String
      },
      type: {
        type: String
      }
    }
  ],
  image: {
    type: String,
  },
  gallery: {
    type: Array,
  },
  date: {
    type: Date
  },
   category: {
    type: String
  }
}, { 
  versionKey: false 
})

export const Menu = model("Menu", SchemaData);