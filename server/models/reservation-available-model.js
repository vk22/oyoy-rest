import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { 
  versionKey: false 
})

export const ReservationAvailable = model("ReservationAvailable", SchemaData);
