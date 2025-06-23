import { upload } from '@vercel/blob/client';
import { useAdminStore } from "@/store/admin";

class UploadableFile {
	constructor(file) {
		this.file = file
		this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`
		this.url = URL.createObjectURL(file)
		this.status = null
	}
}

export default class FileUploader {
	constructor(allowedFormat, limit) {
		 this.files = ref([]);
		 this.allowedFormat = allowedFormat;
		 this.limit = limit;
		 this.errors = [];
	}
	fileList() {
		return this.files
	}
	checkLimit(filesNew) {
		if (filesNew.length > this.limit) {
			alert('Limit: '+this.limit)
			return true;			
		} else {
			if (this.limit) {
				if (this.limit === this.files.length) {
					alert('Limit: '+this.limit)
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	}
	checkAllowedFormat(filesNew) {
		if (this.allowedFormat) {
			return Array.from(filesNew).filter(el => {
				const check = this.allowedFormat.includes(el.type)
				if (check) {
					return el;
				} else {
					alert ('Bad format')
					return false;
				}
			})
		} else {
			return filesNew
		}
	}
	addFiles(newFiles, type) {
		let newUploadableFiles = [...newFiles].map((file) => new UploadableFile(file)).filter((file) => !this.fileExists(file.id))
		this.files.value = this.files.value.concat(newUploadableFiles)
		console.log('FileUploader addFiles ', this.files.value)
	}

	fileExists(otherId) {
		return this.files.value.some(({ id }) => id === otherId)
	}

	removeFile(file) {
		console.log('FileUploader removeFile ', file)
		const index = this.files.value.indexOf(file)
		if (index > -1) this.files.value.splice(index, 1)
	}

	removeFiles() {
		this.files.value = []
	}
	async uploadFilesServer(files, type) {
		const adminStore = useAdminStore();
		let formData = new FormData()
		files.forEach((file) => {
			formData.append(`file`, file.file)
		});
		formData.append(`type`, type)
		const result = await adminStore.fetchData('image-storage', 'POST', formData)
		return result
	}
	async uploadFileClient (files) {
		if (!files) return;
		const adminStore = useAdminStore();
		adminStore.setLoading(true);
		const file = files[0].file
		const fileName = files[0].file.name
		const blob = await upload(fileName, file, {
			access: 'public',
			handleUploadUrl: '/api/blob-upload-url',
			onUploadProgress(p) {
				console.log('p 2121', Math.round(p.percentage))
				//progress.value = Math.round(p.percentage);
			},
		});
		adminStore.setLoading(false);
		return blob; 
	};       
}

// async function uploadFilesServer(files, type) {
// 	const adminStore = useAdminStore();
// 	let formData = new FormData()
// 	files.forEach((file) => {
// 		formData.append(`file`, file.file)
// 	});
// 	formData.append(`type`, type)
// 	const result = await adminStore.fetchData('image-storage', 'POST', formData)
// 	return result
// }

// async function uploadFileClient (files) {
//   if (!files) return;
//   const adminStore = useAdminStore();
//   adminStore.setLoading(true);
//   const file = files[0].file
//   const fileName = files[0].file.name
//   const blob = await upload(fileName, file, {
//     access: 'public',
//     handleUploadUrl: '/api/blob-upload-url',
//     onUploadProgress(p) {
// 		console.log('p ', Math.round(p.percentage))
//     	//progress.value = Math.round(p.percentage);
//     },
//   });
//   adminStore.setLoading(false);
//   return blob; 
// };

// export default function createUploader() {
// 	return {
// 		uploadFilesServer: function (files, type) {
// 			return uploadFilesServer(files, type)
// 		},
// 		uploadFileClient: function (files, type) {
// 			return uploadFileClient(files, type)
// 		},
// 	}
// }

