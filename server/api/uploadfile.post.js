import { User } from "~~/server/models/user-model";
import multer from 'multer';
import { callNodeListener } from 'h3';
import 'dotenv/config'

let originalFileName = '';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR);
  },
  filename: (req, file, cbd) => {
    originalFileName = file.originalname;
    cbd(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

export default defineEventHandler( async (event) => {
    try {
        await callNodeListener(upload.single('file'), event.node.req, event.node.res);
        const path = `/public/cv/${originalFileName}`;
        return path;
      } catch (error) {
        console.log(error);
        return createError({
          statusCode: 500,
          statusMessage: 'Something went wrong.',
        });
      }
  })