<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Add new menu section</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="menu.category"
            label="Category"
            :items="['food', 'drinks']"
            variant="outlined"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model="menu.section"
            variant="outlined"
            label="Section ID"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="menu.title"
            variant="outlined"
            label="Title"
          ></v-text-field>
        </v-col>
      </v-row>  
      <v-row>
        <v-col>
          <v-textarea label="Text" variant="outlined" v-model="menu.text"></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="upload-file-container">
            <AdminFileUploader
              :type="'menu'"
              :limit="1"
              :allowedFormat="['application/pdf']"
              @files-dropped2="addFilePdf"
              ref="uploaderRefPdf"
            ></AdminFileUploader>
            <div class="mt-5">
              <AdminImagesGalleryPreview
                :images="[menu.link]"
                :imagesType="'images'"
                @delete-gallery-item="deleteItemPdf"
              ></AdminImagesGalleryPreview>
            </div>

          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="upload-file-container">
            <AdminFileUploader
              :type="'menu'"
              :limit="1"
              :allowedFormat="['image/png', 'image/jpeg', 'image/jpg']"
              @files-dropped2="addFilePreview"
              ref="uploaderRefPreview"
            ></AdminFileUploader>
            <div class="mt-5">
              <AdminImagesGalleryPreview
                :images="[menu.image_preview]"
                :imagesType="'images'"
                @delete-gallery-item="deleteItemPreview"
              ></AdminImagesGalleryPreview>
            </div>
          </div>
        </v-col>
      </v-row>      
      <v-row>
        <v-col>
          <div class="admin-main-btn mr-2" @click="editMenu()">Save</div>
          <div class="admin-sec-btn" @click="deleteMenu()">Delete</div>
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
import { useAdminStore } from "@/store/admin";
import { useConfirm } from '../../compositions/useConfirm';
const { isConfirmed } = useConfirm();
const adminStore = useAdminStore();
const route = useRoute()
const router = useRouter()
const { data } = await useFetch(`/api/menu-pdf/${route.params.id}`)
const menu = ref(data.value)



/// File Upload
const uploaderRefPdf = ref(null);
const uploaderRefPreview = ref(null);
let pdfNew = ref(null);
let pdfPreviewNew = ref(null);


function addFilePdf(file) {
  console.log('addFilePdf ', file)
  pdfNew.value = file
}

function addFilePreview(file) {
  console.log('addFilePreview ', file)
  pdfPreviewNew.value = file
}

async function uploadFilePdf() {
   if (pdfNew.value) {
    let filesUploadResponse = await uploaderRefPdf.value.startUpload();
    if (filesUploadResponse.success) {
      const file = filesUploadResponse.data[0];
      console.log('file ', file)
      menu.value.link = { 
        file: {
          url: file.url, 
          type: file.type 
        },
        index: 0
      }
    }
  }
}
async function uploadFilePreview() {
  if (pdfPreviewNew.value) {
    let filesUploadResponse = await uploaderRefPreview.value.startUpload();
    if (filesUploadResponse.success) {
      const file = filesUploadResponse.data[0];
      console.log('file ', file)
      menu.value.image_preview = { 
        file: {
          url: file.url, 
          type: file.type 
        },
        index: 0
      }
    }
  } 
}

//

const deleteItemPdf = async (image) => {
  if (await isConfirmed()) {
    menu.value.link = {};
    // await adminStore.fetchData("image-storage", "DELETE", {
    //   url: image.file.url
    // });
  }
};

const deleteItemPreview = async (image) => {
  if (await isConfirmed()) {
    menu.value.image_preview = {};
    // await adminStore.fetchData("image-storage", "DELETE", {
    //   url: image.file.url
    // });
  }
};


//


const editMenu = async () => {
  await uploadFilePdf();
  await uploadFilePreview();
  const { data } = await adminStore.fetchData("menu-pdf", "put", menu);
  // if (data) {
  //   router.push({ path: "/admin/menu-pdf" });
  // }
};

const deleteMenu = async () => {
  //// ask confirmation
  if (await isConfirmed()) {
    const { success } = await adminStore.fetchData('menu-pdf', 'delete', menu); 
    if (success) {
      router.push({ path: "/admin/menu-pdf" });
    }
  }
};

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";
</style>
