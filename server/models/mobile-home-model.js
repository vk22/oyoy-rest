import { Schema, model } from "mongoose";

const SchemaData = new Schema({
  intro: {
    type: String,
  },
  menuButtonLabel: {
    type: String,
  },
  findUsEyebrow: {
    type: String,
  },
  mapLinkLabel: {
    type: String,
  },
  photosEyebrow: {
    type: String,
  },
  photosTitle: {
    type: String,
  },
  bookingButtonLabel: {
    type: String,
  },
}, {
  versionKey: false,
});

export const MobileHome = model("MobileHome", SchemaData);
