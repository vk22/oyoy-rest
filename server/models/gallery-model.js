import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  name: {
    type: String
  },
  images: [
    {
      title: {
        type: String
      },
      filename: {
        type: String
      },
      index: {
        type: Number
      }
    }
  ],
  sort: {
    type: Number,
  },
  date: {
    type: Date
  }
}, {
  versionKey: false
})

export const Gallery = model("Gallery", SchemaData);