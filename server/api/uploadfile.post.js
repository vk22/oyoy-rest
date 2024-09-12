import { put } from '@vercel/blob';
import multer from 'multer';
// import { callNodeListener } from 'h3';
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


export default defineEventHandler(async (event) => {
  try {

    /// local
    //await callNodeListener(upload.single('file'), event.node.req, event.node.res);

    /// vercel blob
    const formData = await readFormData(event);
    const file = formData.get('file');
    const blob = new Blob([file], { type: file.type });
    console.log('blob ', blob)
    const { url } = await put('events/event.jpg', blob, { access: 'public' });
    console.log('url ', url)
    return { 
      success: true, 
      message: 'File uploaded', 
      url: url 
    };
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    });
  }
})