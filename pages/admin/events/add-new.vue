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
          <div class="admin-main-btn" @click="addEvent()">Save</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup> 
definePageMeta({
  layout: "admin",
  middleware: ["auth"]
});
const route = useRoute()
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
  //// upload image
  const responseFileUpload = await uploaderRef.value.startUpload();
  const oneFileUpload = responseFileUpload[0].data._rawValue
  event.value.imageNew = oneFileUpload.url

  const { data } = await useFetch(`/api/events`, {
        method: 'post',
        body: event
    } );
  router.push({ path: "/admin/events" })
}


</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";


</style>
