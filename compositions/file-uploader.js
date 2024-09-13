export async function uploadFiles(files, type) {
	let formData = new FormData()
	files.forEach((file) => {
		formData.append(`file`, file.file)
	});
	formData.append(`type`, type)
	return await useFetch('/api/uploadgallery', { method: 'POST', body: formData })
}

export default function createUploader() {
	return {
		uploadFiles: function (files, type) {
			return uploadFiles(files, type)
		},
	}
}