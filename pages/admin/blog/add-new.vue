<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Add new post</h1>
          </div>
        </v-col>
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
          <v-text-field v-model="post.title" variant="outlined" label="Title"></v-text-field>
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
          <div class="admin-main-btn" @click="addpost()">Save</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue';
import { useAdminStore } from "@/store/admin";
const adminStore = useAdminStore();

definePageMeta({
  layout: "admin",
  middleware: ["auth"]
});
const router = useRouter()
const post = ref({
  title: '',
  text: '',
  images: []
})
const uploaderRef = ref(null);
const files = ref(null);

function addFiles(files) {
  post.value.imageMain = files[0].name
}

const addpost = async () => {
  let checkFormField = Object.values(post.value).every((i) => i !== '')
  if (!checkFormField) {
    alert('Fill in all fields!');
    return
  };
  /// upload images
  let filesUploadResponse = await uploaderRef.value.startUpload();
  console.log('filesUploadResponse ', filesUploadResponse)
  if (filesUploadResponse.success) {

    // file: {url, type}
    filesUploadResponse.data.forEach((file, index) => {
      post.value.images.push({file: file, index: index})
    })

    /// save data
    const { data } = await adminStore.fetchData('blog', 'post', post)
    if (data) {
      router.push({ path: "/admin/blog" })
    }
  }
};

// watch(post.value, (newValue) => {
//   console.log('newValue ', newValue)
// })

function createURL(title) {
 const a = title.trim().replace(/\s+/g, " ");
 const b = a.toLowerCase().replace(/ /g, '-')
     .replace(/[^\w-]+/g, '');
  return b
}

watch(
  () => post.value.title,
  (newValue, oldValue) => {    
    post.value.url = createURL(newValue)
  },
  { deep: true }
)


</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";
</style>
