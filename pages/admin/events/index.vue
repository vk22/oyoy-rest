<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Events</h1>
            <nuxt-link to="/admin/events/add-new" class="admin-main-btn"
              >Add new
            </nuxt-link>
          </div>
        </v-col>
      </v-row>  
      <v-row>
        <v-col>
          <div class="list-item" v-for="(item, index) in events" :key="index">
            <v-row>
              <v-col md="2">
                <nuxt-link :to="'/admin/events/' + item._id">
                  <img
                    :src="item.file.url"
                    width="100%"
                    alt=""
                    v-if="item.file.type !== 'video/mp4'"
                  />
                  <video muted playsinline="" loop="" controls width="100%" v-else>
                    <source :src="item.file.url" :type="item.file.type">
                  </video>
                </nuxt-link>
              </v-col>
              <v-col md="4">
                <div class="one-item-prev-info-block__title">
                  <nuxt-link :to="'/admin/events/' + item._id">{{
                    item.title
                  }}</nuxt-link>
                </div>
              </v-col>
              <v-col md="3">
                <div class="one-item-prev-info-block__title">
                  <span v-if="item.date_start">
                    Начало: {{ $formatDate(item.date_start) }}</span
                  >
                </div>
              </v-col>
              <v-col md="3">
                <div class="one-item-prev-info-block__title">
                  <span v-if="item.date_end">
                    Окончание: {{ $formatDate(item.date_end) }}</span
                  >
                </div>
              </v-col>
            </v-row>
          </div>
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
const { data } = await useFetch('/api/events')
const events = data.value.data

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";


</style>
