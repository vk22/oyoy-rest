<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Add new event</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <label for=""></label>
          <AdminFileUploader :type="'events'" @files-dropped2="addFiles" ref="uploaderRef"></AdminFileUploader>
          {{ files }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="event.title" variant="outlined" label="Title"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="Text" variant="outlined" v-model="event.text"></v-textarea>
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

definePageMeta({
  layout: "admin",
  middleware: ["auth"]
});
const router = useRouter()
const event = ref({
  title: '',
  text: '',
  image: ''
})
const uploaderRef = ref(null);
const files = ref(null);

function addFiles(files) {
  event.value.image = files[0].name
}

const addEvent = async () => {
  let checkFormField = Object.values(event.value).every((i) => i !== '')
  if (!checkFormField) {
    alert('Fill in all fields!');
    return
  };
  /// upload images
  let filesUploadResponse = await uploaderRef.value.startUpload();
  console.log('filesUploadResponse ', filesUploadResponse)
  if (filesUploadResponse.success) {
    let oneFileUpload = filesUploadResponse.data[0]
    event.value.image = oneFileUpload
    /// save data
    const { data } = await adminStore.fetchData('events', 'post', event)
    if (data) {
      router.push({ path: "/admin/events" })
    }
  }
};


</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";
</style>
