<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>{{ event.title }}</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <img :src="event.image" />
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
          <v-text-field
            v-model="event.title"
            variant="outlined"
            label="Title"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="Text" variant="outlined" v-model="event.text"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col> 
          <div class="admin-main-btn mr-2" @click="editEvent()">Save</div>
          <div class="admin-sec-btn" @click="deleteEvent()">Delete</div>
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
  // or middleware: 'auth'
})
const route = useRoute()
const router = useRouter()
const { data } = await useFetch(`/api/events/${route.params.id}`)
const event = ref(data._rawValue)
const uploaderRef = ref(null);
const files = ref(null);

function addFiles(files) {
  event.value.imageNew = files[0].name
}

const editEvent= async () => {
  let checkFormField = Object.values(event.value).every((i) => i !== '')
  if (!checkFormField) {
    alert ('Fill in all fields!');
    return
  };
  if (event.value.imageNew) {
    /// upload images
    let filesUploadResponse = await uploaderRef.value.startUpload();
    console.log('filesUploadResponse ', filesUploadResponse)
    if (filesUploadResponse.success) {
      let oneFileUpload = filesUploadResponse.data[0]
      event.value.imageNew = oneFileUpload
      /// save data
      const { data } = await adminStore.fetchData('events', 'put', event) 
      event.value = data
    }
  } else {
    /// save data
    const { data } = await adminStore.fetchData('events', 'put', event) 
    event.value = data
  }
};

const deleteEvent = async () => {
  const { success } = await adminStore.fetchData('events', 'delete', event); 
  if (success) {
    router.push({ path: "/admin/events" });
  }
};

// const deleteEvent = async () => {
//   const { data } = await useFetch(`/api/events`, {
//         method: 'delete',
//         body: event
//     } );
//   if (data._rawValue) {
//     router.push({ path: "/admin/events" })
//   }

//   //
// }

</script>

<style lang="scss" scoped>

</style>
