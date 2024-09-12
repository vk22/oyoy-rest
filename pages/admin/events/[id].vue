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
          <AdminFileUploader @files-dropped2="addFiles" ref="uploaderRef"></AdminFileUploader> 
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
const { data } = await useFetch(`/api/events/${route.params.id}`)
const event = ref(data._rawValue)
const uploaderRef = ref(null);
const files = ref(null);

function addFiles(files) {
  event.value.imageNew = files[0].name
}

const editEvent = async () => {
  adminStore.setLoading(true)
  //// upload image
  if (event.value.imageNew) {
    const responseFileUpload = await uploaderRef.value.startUpload();
    const oneFileUpload = responseFileUpload[0].data._rawValue
    // console.log('oneFileUpload ', oneFileUpload)
    event.value.imageNew = oneFileUpload.url
  }

  const { data } = await useFetch(`/api/events`, {
        method: 'put',
        body: event
    } );


  event.value = data._rawValue.data

  setTimeout(() => {
    adminStore.setLoading(false)
  }, 1000);  

}

const deleteEvent = async () => {
  const { data } = await useFetch(`/api/events`, {
        method: 'delete',
        body: event
    } );
  if (data._rawValue) {
    router.push({ path: "/admin/events" })
  }

  //
}

</script>

<style lang="scss" scoped>

</style>
