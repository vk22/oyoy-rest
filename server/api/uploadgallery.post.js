import { put } from '@vercel/blob';
import multer from 'multer';
// import { callNodeListener } from 'h3';
import 'dotenv/config'

let originalFileName = '';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR + '/gallery/');
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
    // const res = await callNodeListener(upload.array('file', 10), event.node.req, event.node.res);
    // return {success: true, message: 'Files uploaded'};

    /// vercel blob
    const formData = await readFormData(event);
    const type = formData.get('type');
    const files = formData.getAll('file');
    let results = []
    for (let file of files) {
      const blob = new Blob([file], { type: file.type });
      const { url } = await put(`${type}/${type}.jpg`, blob, { access: 'public' });
      console.log('url ', url)
      if (url) {
        results.push({
          success: true,
          message: 'File uploaded',
          url: url
        })
      } else {
        results.push({
          success: false,
          message: 'Something went wrong',
        })
      }
    }
    return results;

  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    });
  }

})