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
      <v-row v-if="gallery.images.length">
        <draggable
          v-model="gallery.images"
          item-key="filename"
          handle=".gallery-item"
          @start="dragging = true"
          @end="draggEnd()"
        >
          <template #item="{ element: item }">
            <div class="gallery-item">
              <!-- <span>{{ item.index }}</span> -->
              <img :src="item.filename" />
            </div>
          </template>
        </draggable>

        <!-- <v-col cols="2" v-for="image in gallery.images" :key="image.filename">
              <img :src="'/uploads/gallery/'+image.filename" />
          </v-col> -->
      </v-row>
      <v-row>
        <v-col>
          <label for=""></label>
          <AdminFileUploader
            @files-dropped2="addFiles"
            ref="uploaderRef"
          ></AdminFileUploader>
          {{ files }}
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
definePageMeta({
  layout: "admin",
  middleware: ["auth"]
});
const route = useRoute();
const router = useRouter()
const { data } = await useFetch(`/api/gallery/${route.params.id}`);
const gallery = ref(data.value);
const uploaderRef = ref(null);
const dragging = ref(false);

function addFiles(files) {
  gallery.value.imageNew = files;
}

const draggEnd = async () => {
  await editItem();
};

const editItem = async () => {
  const { data } = await useFetch(`/api/gallery`, {
    method: "put",
    body: gallery,
  });

};

const deleteItem = async () => {
  const { data } = await useFetch(`/api/gallery`, {
    method: "delete",
    body: gallery,
  });

  if (data.value) {
    router.push({ path: "/admin/gallery" });
  }

  //
};
</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.gallery-item {
  width: 200px;
  cursor: move;
  display: inline-flex;
  margin: 0.25rem;
}
</style>
