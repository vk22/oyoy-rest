<template>
	<div class="file-uploader-container">
		<AdminDropZone class="drop-area" @files-dropped="filesDropped" #default="{ dropZoneActive }">
			<label :for="'file-input-'+props.type">
				<span v-if="dropZoneActive">
					<span>Drop here</span>
				</span>
				<span v-else>
					<span class="link">Choose files</span><span> or drag&drop</span>
				</span>
				<input type="file" :id="'file-input-'+props.type" multiple @change="onInputChange" />
			</label>
			<ul class="image-list" v-show="files.length">
				<AdminFilePreview v-for="file of files" :key="file.id" :file="file" :type="props.type" tag="li" @remove="removeFile" />
			</ul>
		</AdminDropZone>
		<!-- <button @click.prevent="uploadFiles(files)" class="upload-button">Upload</button> -->
	</div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';
import { useAdminStore } from "@/store/admin";
const adminStore = useAdminStore();
const emit = defineEmits(['files-dropped'])
const props = defineProps({
	uploadType: { type: String },
	type: { type: String, required: true },
	limit: { type: Number },
	allowedFormat: { type: Array },
	needPreview: { type: Boolean, default: false }
})
import FileUploader from '@/compositions/file-uploader';
const fileUploader = new FileUploader(props.allowedFormat, props.limit);
const files = ref(fileUploader.fileList())

function removeFile(file) {
	fileUploader.removeFile(file)
}

function filesDropped(filesNew) {
	console.log('filesDropped ', filesNew)
	const filesChecked = fileUploader.checkAllowedFormat(filesNew);
	if (filesChecked.length) {
		if (fileUploader.checkLimit(filesChecked)) return;
		fileUploader.addFiles(filesChecked, props.type)
		emit('files-dropped', filesChecked)
	}
}

function onInputChange(e) {

	const filesNew = []
	for (const file of e.target.files) {
		filesNew.push(file)
	}
	console.log('onInputChange ', filesNew)

	const filesChecked = fileUploader.checkAllowedFormat(filesNew);
	if (filesChecked.length) {
		if (fileUploader.checkLimit(filesChecked)) return;
		fileUploader.addFiles(filesChecked, props.type)
		emit('files-dropped', filesChecked)
	}
}

const startUpload = async () => {
	let response;
	if (props.uploadType) {
		response = (props.uploadType === 'client') ? 
		await fileUploader.uploadFileClient(files.value, props.type) :
		await fileUploader.uploadFilesServer(files.value, props.type, props.needPreview)
	} else {
		response = await fileUploader.uploadFilesServer(files.value, props.type, props.needPreview)
	}
	fileUploader.removeFiles()
	return response
}

defineExpose({ startUpload });
</script>

<style lang="scss" scoped>

.file-uploader-container {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.drop-area {
	width: 100%;
	max-width: 100%;
	margin: 0 auto;
	padding: 2rem;
	background: rgba(255,255,255,1);
	transition: 0.2s ease;
    border: 2px dashed #bbbbbb;
    border-radius: 1rem;
}
.drop-area[data-active=true] {
	border: 2px dashed #ffb133;
}
label {
	display: block;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    .link {
        // text-decoration: underline;
        border-bottom: 1px solid #151515;
        &:hover {
            border-bottom: 1px solid transparent;
        }
    }
	input[type=file]:not(:focus-visible) {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		padding: 0 !important;
		margin: -1px !important;
		overflow: hidden !important;
		clip: rect(0, 0, 0, 0) !important;
		white-space: nowrap !important;
		border: 0 !important;
	}
	.smaller {
        
		font-size: 1rem;
	}
}
.image-list {
	display: flex;
	list-style: none;
	flex-wrap: wrap;
	padding: 1rem 0;
}
.upload-button {
	display: block;
	appearance: none;
	border: 0;
	border-radius: 50px;
	padding: 0.75rem 3rem;
	margin: 1rem auto;
	font-size: 1.25rem;
	font-weight: bold;
	background: #369;
	color: #fff;
	text-transform: uppercase;
}
button {
	cursor: pointer;
}

</style>
