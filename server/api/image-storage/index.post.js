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
    // let urls = []
    // let success = true
    // for (let file of files) {
    //   const blob = new Blob([file], { type: file.type });
    //   const data = await put(`${type}/${file.name}`, blob, { access: 'public' });
    //   console.log('blob upload data ', data)
    //   if (data.url) {
    //     urls.push({
    //       url: data.url,
    //       type: file.type,
    //       section: type
    //     })
    //   } else {
    //     success = false
    //     urls.push(undefined)
    //   }
    // }

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
    // return createError({
    //   statusCode: 500,
    //   statusMessage: 'Something went wrong.',
    // });
  }

})