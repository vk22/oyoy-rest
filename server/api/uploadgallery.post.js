import { User } from "~~/server/models/user-model";
import multer from 'multer';
import { callNodeListener } from 'h3';
import 'dotenv/config'

let originalFileName = '';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR+'/gallery/');
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
        const res = await callNodeListener(upload.array('file', 10), event.node.req, event.node.res);
        return {success: true, message: 'Files uploaded'};
      } catch (error) {
        console.log(error);
        return createError({
          statusCode: 500,
          statusMessage: 'Something went wrong.',
        });
      }

  })