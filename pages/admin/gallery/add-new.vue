<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Add new gallery</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <label for=""></label>
          <AdminFileUploader :type="'gallery'" @files-dropped2="addFiles" ref="uploaderRef"></AdminFileUploader> 
   
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="gallery.name"
            variant="outlined"
            label="Name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col> 
          <div class="admin-main-btn" @click="addEvent()">Save</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup> 
import { useAdminStore } from "@/store/admin";
const adminStore = useAdminStore();
const loading = computed(() => adminStore.loading);

definePageMeta({
  layout: "admin",
  middleware: ["auth"]
});
const route = useRoute()
const router = useRouter()
const gallery = ref({
  name: '',
  images: []
})
const uploaderRef = ref(null);

function addFiles(files) {
  // files.forEach((el, index) => {
  //   gallery.value.images.push({filename: el.name, index: index})
  // })
}

const addEvent = async () => {
  adminStore.setLoading(true)
  /// clear images
  gallery.value.images = []
  //// upload image
  const responseFilesUpload = await uploaderRef.value.startUpload();
  responseFilesUpload.data._rawValue.forEach((file, index) => {
    gallery.value.images.push({filename: file.url, index: index})
  })

  const { data } = await useFetch(`/api/gallery`, {
    method: 'post',
    body: gallery
  });

  setTimeout(() => {
    adminStore.setLoading(false)
    router.push({ path: "/admin/gallery" })
  }, 1000);  
  
}


</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";


</style>
