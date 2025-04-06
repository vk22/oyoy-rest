import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  text: {
    type: String
  },
  href: {
    type: String,
  },
  type: {
    type: String,
  },
  isHomePageAnchor: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  order: {
    type: Number,
  }
}, { 
  versionKey: false 
})

export const Nav = model("Nav", SchemaData);