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
          <v-text-field v-model="gallery.name" variant="outlined" label="Name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="admin-main-btn" @click="addItem()">Save</div>
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

const addItem = async () => {
  gallery.value.images = []
  /// upload images
  let filesUploadResponse = await uploaderRef.value.startUpload();
  if (filesUploadResponse.success) {
    filesUploadResponse.data.forEach((url, index) => {
      gallery.value.images.push({ filename: url, index: index })
    })
    /// save data
    const { success } = await adminStore.fetchData('gallery', 'post', gallery)
    if (success) {
      router.push({ path: "/admin/gallery" })
    }
  }

};

</script>

<style lang="scss" scoped>
@import "assets/scss/admin.scss";
</style>
