import { put } from '@vercel/blob';
export default defineEventHandler(async (event) => {
  try {
    /// vercel blob
    const formData = await readFormData(event);
    console.log('formData ', formData);
    const type = formData.get('type');
    const files = formData.getAll('file');
    let urls = []
    let success = true
    for (let file of files) {
      const blob = new Blob([file], { type: file.type });
      const data = await put(`${type}/${file.name}`, blob, { access: 'public' });
      console.log('blob upload data ', data)
      if (data.url) {
        urls.push({
          url: data.url,
          type: file.type,
          section: type
        })
      } else {
        success = false
        urls.push(undefined)
      }
    }
    return {
      success: success,
      message: 'Files uploaded',
      data: urls
    };

  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    });
  }

})