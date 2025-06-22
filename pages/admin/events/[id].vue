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
        <v-col>
          <div class="images-zona">
            <!-- -->
            <!-- <v-row>
              <v-col>
                <label>Images for Gallery</label>
                <AdminFileUploader :type="'gallery'" @files-dropped="addFiles" ref="uploaderRef"></AdminFileUploader> 
                {{ files }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <AdminImagesGalleryPreview :images="gallery.images" :imagesType="'gallery'" @drag-end="draggEnd" @delete-gallery-item="deleteGalleryItem"></AdminImagesGalleryPreview>
              </v-col>
            </v-row> -->


            <v-row>
              <v-col>
                <label for=""></label>
                <AdminFileUploader :type="'events'" @files-dropped="addFiles" ref="uploaderRef"></AdminFileUploader> 
                {{ files }}
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2" v-if="event.file">
                <!-- <img :src="event.file.url" v-if="event.file.type !== 'video/mp4'"/>
                <video muted playsinline="" loop="" controls v-else >
                  <source :src="event.file.url" :type="event.file.type">
                </video> -->
                <AdminImagesGalleryPreview :images="[{file: event.file}]" :imagesType="'events'" @delete-gallery-item="deleteGalleryItem"></AdminImagesGalleryPreview>
              </v-col>
            </v-row>


          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            v-model="event.url"
            variant="outlined"
            label="URL"
          ></v-text-field>
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
          <!-- <v-textarea label="Text" variant="outlined" v-model="event.text"></v-textarea> -->
          <AdminTiptapEditor v-model="event.text"></AdminTiptapEditor>
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
import { onMounted, watch, computed } from 'vue';
import { useAdminStore } from "@/store/admin";
import { useConfirm } from '@/compositions/useConfirm';
const { isConfirmed } = useConfirm();
const adminStore = useAdminStore();
const loading = computed(() => adminStore.loading);

definePageMeta({
  layout: "admin",
  middleware: ["auth"]
  // or middleware: 'auth'
})
// console.log('params: ', `/api/events/${route.params.id}`)
const route = useRoute()
const router = useRouter()
const { data } = await useFetch(`/api/events/${route.params.id}`)
const event = ref(data.value)
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
    }
  } 
  await adminStore.fetchData('events', 'put', event) 
  // event.value = data
};

const deleteGalleryItem = async (index) => {
  //// ask confirmation
  if (await isConfirmed()) {
    event.value.file = []
    await adminStore.fetchData('events', 'put', event)
  }
};

const deleteEvent = async () => {
  //// ask confirmation
  if (await isConfirmed()) {
    const { success } = await adminStore.fetchData('events', 'delete', event); 
    if (success) {
      router.push({ path: "/admin/events" });
    }
  }
};

</script>

<style lang="scss" scoped>

</style>
