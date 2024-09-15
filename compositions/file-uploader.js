

async function uploadFiles(files, type, adminStore) {
	let formData = new FormData()
	files.forEach((file) => {
		formData.append(`file`, file.file)
	});
	formData.append(`type`, type)
	const result = await adminStore.fetchData('uploadgallery', 'POST', formData)
	console.log('result ', result)
	return result
}

export default function createUploader() {
	return {
		uploadFiles: function (files, type, adminStore) {
			return uploadFiles(files, type, adminStore)
		},
	}
}