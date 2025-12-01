<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Add new event</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <label for=""></label>
          <AdminFileUploader
            :type="'events'"
            @files-dropped="addFiles"
            ref="uploaderRef"
          ></AdminFileUploader>
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
        <v-col cols="3">
          <div class="mb-5">
            <p class="mb-2">Event date:</p>
            <vue-date-picker v-model="event.eventDate"></vue-date-picker>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="content-item-container">
            <AdminTiptapEditor v-model="event.text"></AdminTiptapEditor>
          </div>
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
import { useAdminStore } from "@/store/admin";
const adminStore = useAdminStore();

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});
const router = useRouter();
const event = ref({
  title: "",
  text: "",
  image: "",
  eventDate: new Date(),
});
const uploaderRef = ref(null);
const files = ref(null);

function addFiles(files) {
  event.value.image = files[0].name;
}

const addEvent = async () => {
  let checkFormField = Object.values(event.value).every((i) => i !== "");
  if (!checkFormField) {
    alert("Fill in all fields!");
    return;
  }
  /// upload images
  let filesUploadResponse = await uploaderRef.value.startUpload();
  console.log("filesUploadResponse ", filesUploadResponse);
  if (filesUploadResponse.success) {
    let oneFileUpload = filesUploadResponse.data[0];
    event.value.file = oneFileUpload;
    /// save data
    const { data } = await adminStore.fetchData("events", "post", event);
    if (data) {
      router.push({ path: "/admin/events" });
    }
  }
};
</script>



<style lang="scss" scoped>
</style>
