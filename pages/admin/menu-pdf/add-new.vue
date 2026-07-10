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
            <div class="images-zona">
                <p class="label">PDF file</p>
                <AdminFileUploader
                  :type="'menu'"
                  :uploadType="'client'"
                  :limit="1"
                  :allowedFormat="['application/pdf']"
                  @files-dropped="addFilePdf"
                  ref="uploaderRefPdf"
                ></AdminFileUploader>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="upload-file-container">
            <div class="images-zona">
              <p class="label">Preview file (jpg, png)</p>
              <AdminFileUploader
                :type="'menu'"
                :limit="1"
                :allowedFormat="['image/png', 'image/jpeg', 'image/jpg']"
                @files-dropped="addFilePreview"
                ref="uploaderRefPreview"
              ></AdminFileUploader>
            </div>
          </div>
        </v-col>
      </v-row>   
      <v-row>
        <v-col>
          <v-checkbox v-model="menu.published" label="Published"></v-checkbox>
        </v-col>
      </v-row>   
      <v-row>
        <v-col>
          <div class="admin-main-btn" @click="addMenu()">Save</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
import { useAdminStore } from "@/store/admin";
const adminStore = useAdminStore();
const router = useRouter();
const menu = ref({
  section: "",
  category: undefined,
  title: "",
  text: "",
  image_preview: {},
  link: {},
  published: true
});


/// File Upload

const uploaderRefPdf = ref(null);
const uploaderRefPreview = ref(null);
const file = ref('');

function addFilePdf(file) {
  console.log('addFilePdf ', file)
  menu.value.link = file
}

function addFilePreview(file) {
  console.log('addFilePreview ', file)
  menu.value.image_preview = file
}

async function uploadFilePdf() {
  if (menu.value.link) {
    let filesUploadResponse = await uploaderRefPdf.value.startUpload();
    if (filesUploadResponse) {
      menu.value.link = { 
        file: {
          url: filesUploadResponse.url, 
          type: filesUploadResponse.contentType 
        },
        index: 0
      }
    }
  }

}

async function uploadFilePreview() {
  if (menu.value.image_preview) {
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

const addMenu = async () => {
  await uploadFilePdf();
  await uploadFilePreview();
  const { data } = await adminStore.fetchData("menu-pdf", "post", menu);
  if (data) {
    router.push({ path: "/admin/menu-pdf" });
  }
};
</script>



<style lang="scss" scoped>

</style>
