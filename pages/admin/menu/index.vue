<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Menu</h1>
            <nuxt-link to="/admin/menu/add-new" class="admin-main-btn">Add new
            </nuxt-link>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="list-item" v-for="(item, index) in menu" :key="index">
            <nuxt-link :to="'/admin/menu/' + item._id">
              <v-row>
                <v-col md="6">
                  <div>
                    {{ item.section }}
                  </div>
                </v-col>
                <v-col md="6">
                  <div>
                    {{ item.category }}
                  </div>
                </v-col>
              </v-row>
            </nuxt-link>
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
const menu = data._rawValue.items

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";
</style>
