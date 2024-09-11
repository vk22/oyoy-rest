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
          <div class="list-item" v-for="(promo, index) in events" :key="index">
            <v-row>
              <v-col md="2">
                <nuxt-link :to="'/admin/events/' + promo._id">
                  <img
                    :src="promo.image"
                    width="100"
                    alt=""
                  />
                </nuxt-link>
              </v-col>
              <v-col md="4">
                <div class="one-promo-prev-info-block__title">
                  <nuxt-link :to="'/admin/events/' + promo._id">{{
                    promo.title
                  }}</nuxt-link>
                </div>
              </v-col>
              <v-col md="3">
                <div class="one-promo-prev-info-block__title">
                  <span v-if="promo.date_start">
                    Начало: {{ $formatDate(promo.date_start) }}</span
                  >
                </div>
              </v-col>
              <v-col md="3">
                <div class="one-promo-prev-info-block__title">
                  <span v-if="promo.date_end">
                    Окончание: {{ $formatDate(promo.date_end) }}</span
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
const events = data._rawValue.events

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";


</style>
