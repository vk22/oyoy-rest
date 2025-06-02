import { put, del } from '@vercel/blob';
class ImagesService {
  constructor() {
  }
  async upload(file, type) {
    console.log('upload file ', file)
    try {
      const blob = new Blob([file], { type: file.type });
      const data = await put(`${type}/${file.name}`, blob, { access: 'public' });
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
      console.log('uploadMany upload one ', uploadOne)
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