<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Chef</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="chef.title"
            variant="outlined"
            label="Title"
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="upload-file-container">
            <div class="images-zona">
              <p class="label">Preview file (jpg, png)</p>
              <AdminFileUploader
                :type="'chef'"
                :limit="1"
                :allowedFormat="['image/png', 'image/jpeg', 'image/jpg']"
                @files-dropped="addFile"
                ref="uploaderRef"
              ></AdminFileUploader>
              <div class="mt-5">
                <AdminImagesGalleryPreview
                  :images="[chef.image]"
                  :imagesType="'images'"
                  @delete-gallery-item="deleteItem"
                ></AdminImagesGalleryPreview>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <AdminTiptapEditor v-model="chef.text"></AdminTiptapEditor>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="admin-main-btn mr-2" @click="save()">Save</div>
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
import { useConfirm } from "@/compositions/useConfirm";
const { isConfirmed } = useConfirm();
const adminStore = useAdminStore();
const chef = ref();

const { data } = await useFetch("/api/chef", {
  method: "get",
});
chef.value = data.value.data;

function textUpdate(text) {
  chef.value.text = text;
}

/// File Upload
const uploaderRef = ref(null);
let pdfPreviewNew = ref(null);

function addFile(file) {
  console.log("addFilePreview ", file);
  pdfPreviewNew.value = file;
}

async function uploadFile() {
  if (pdfPreviewNew.value) {
    let filesUploadResponse = await uploaderRef.value.startUpload();
    if (filesUploadResponse.success) {
      const file = filesUploadResponse.data[0];
      console.log("file ", file);
      chef.value.image = {
        file: {
          url: file.url,
          type: file.type,
        },
        index: 0,
      };
    }
  }
}

//

const deleteItem = async (image) => {
  if (await isConfirmed()) {
    chef.value.image = {};
    await adminStore.fetchData("image-storage", "DELETE", {
      url: image.file.url
    });
  }
};


const save = async () => {
  await uploadFile();
  console.log('chef ', chef)
  await adminStore.fetchData("chef", "put", chef);
};

//store.autoGalleryStart()
</script>



<style lang="scss" scoped>
.reservation-panel {
  font-family: $font-sans;
  padding: 1rem;

  h1,
  h2,
  h3 {
    font-family: $font-sans;
    color: #111;
    font-weight: 600;
  }

  &__header {
    border-bottom: 1px solid #e2e2e2;
    margin-bottom: 1rem;
  }

  &__content {
    .v-col:nth-child(2) {
      span {
        font-weight: 500;
        display: inline-block;
      }
    }
  }
}

.orders-table {
  margin-top: 1rem;
  &__header {
    background: #f0f0f0;
    margin-bottom: 0rem;
    border-radius: 4px;
  }

  &__item {
    cursor: pointer;
    padding: 1rem;
    margin: 0 -12px;
    border-bottom: 1px solid #f5f5f5;

    &:hover {
      background: #f5f5f5;
    }

    .v-col {
      display: flex;
      align-items: center;
    }
  }
}
</style>
