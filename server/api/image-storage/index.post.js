import { put } from '@vercel/blob';
import ImagesService from "~~/server/services/imagesService.js"
export default defineEventHandler(async (event) => {
  try {
    /// vercel blob
    const formData = await readFormData(event);
    console.log('formData ', formData);
    const type = formData.get('type');
    const files = formData.getAll('file');
    const { uploadedData } = await ImagesService.uploadMany(files, type)

    console.log('uploadedData ', uploadedData)
    return {
      success: true,
      message: 'Files uploaded',
      data: uploadedData
    };

  } catch (error) {
    console.log(error);

    return {
      success: true,
      message: error.message
    };

  }

})