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
definePageMeta({
  layout: "admin",
  //middleware: ["auth"]
  // or middleware: 'auth'
})
const route = useRoute()
const router = useRouter()
const gallery = ref({
  name: '',
  images: []
})
const uploaderRef = ref(null);

function addFiles(files) {
	console.log('addFiles ', files )
  files.forEach((el, index) => {
    gallery.value.images.push({filename: el.name, index: index})
  })
 
}

const addEvent = async () => {
  console.log("gallery ", gallery);
  const { data } = await useFetch(`/api/gallery`, {
        method: 'post',
        body: gallery
    } );

  console.log("data ", data._rawValue.data);
  uploaderRef.value.startUpload();
  router.push({ path: "/admin/gallery" })
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
