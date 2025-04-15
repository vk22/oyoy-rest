import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  isAvailable: {
    type: Boolean
  }
}, { 
  versionKey: false 
})

export const ReservationAvailable = model("ReservationAvailable", SchemaData);