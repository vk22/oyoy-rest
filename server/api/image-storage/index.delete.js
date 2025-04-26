import { del } from '@vercel/blob';
export default defineEventHandler(async (event) => {
  try {
    /// vercel blob
    const body = await readBody(event)
    console.log('body ', body);
    const urlToDelete = body.url
    const result = await del(urlToDelete);
    console.log('result ', result);
    return {
      success: true,
      message: 'File deleted',
    };

  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: 'Something went wrong.',
    });
  }

})