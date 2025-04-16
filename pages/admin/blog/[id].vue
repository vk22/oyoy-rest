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
      <v-row v-if="post.images.length">
        <draggable
          v-model="post.images"
          item-key="filename"
          handle=".gallery-item"
          @start="dragging = true"
          @end="draggEnd()"
        >
            <div class="gallery-item" v-for="(image, index) in post.images" :key="index">
              <span v-if="image">
                <img v-if="image.file" :src="image.file.url"/>
              </span>
            </div>
        </draggable>
      </v-row>
      <v-row>
        <v-col>
          <label for=""></label>
          <AdminFileUploader :type="'posts'" @files-dropped2="addFiles" ref="uploaderRef"></AdminFileUploader> 
          {{ files }}
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
const post = ref(data._rawValue)
const imagesNew = [];
const uploaderRef = ref(null);
const files = ref(null);

function addFiles(files) {
  imagesNew.push(files)
}

const draggEnd = async () => {
  await editPost();
};

const editPost = async () => {
  let checkFormField = Object.values(post.value).every((i) => i !== '')
  if (!checkFormField) {
    alert ('Fill in all fields!');
    return
  };
  if (imagesNew.length) {
    /// upload images
    let filesUploadResponse = await uploaderRef.value.startUpload();
    console.log('filesUploadResponse ', filesUploadResponse)
    if (filesUploadResponse.success) {

      // file: {url, type}
      filesUploadResponse.data.forEach((file, index) => {
        post.value.images.push({file: file, index: index})
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

// watch(post.value.title, (newValue) => {
//   console.log('newValue ', newValue)
// })

</script>

<style lang="scss" scoped>

.gallery-item {
  width: 200px;
  cursor: move;
  display: inline-flex;
  margin: 0.25rem;
}

</style>
