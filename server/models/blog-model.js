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
  mainImage: {
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
  previewImage: {
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
  date: {
    type: Date
  },
  published: {
    type: Boolean
  }
}, { 
  versionKey: false 
})

export const Blog = model("Blog", SchemaData);