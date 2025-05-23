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
  contentItems: [
    {
      type: {
        type: String,
      },
      data: {
        type: String
      }
    }
  ],
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
  gallery: [
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