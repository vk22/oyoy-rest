import { put } from '@vercel/blob';
import ImagesService from "~~/server/services/imagesService.js"
export default defineEventHandler(async (event) => {
    await requireAuth(event);
  try {
    /// vercel blob
    const formData = await readFormData(event);
    //console.log('formData ', formData);
    const type = formData.get('type');
    const needPreview = formData.get('needPreview');
    const files = formData.getAll('file');
    console.log('needPreview ', needPreview);
    // console.log('files ', files);
    let uploadedPreview = false;
    if (needPreview) {
      const previewBuffer = await ImagesService.geneatePreviewBuffer(files[0]);
      const previewFileExtantion = ImagesService.checkFileExtention(files[0].type)
      const filename = `${files[0].name.split('.')[0]}-prev.${previewFileExtantion}`
      // console.log('previewBuffer ', previewBuffer)
      const uploadedPreviewResponse = await ImagesService.uploadBuffer(previewBuffer, type, filename);
      console.log('uploadedPreviewResponse ', uploadedPreviewResponse.success)
      if (uploadedPreviewResponse.success) {
        uploadedPreview = uploadedPreviewResponse
      }
    }
    const { uploadedData } = await ImagesService.uploadMany(files, type)

    console.log('uploadedData ', uploadedData)
    console.log('uploadedPreview ', uploadedPreview)
    return {
      success: true,
      message: 'Files uploaded',
      data: uploadedData,
      preview: uploadedPreview
    };

  } catch (error) {
    console.log(error);

    return {
      success: true,
      message: error.message
    };

  }

})