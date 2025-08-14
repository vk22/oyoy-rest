<template>
  <section v-if="post">
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>{{ post.title }}</h1>
          </div>
        </v-col>
      </v-row>
      <!-- -->

      <v-row>
        <v-col>
          <div class="images-zona">
            <p class="label">Main Image</p>
            <AdminFileUploader
              :type="'posts'"
              :needPreview="true"
              :limit="1"
              :allowedFormat="['image/png', 'image/jpeg', 'image/jpg']"
              @files-dropped="addMainImage"
              ref="uploaderMainImageRef"
            ></AdminFileUploader>
            {{ files }}
            <div class="mt-5">
              <AdminImagesGalleryPreview
                :images="[post.mainImage]"
                :imagesType="'images'"
                @drag-end="draggEnd"
                @delete-gallery-item="deleteImagesItem"
              ></AdminImagesGalleryPreview>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="images-zona">
            <p class="label">All images</p>
            <AdminFileUploader
              :type="'posts'"
              @files-dropped="addFiles"
              ref="uploaderRef"
            ></AdminFileUploader>
            {{ files }}
            <div class="mt-5">
              <AdminImagesGalleryPreview
                :images="post.images"
                :imagesType="'images'"
                :allowedFormat="['image/png', 'image/jpeg', 'image/jpg']"
                @drag-end="draggEnd"
                @delete-gallery-item="deleteImagesItem"
              ></AdminImagesGalleryPreview>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="post.title"
            variant="outlined"
            label="Title"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="post.url"
            variant="outlined"
            label="URL"
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-row v-if="post.text">
        <v-col>
           <AdminTiptapEditor v-model="post.text"></AdminTiptapEditor>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col>
          <div class="content-item-container">
            <draggable :list="post.contentItems" handle=".handle">
              <div
                class="content-item"
                v-for="(item, index) in post.contentItems"
                :key="index"
              >
                <div class="content-item__text" v-if="item.type === 'text'">
                  <AdminTiptapEditor v-model="item.data"></AdminTiptapEditor>
                </div>
                <div
                  class="content-item__gallery"
                  v-if="item.type === 'gallery'"
                >
                  <p class="label">Gallery</p>
                  <AdminFileUploader
                    :type="'posts-gallery'"
                    @files-dropped="addGalleryFiles"
                    :allowedFormat="['image/png', 'image/jpeg', 'image/jpg']"
                    ref="uploadeGalleryrRef"
                  ></AdminFileUploader>
                  {{ files }}
                  <div class="mt-5">
                    <AdminImagesGalleryPreview
                      :images="post.gallery"
                      :imagesType="'gallery'"
                      @drag-end="draggEnd"
                      @delete-gallery-item="deleteGalleryItem"
                    ></AdminImagesGalleryPreview>
                  </div>
                </div>
                <div class="content-item__actions">
                  <div class="handle">
                    <v-icon>mdi-drag</v-icon>
                  </div>
                  <div class="admin-icon-btn" @click="removeContentItem(index)">
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="14.3154"
                        width="20.2454"
                        height="2.38181"
                        rx="1.1909"
                        transform="rotate(-45 0 14.3154)"
                        fill="black"
                      ></rect>
                      <rect
                        x="1.68555"
                        width="20.2454"
                        height="2.38181"
                        rx="1.1909"
                        transform="rotate(45 1.68555 0)"
                        fill="black"
                      ></rect>
                    </svg>
                  </div>
                </div>
              </div>
            </draggable>
            <div class="content-editors-btns">
              <div class="admin-sm-btn mr-2" @click="addContentItem('text')">
                Add text
              </div>
              <div
                class="admin-sm-btn"
                :class="{ disable: contentItemGalleryExist }"
                @click="addContentItem('gallery')"
              >
                Add gallery
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-checkbox v-model="post.published" label="Published"></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <hr />
          <br />
          <div class="admin-main-btn mr-2" @click="editPost()">Save</div>
          <div class="admin-sec-btn" @click="deletePost()">Delete</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <div v-else>Something wrong</div>
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import { useAdminStore } from "@/store/admin";
import { useConfirm } from "@/compositions/useConfirm";
const { isConfirmed } = useConfirm();
const adminStore = useAdminStore();
const loading = computed(() => adminStore.loading);

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
  // or middleware: 'auth'
});
// console.log('params: ', `/api/posts/${route.params.id}`)
const route = useRoute();
const router = useRouter();
const { data } = await useFetch(`/api/blog/${route.params.id}`);
const post = ref(data.value);
const contentItems = ref([]);

const contentItemGallery = post.value.contentItems.find(
  (item) => item.type === "gallery"
);

const contentItemGalleryExist = computed(() => {
  const exist = post.value.contentItems.find((item) => item.type === "gallery");
  if (exist) {
    return true;
  } else {
    return false;
  }
});

const addContentItem = async (type) => {
  // const data = (type === 'text') ? '' : [];
  post.value.contentItems.push({
    type: type,
    data: "",
  });

  if (type === "gallery") {
    await nextTick();
  }
};

async function removeContentItem(index) {
  //// ask confirmation
  if (await isConfirmed()) {
    post.value.contentItems.splice(index, 1);
  }
}

const mainImageNew = ref(null);
let imagesNew = [];
let imagesGalleryNew = [];
const uploaderMainImageRef = ref(null);
const uploaderRef = ref(null);
const uploadeGalleryrRef = ref(null);
const files = ref(null);

const addMainImage = (file) => {
  mainImageNew.value = file;
};
const addFiles = (files) => {
  imagesNew = imagesNew.concat(files);
};
const addGalleryFiles = (files) => {
  imagesGalleryNew = imagesGalleryNew.concat(files);
};
const draggEnd = async (data) => {
  if (data.type === "gallery") {
    post.value.gallery = [...data.images.value];
  } else {
    post.value.images = [...data.images.value];
  }
  // await editPost();
  await adminStore.fetchData("blog", "put", post);
};

const uploadImages = async (array) => {
  /// upload main Image
  if (mainImageNew.value) {
    const filesUploadResponse0 = await uploaderMainImageRef.value.startUpload();
    console.log("filesUploadResponse0 ", filesUploadResponse0);
    if (filesUploadResponse0.success) {
      const file = filesUploadResponse0.data[0];
      const preview = filesUploadResponse0.preview ? filesUploadResponse0.preview : false;
      console.log("file ", file);
      post.value.mainImage = {
        file: {
          url: file.url,
          type: file.type,
        },
        index: 0,
      };
      if (preview) {
        post.value.previewImage = {
          file: {
            url: preview.url,
            type: preview.type,
          },
          index: 0,
        };
      }

      mainImageNew.value = null;
    }
  }

  /// upload images
  if (imagesNew.length) {
    const filesUploadResponse1 = await uploaderRef.value.startUpload();
    console.log("filesUploadResponse1 ", filesUploadResponse1);
    if (filesUploadResponse1.success) {
      // file: {url, type, section}
      filesUploadResponse1.data.forEach((file, index) => {
        post.value.images.push({ file: file, index: index });
      });
    }
  }

  /// upload gallery
  if (imagesGalleryNew.length) {
    let filesUploadResponse2 = await uploadeGalleryrRef.value.startUpload();
    console.log("filesUploadResponse2 ", filesUploadResponse2);
    if (filesUploadResponse2.success) {
      // file: {url, type, section}
      filesUploadResponse2.data.forEach((file, index) => {
        post.value.gallery.push({ file: file, index: index });
      });
    }
  }
};

const editPost = async () => {
  let checkFormField = Object.values(post.value).every((i) => i !== "");
  if (!checkFormField) {
    alert("Fill in all fields!");
    return;
  }

  /// upload images
  await uploadImages();

  /// save data
  const { data } = await adminStore.fetchData("blog", "put", post);
  // post.value = data
};

const deletePost = async () => {
  //// ask confirmation
  if (await isConfirmed()) {
    const { success } = await adminStore.fetchData("blog", "delete", post);
    if (success) {
      router.push({ path: "/admin/blog" });
    }
  }
};
const deleteImagesItem = async (image) => {
  if (await isConfirmed()) {
    const findIndex = post.value.images.findIndex(
      (el) => el.file.url === image.file.url
    );
    post.value.images.splice(findIndex, 1);
    await adminStore.fetchData("blog", "put", post);
    await adminStore.fetchData("image-storage", "DELETE", {
      url: image.file.url,
    });
  }
};
const deleteGalleryItem = async (image) => {
  if (await isConfirmed()) {
    const findIndex = post.value.gallery.findIndex(
      (el) => el.file.url === image.file.url
    );
    post.value.gallery.splice(findIndex, 1);
    await adminStore.fetchData("blog", "put", post);
    await adminStore.fetchData("image-storage", "DELETE", {
      url: image.file.url,
    });
  }
};

onMounted(() => {
  console.log("uploaderMainImageRef", uploaderMainImageRef.value);
  console.log("uploaderRef 1", uploaderRef.value);
});

</script>

<style lang="scss" scoped>
.gallery-item {
  width: 200px;
  cursor: move;
  display: inline-flex;
  margin: 0.25rem;
}
</style>
