import { upload } from '@vercel/blob/client';

async function uploadFilesServer(files, type, adminStore) {
	let formData = new FormData()
	files.forEach((file) => {
		formData.append(`file`, file.file)
	});
	formData.append(`type`, type)
	const result = await adminStore.fetchData('image-storage', 'POST', formData)
	return result
}

async function uploadFileClient (files) {
  if (!files) return;
  const file = files[0].file
  const fileName = files[0].file.name
  const blob = await upload(fileName, file, {
    access: 'public',
    allowOverwrite: true,
    handleUploadUrl: '/api/blob-upload-url',
    onUploadProgress(p) {
		console.log('p ', Math.round(p.percentage))
    	//progress.value = Math.round(p.percentage);
    },
  });

  return blob; 
};

export default function createUploader() {
	return {
		uploadFilesServer: function (files, type, adminStore) {
			return uploadFilesServer(files, type, adminStore)
		},
		uploadFileClient: function (files, type) {
			return uploadFileClient(files, type)
		},
	}
}