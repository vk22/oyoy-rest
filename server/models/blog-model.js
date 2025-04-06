import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  url: {
    type: String,
  },
  title: {
    type: String
  },
  text: {
    type: String,
  },
  imageMain: {
    url: {
      type: String,
    },
    type: {
      type: String,
    }
  },
  images: [
    {
      file: {
        url: {
          type: String,
        },
        type: {
          type: String,
        }
      },
      index: {
        type: Number
      }
    }
  ],
  date: {
    type: Date
  }
}, { 
  versionKey: false 
})

export const Blog = model("Blog", SchemaData);