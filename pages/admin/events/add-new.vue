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
  //middleware: ["auth"]
  // or middleware: 'auth'
})
const route = useRoute()
const router = useRouter()
const event = ref({
  title: '',
  text: '',
  image: ''
})
const uploaderRef = ref(null);

function addFiles(files) {
	console.log('addFiles ', files )
  event.value.image = files[0].name
}

const addEvent = async () => {
  console.log("event ", event);
  event.value.test = 'kuku'
  const { data } = await useFetch(`/api/events`, {
        method: 'post',
        body: event
    } );

  console.log("data ", data._rawValue.data);
  uploaderRef.value.startUpload();
  router.push({ path: "/admin/events" })
}



// const startFileUpload = async () => {
//   console.log(file);
//   const body = new FormData();
//   body.append("file", file.value);
//   await useFetch("/api/uploadfile", {
//     method: "POST",
//     body: body,
//     onResponse(context) {
//       // this.$refs.form.resetForm();
//       afterSubmit();
//     },
//   });
//   return true;
// };


//store.autoGalleryStart()

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";


</style>
