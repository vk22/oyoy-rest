<template>
  <section>
    <v-container v-if="mobileHome">
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Mobile Home</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mobileHome.intro" variant="outlined" label="Intro text" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mobileHome.menuButtonLabel" variant="outlined" label="Menu button label" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mobileHome.findUsEyebrow" variant="outlined" label="Find us eyebrow" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mobileHome.mapLinkLabel" variant="outlined" label="Map link label" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mobileHome.photosEyebrow" variant="outlined" label="Photos eyebrow" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mobileHome.photosTitle" variant="outlined" label="Photos title" density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="mobileHome.bookingButtonLabel" variant="outlined" label="Booking button label" density="compact"></v-text-field>
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

const adminStore = useAdminStore();
const mobileHome = ref();

const { data } = await useFetch("/api/mobile-home", {
  method: "get",
});
mobileHome.value = data.value.data;

const save = async () => {
  await adminStore.fetchData("mobile-home", "put", mobileHome);
};
</script>
