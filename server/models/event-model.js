import { Schema, model } from "mongoose";
const SchemaData = new Schema(
  {
    url: {
      type: String,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    file: {
      url: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    gallery: {
      type: Array,
    },
    eventDate: {
      type: Date,
    },
    date: {
      type: Date,
    },
    published: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
  },
);

export const Event = model("Event", SchemaData);
