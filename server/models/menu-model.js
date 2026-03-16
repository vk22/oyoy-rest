import { Schema, model } from "mongoose";
const SchemaData = new Schema(
  {
    section: {
      type: String,
    },
    content: [
      {
        title: {
          type: String,
        },
        ingredients: {
          type: String,
        },
        price: {
          type: String,
        },
        type: {
          type: String,
        },
        order: {
          type: Number,
        },
      },
    ],
    image: {
      type: String,
    },
    gallery: {
      type: Array,
    },
    date: {
      type: Date,
    },
    category: {
      type: String,
    },
    order: {
      type: Number,
    },
    published: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
  },
);

export const Menu = model("Menu", SchemaData);
