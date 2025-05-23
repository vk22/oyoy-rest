<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Add new post</h1>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="images-zona">
            <v-row>
              <v-col>
                <p class="label">
                  All images (The first image will be the cover)
                </p>
                <AdminFileUploader
                  :type="'posts'"
                  @files-dropped2="addFiles"
                  ref="uploaderRef"
                ></AdminFileUploader>
                {{ files }}
              </v-col>
            </v-row>

            <!-- -->
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

      <!-- <v-row v-for="(item, index) in post.contentItems" :key="index">
        <v-col v-if="item.type === 'text'"> 
          <AdminTiptapEditor v-model="item.data"></AdminTiptapEditor>
        </v-col>
        <v-col v-if="item.type === 'gallery'"> 
          <div class="images-zona">
            <v-row>
              <v-col>
                <p class="label">Gallery</p>
                <AdminFileUploader :type="'posts-gallery'" @files-dropped2="addGalleryFiles" ref="uploadeGalleryrRef"></AdminFileUploader> 
                {{ files }}
              </v-col>
            </v-row>
          </div>
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
                    @files-dropped2="addGalleryFiles"
                    ref="uploadeGalleryrRef"
                  ></AdminFileUploader>
                  {{ files }}
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

      <!-- <v-row>
        <v-col>
          <div class="admin-sec-btn" @click="addContentItem('text')">
            add text
          </div>
          <div class="admin-sec-btn" @click="addContentItem('gallery')">
            add gallery
          </div>
        </v-col>
      </v-row> -->

      <!-- 
      <v-row>
        <v-col>
          <AdminTiptapEditor v-model="post.text"></AdminTiptapEditor>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col>
          <div class="admin-main-btn" @click="savePost()">Save</div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { onMounted, watch, computed, nextTick } from "vue";
import { useAdminStore } from "@/store/admin";
const adminStore = useAdminStore();

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const router = useRouter();
const post = ref({
  title: "",
  images: [],
  gallery: [],
  contentItems: [],
});
const uploaderRef = ref(null);
let uploadeGalleryrRef = ref(null);
const files = ref(null);

const addContentItem = async (type) => {
  // const data = (type === 'text') ? '' : [];
  post.value.contentItems.push({
    type: type,
    data: "",
  });

  if (type === "gallery") {
    await nextTick();
    // uploadeGalleryrRef = ref(null);
    console.log("uploaderRef ", uploaderRef.value);
    console.log("uploadeGalleryrRef ", uploadeGalleryrRef.value[0]);
  }
};

console.log("uploaderRef ", uploaderRef.value);
console.log("uploadeGalleryrRef ", uploadeGalleryrRef.value);

const removeContentItem = async (index) => {
  //// ask confirmation
  if (await isConfirmed()) {
    post.value.contentItems.splice(index, 1);
  }
};

const addFiles = (files) => {
  post.value.images = post.value.images.concat(files);
};

const addGalleryFiles = (files) => {
  post.value.gallery = post.value.gallery.concat(files);
};

const deleteImagesItem = async (image) => {
  if (await isConfirmed()) {
    const findIndex = post.value.images.findIndex(
      (el) => el.file.url === image.file.url
    );
    post.value.images.splice(findIndex, 1);
  }
};
const deleteGalleryItem = async (image) => {
  if (await isConfirmed()) {
    const findIndex = post.value.gallery.findIndex(
      (el) => el.file.url === image.file.url
    );
    post.value.gallery.splice(findIndex, 1);
  }
};

const draggEnd = async (data) => {
  if (data.type === "gallery") {
    post.value.gallery = [...data.images.value];
  } else {
    post.value.images = [...data.images.value];
  }
};

const uploadImages = async (array) => {
  /// upload all images
  if (post.value.images.length) {
    post.value.images = [];
    const filesUploadResponse1 = await uploaderRef.value.startUpload();
    console.log("filesUploadResponse images ", filesUploadResponse1);
    if (filesUploadResponse1.data.length) {
      // file: {url, type, section, success}
      filesUploadResponse1.data.forEach((file, index) => {
        if (file.success) {
          post.value.images.push({ file: file, index: index });
        }
      });
    }
  }

  /// upload gallery
  if (post.value.gallery.length) {
    post.value.gallery = [];
    let filesUploadResponse2 = await uploadeGalleryrRef.value[0].startUpload();
    console.log("filesUploadResponse gallery ", filesUploadResponse2);
    if (filesUploadResponse2.data.length) {
      // file: {url, type, section, success}
      filesUploadResponse2.data.forEach((file, index) => {
        if (file.success) {
          post.value.gallery.push({ file: file, index: index });
        }
      });
    }
  }

  return true;
};

const savePost = async () => {
  /// check fields
  let checkFormField = Object.values(post.value).every((i) => i !== "");
  if (!checkFormField) {
    alert("Fill in all fields!");
    return;
  }

  /// upload images
  await uploadImages();

  /// save data
  const { data } = await adminStore.fetchData("blog", "post", post);

  /// redirect
  if (data) {
    router.push({ path: "/admin/blog" })
  }
};

// watch(post.value, (newValue) => {
//   console.log('newValue ', newValue)
// })

function createURL(title) {
  const a = title.trim().replace(/\s+/g, " ");
  const b = a
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  return b;
}

watch(
  () => post.value.title,
  (newValue, oldValue) => {
    post.value.url = createURL(newValue);
  },
  { deep: true }
);

onMounted(() => {
  console.log("uploaderRef 1", uploaderRef.value);
  console.log("uploadeGalleryrRef 1", uploadeGalleryrRef.value);
});
</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";
</style>
