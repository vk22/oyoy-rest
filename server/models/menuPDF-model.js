import { Schema, model } from "mongoose";
const SchemaData = new Schema({
  category: {
    type: String,
    required: true
  },
  section: {
    type: String
  },
  image_preview: {
    file: {
      url: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    index: {
      type: Number
    }
  },
  link: {
    file: {
      url: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    index: {
      type: Number
    }
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
  },
  date: {
    type: Date
  },
  order: {
    type: Number
  }
}, {
  versionKey: false
})

export const MenuPDF = model("MenuPDF", SchemaData);