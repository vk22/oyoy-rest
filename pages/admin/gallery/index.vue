<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Gallery</h1>
            <nuxt-link to="/admin/gallery/add-new" class="admin-main-btn"
              >Add new
            </nuxt-link>
          </div>
        </v-col>
      </v-row>  
      <v-row>
        <v-col>
          <div class="list-item" v-for="(item, index) in gallery" :key="index">
            <v-row>
              <v-col md="2">
                <nuxt-link :to="'/admin/gallery/' + item._id">
                  <img
                    :src="item.images[0].filename"
                    width="100"
                    alt=""
                  />
                </nuxt-link>
              </v-col>
              <v-col md="4">
                <div class="one-item-prev-info-block__title">
                  <nuxt-link :to="'/admin/gallery/' + item._id">{{
                    item.name
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

const { data } = await useFetch('/api/gallery')
const gallery = data._rawValue.items

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";


</style>
