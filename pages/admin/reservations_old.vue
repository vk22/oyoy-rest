<template>
  <v-row>
    <v-col>
      <div class="admin-title">
        <h1>Reservations</h1>
        <!-- <nuxt-link to="/admin/events/add-new" class="admin-main-btn"
          >Add new
        </nuxt-link> -->
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row" role="columnheader">Name</div>
          <div class="flex-row" role="columnheader">Phone</div>
          <div class="flex-row" role="columnheader">Date</div>
          <div class="flex-row" role="columnheader">Time</div>
          <div class="flex-row" role="columnheader">Persons</div>
          <div class="flex-row" role="columnheader">Message</div>
        </div>
        <div
          class="flex-table row"
          role="rowgroup"
          v-for="(item, index) in items"
          :key="index"
        >
          <div class="flex-row first" role="cell">
            {{ item.name }}
          </div>
          <div class="flex-row" role="cell">
            {{ item.phone }}
          </div>
          <div class="flex-row" role="cell">
            {{ item.date }}
          </div>
          <div class="flex-row first" role="cell">
            {{ item.time }}
          </div>
          <div class="flex-row" role="cell">
            {{ item.persons }}
          </div>
          <div class="flex-row" role="cell">
            {{ item.message }}
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  //middleware: ["auth"]
  // or middleware: 'auth'
});

const { data } = await useFetch("/api/getreservation");
const items = data._rawValue.reservations;

//store.autoGalleryStart()
</script>



<style lang="scss" scoped>

</style>
