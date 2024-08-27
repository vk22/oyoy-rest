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
          <img :src="'/uploads/'+event.image" />
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
definePageMeta({
  layout: "admin",
  //middleware: ["auth"]
  // or middleware: 'auth'
})
const route = useRoute()
const { data } = await useFetch(`/api/events/${route.params.id}`)
const event = ref(data._rawValue)
const uploaderRef = ref(null);

function addFiles(files) {
	console.log('addFiles ', files )
  event.value.imageNew = files[0].name
}

const editEvent = async () => {
  console.log("event ", event);
  const { data } = await useFetch(`/api/events`, {
        method: 'put',
        body: event
    } );

  console.log("data ", data._rawValue.data);

  if (event.value.imageNew) {
    const responseFileUpload = await uploaderRef.value.startUpload();
    console.log("responseFileUpload ", responseFileUpload);
  }
  event.value = data._rawValue.data

}

const deleteEvent = async () => {
  console.log("event ", event);
  const { data } = await useFetch(`/api/events`, {
        method: 'delete',
        body: event
    } );

  console.log("data ", data._rawValue);
  if (data._rawValue) {
    router.push({ path: "/admin/events" })
  }

  //
}



</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";


</style>
