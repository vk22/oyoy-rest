import { put, del } from '@vercel/blob';
import sharp from 'sharp';
//import { handleUpload } from '@vercel/blob/client';

class ImagesService {
  constructor() {
  }
  // async uploadClient(file, request) {
  //   console.log('uploadClient ', file)
  //   const blob = new Blob([file], { type: file.type });
  //   try {
  //     const jsonResponse = await handleUpload({
  //       blob,
  //       request,
  //       onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
  //         // Generate a client token for the browser to upload the file
  //         // ⚠️ Authenticate and authorize users before generating the token.
  //         // Otherwise, you're allowing anonymous uploads. 

  //         console.log('onBeforeGenerateToken! ')

  //         return {
  //           allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
  //           addRandomSuffix: true,
  //           tokenPayload: JSON.stringify({
  //             // optional, sent to your server on upload completion
  //             // you could pass a user id from auth, or a value from clientPayload
  //             userId: '01010101'
  //           }),
  //         };
  //       },
  //       onUploadCompleted: async ({ blob, tokenPayload }) => {
  //         // Get notified of client upload completion
  //         // ⚠️ This will not work on `localhost` websites,
  //         // Use ngrok or similar to get the full upload flow

  //         console.log('blob upload completed', blob, tokenPayload);

  //         try {
  //           // Run any logic after the file upload completed
  //           // const { userId } = JSON.parse(tokenPayload);
  //           // await db.update({ avatar: blob.url, userId });
  //         } catch (error) {
  //           throw new Error('Could not update user');
  //         }
  //       },
  //     });
  //     console.log('jsonResponse ', jsonResponse)
  //     return {
  //       success: true,
  //       data: jsonResponse
  //     };
  //   } catch (error) {
  //       return {
  //         success: false,
  //         message: error.message
  //       }
  //   }
  // }
  async geneatePreviewBuffer(file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    return await sharp(buffer).resize({ width: 1200, height: 630 }).toBuffer();
  }
  checkFileExtention(mime) {
    const types = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png'
    }
    return types[mime];
  }
  async uploadBuffer(buffer, type, filename) {
    // console.log('upload file ', file)
    try {
      // const blob = new Blob([file], { type: file.type });
      const data = await put(`${type}/${filename}`, buffer, { access: 'public', addRandomSuffix: true });
      // console.log('uploadBuffer data ', data)
      return {
        success: true,
        url: data.url,
        type: data.contentType,
        section: type
      }

    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
  async upload(file, type) {
    // console.log('upload file ', file)
    try {
      const blob = new Blob([file], { type: file.type });
      const data = await put(`${type}/${file.name}`, blob, { access: 'public', addRandomSuffix: true });
      return {
        success: true,
        data: data
      }

    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
  async uploadMany(files, type) {
    let uploadedData = [];
    let success = true;
    for (let file of files) {
      const uploadOne = await this.upload(file, type);
      // console.log('uploadMany upload one ', uploadOne)
      if (uploadOne.success) {
        uploadedData.push({
          success: true,
          url: uploadOne.data.url,
          type: file.type,
          section: type
        })
      } else {
        success = false
        uploadedData.push({
          success: false,
          file: file.name
        })
      }
    }

    return {
      uploadedData: uploadedData
    }

  }
  async delete(url) {
    try {
      const data = await del(url);
      console.log('Image delete ', data);
      return {
        success: true,
        data: data,
        message: "Image deleted"
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }

  }

}
export default new ImagesService();