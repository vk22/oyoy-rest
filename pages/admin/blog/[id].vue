<template>
  <section v-if="post">
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>{{ post.title }}</h1>
          </div>
        </v-col>
      </v-row>
      <!-- -->
      <v-row>
        <v-col>
          <div class="images-zona">
            <v-row>
              <v-col>
                <label>All Images</label>
                <AdminFileUploader :type="'posts'" @files-dropped2="addFiles" ref="uploaderRef"></AdminFileUploader> 
                {{ files }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <AdminImagesGalleryPreview :images="post.images" :imagesType="'images'" @drag-end="draggEnd" @delete-gallery-item="deleteImagesItem"></AdminImagesGalleryPreview>
              </v-col>
            </v-row>

            <!-- -->
            <v-row>
              <v-col>
                <label>Images for Gallery</label>
                <AdminFileUploader :type="'posts-gallery'" @files-dropped2="addGalleryFiles" ref="uploadeGalleryrRef"></AdminFileUploader> 
                {{ files }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <AdminImagesGalleryPreview :images="post.gallery" :imagesType="'gallery'" @drag-end="draggEnd" @delete-gallery-item="deleteGalleryItem"></AdminImagesGalleryPreview>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="post.title"
            variant="outlined"
            label="Title"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="post.url"
            variant="outlined"
            label="URL"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- <v-textarea label="Text" variant="outlined" v-model="post.text"></v-textarea> -->
          <AdminTiptapEditor v-model="post.text"></AdminTiptapEditor>
        </v-col>
      </v-row>
      <v-row>
        <v-col> 
          <div class="admin-main-btn mr-2" @click="editPost()">Save</div>
          <div class="admin-sec-btn" @click="deletePost()">Delete</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <div v-else>
    Something wrong
  </div> 
</template>

<script setup> 
import { onMounted, watch, computed } from 'vue';
import { useAdminStore } from "@/store/admin";
const adminStore = useAdminStore();
const loading = computed(() => adminStore.loading);

definePageMeta({
  layout: "admin",
  middleware: ["auth"]
  // or middleware: 'auth'
})
// console.log('params: ', `/api/posts/${route.params.id}`)
const route = useRoute()
const router = useRouter()
const { data } = await useFetch(`/api/blog/${route.params.id}`)
const post = ref(data.value)
console.log('post ', post.value)
let imagesNew = [];
let imagesGalleryNew = [];
const uploaderRef = ref(null);
const uploadeGalleryrRef = ref(null);
const files = ref(null);

const addFiles = (files) => {
  imagesNew = imagesNew.concat(files)
}
const addGalleryFiles = (files) => {
  imagesGalleryNew = imagesGalleryNew.concat(files)
}
const draggEnd = async (data) => {
  if (data.type === 'gallery') {
    post.value.gallery = [...data.images.value]
  } else {
    post.value.images = [...data.images.value]
  }
  // await editPost();
  await adminStore.fetchData('blog', 'put', post) 
};
const editPost = async () => {
  let checkFormField = Object.values(post.value).every((i) => i !== '')
  if (!checkFormField) {
    alert ('Fill in all fields!');
    return
  };

  /// upload images
  if (imagesNew.length) {
    const filesUploadResponse1 = await uploaderRef.value.startUpload();
    console.log('filesUploadResponse1 ', filesUploadResponse1)
    if (filesUploadResponse1.success) {
      // file: {url, type, section}
      filesUploadResponse1.data.forEach((file, index) => {
        post.value.images.push({file: file, index: index})
      })
    }  
  }

  /// upload gallery
  if (imagesGalleryNew.length) {
    let filesUploadResponse2 = await uploadeGalleryrRef.value.startUpload();
    console.log('filesUploadResponse2 ', filesUploadResponse2)
    if (filesUploadResponse2.success) {
      // file: {url, type, section}
      filesUploadResponse2.data.forEach((file, index) => {
        post.value.gallery.push({file: file, index: index})
      })
    } 
  }

  console.log('post save', post.value)
  /// save data
  const { data } = await adminStore.fetchData('blog', 'put', post) 
  // post.value = data
};
const deletePost = async () => {
  const { success } = await adminStore.fetchData('blog', 'delete', post); 
  if (success) {
    router.push({ path: "/admin/blog" });
  }
};
const deleteImagesItem = async (image) => {
  console.log('deleteImagesItem ', image)
  const findIndex = post.value.images.findIndex(el => el.file.url === image.file.url)
  console.log('findIndex ', findIndex)
  post.value.images.splice(findIndex, 1)
  await adminStore.fetchData('blog', 'put', post) 
  await adminStore.fetchData('image-storage', 'DELETE', {url: image.file.url})
};
const deleteGalleryItem = async (image) => {
  console.log('deleteGalleryItem url ', image.file.url)
  const findIndex = post.value.gallery.findIndex(el => el.file.url === image.file.url)
  console.log('findIndex ', findIndex)
  post.value.gallery.splice(findIndex, 1)
  await adminStore.fetchData('blog', 'put', post) 
  await adminStore.fetchData('image-storage', 'DELETE', {url: image.file.url})
};


</script>

<style lang="scss" scoped>

.gallery-item {
  width: 200px;
  cursor: move;
  display: inline-flex;
  margin: 0.25rem;
}

</style>
