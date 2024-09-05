export async function uploadFile(file, type) {
	// set up the request data
	let formData = new FormData()
	formData.append('file', file.file)

	// track status and upload file
	file.status = 'loading'
	let response;
	if (type === 'gallery') {
		response = await useFetch('/api/uploadgallery', { method: 'POST', body: formData })
	} else {
		response = await useFetch('/api/uploadfile', { method: 'POST', body: formData })
	}
	
	// change status to indicate the success of the upload request
	file.status = response.ok
	return response
}

export function uploadFiles(files, type) {
	return Promise.all(files.map((file) => uploadFile(file, type)))
}

export default function createUploader(type) {
	return {
		uploadFile: function (file, type) {
			return uploadFile(file, type)
		},
		uploadFiles: function (files, type) {
			return uploadFiles(files, type)
		},
	}
}