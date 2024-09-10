<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Menu</h1>
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
              <v-col md="12">
                <div class="one-promo-prev-info-block__title">
                  <nuxt-link :to="'/admin/menu/' + promo._id">{{
                    promo.section
                  }}</nuxt-link>
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

const { data } = await useFetch('/api/menu')
const events = data._rawValue.items

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";


</style>
