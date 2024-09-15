<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>Add new menu section</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="menu.section" variant="outlined" label="Title"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select v-model="menu.category" label="Category" :items="['food', 'drinks']" variant="outlined"></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="admin-main-btn" @click="addMenu()">Save</div>
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
import { useAdminStore } from "@/store/admin";
const adminStore = useAdminStore();
const router = useRouter()
const menu = ref({
  section: '',
  category: undefined,
  image: ''
})

const addMenu = async () => {
  const { data } = await adminStore.fetchData('menu', 'post', menu)
  if (data) {
    router.push({ path: "/admin/menu" })
  }
}

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";
</style>
