<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>{{ gallery.name }}</h1>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="images-zona">
            <!-- -->
            <v-row>
              <v-col>
                <label>Images for Gallery</label>
                <AdminFileUploader :type="'gallery'" @files-dropped2="addFiles" ref="uploaderRef"></AdminFileUploader> 
                {{ files }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <AdminImagesGalleryPreview :images="gallery.images" :imagesType="'gallery'" @drag-end="draggEnd" @delete-gallery-item="deleteGalleryItem"></AdminImagesGalleryPreview>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="gallery.name"
            variant="outlined"
            label="Title"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="admin-main-btn mr-2" @click="editItem()">Save</div>
          <div class="admin-sec-btn" @click="deleteItem()">Delete</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useAdminStore } from "@/store/admin";
import { useConfirm } from '../../compositions/useConfirm';
const { isConfirmed } = useConfirm();
const adminStore = useAdminStore();
const loading = computed(() => adminStore.loading);

definePageMeta({
  layout: "admin",
  middleware: ["auth"]
});
const route = useRoute();
const router = useRouter()
const { data } = await useFetch(`/api/gallery/${route.params.id}`);
const gallery = ref(data.value);
gallery.value.imagesNew = [];
const uploaderRef = ref(null);
// const files = ref([]);
const dragging = ref(false);

function addFiles(files) {
  console.log('files ', files)
  gallery.value.imagesNew.push(files);
  console.log('gallery.value.imagesNew ', gallery.value.imagesNew)
}


const draggEnd = async (data) => {
  console.log('draggEnd type ', data.type)
  console.log('draggEnd images ', data.images.value)
  if (data.type === 'gallery') {
    gallery.value.images = [...data.images.value]
  } 
  // await editPost();
  await adminStore.fetchData('gallery', 'put', gallery) 
};

const editItem = async () => {
  if (gallery.value.imagesNew.length) {
    /// upload images
    let filesUploadResponse = await uploaderRef.value.startUpload();
    console.log('filesUploadResponse ', filesUploadResponse)
    if (filesUploadResponse.success) {
      filesUploadResponse.data.forEach((file, index) => {
        // file: {url, type}
        gallery.value.images.push({file: file, index: index})
      })
      console.log('gallery ', gallery)
      /// save data
      await adminStore.fetchData('gallery', 'put', gallery) 
    }
  } else {
    /// save data
    await adminStore.fetchData('gallery', 'put', gallery) 
  }
};

const deleteItem = async () => {
  //// ask confirmation
  if (await isConfirmed()) {
    const { success } = await adminStore.fetchData('gallery', 'delete', gallery); 
    if (success) {
      router.push({ path: "/admin/gallery" });
    }
  }
};

const deleteGalleryItem = async (index) => {
  //// ask confirmation
  if (await isConfirmed()) {
    gallery.value.images.splice(index, 1)
    await adminStore.fetchData('gallery', 'put', gallery)
  }
};

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.gallery-item-wrap {
  position: relative;
  width: 200px;
  display: inline-flex;
  margin: 0.25rem;

  .gallery-item-actions {
    position: absolute;
    top: -4px;
    right: -4px;
    display: flex;

    .remove-icon {
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      position: relative;
      width: 24px;
      height: 24px;
      background: #111;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 99px;
      

      svg {
          transform: scale(0.65);
          transition: all .15s ease;
      }

      &:hover {
        
        svg {
          transform: scale(0.75);
        }
      }
      
    }


  }

  .gallery-item {
    width: 200px;
    cursor: move;
    display: inline-flex;
    margin: 0.25rem;
  }
}


</style>
