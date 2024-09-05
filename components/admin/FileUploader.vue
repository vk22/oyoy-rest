<template>
	<div class="file-uploader-container">
		<AdminDropZone class="drop-area" @files-dropped="filesDropped" #default="{ dropZoneActive }">
			<label for="file-input">
				<span v-if="dropZoneActive">
					<span>Drop here</span>
				</span>
				<span v-else>
					<span class="link">Choose files</span><span> or drag&drop</span>
				</span>

				<input type="file" id="file-input" multiple @change="onInputChange" />
			</label>
			<ul class="image-list" v-show="files.length">
				<AdminFilePreview v-for="file of files" :key="file.id" :file="file" tag="li" @remove="removeFile" />
			</ul>
		</AdminDropZone>
		<!-- <button @click.prevent="uploadFiles(files)" class="upload-button">Upload</button> -->
	</div>
</template>

<script setup>
import { defineExpose } from 'vue';
const emit = defineEmits(['files-dropped2'])
const props = defineProps(['type'])

// File Management
import useFileList from '../../compositions/file-list'
const { files, addFiles, removeFile, removeFiles } = useFileList()

function filesDropped(files) {
	addFiles(files, props.type)
	emit('files-dropped2', files)
}

function onInputChange(e) {
	addFiles(e.target.files, props.type)
	e.target.value = null // reset so that selecting the same file again will still cause it to fire this change
	emit('files-dropped2', files._rawValue)
}


// Uploader
import createUploader from '../../compositions/file-uploader'
const { uploadFiles } = createUploader()


/// handler from Parent
const startUpload = async () => {
	const response = await uploadFiles(files._rawValue, props.type)
	removeFiles()
	if (response[0].ok) {
		return true
	}
}

defineExpose({ startUpload });
</script>

<style lang="scss">

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
	background: rgba(255,255,255,0.333);
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
    font-weight: 400!important;
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
