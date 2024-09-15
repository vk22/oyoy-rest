<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>{{ menu.section }}</h1>
          </div>
          <div>
            <p>Category: {{ menu.category }}</p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="admin-list">
            <div class="menu-content" v-for="(menuItem, index) in menu.content" :key="index">
              <div class="item-content">
                <div class="mb-3">
                  <v-text-field v-model="menuItem.title" variant="outlined" label="Title"
                    density="compact"></v-text-field>
                </div>
                <div class="mb-3">
                  <v-text-field v-model="menuItem.ingredients" variant="outlined" label="Ingredients"
                    density="compact"></v-text-field>
                </div>
                <div class="mb-3">
                  <v-text-field v-model="menuItem.price" variant="outlined" label="Price"
                    density="compact"></v-text-field>
                </div>
              </div>
              <div class="remove-item">
                <div class="admin-sec-btn btn-sm mr-2" @click="removeItem(index)">Remove</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="admin-main-btn mr-2" @click="addItem()">Add Item</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="admin-main-btn mr-2" @click="editMenu()">Save</div>
          <div class="admin-sec-btn" @click="deleteMenu()">Delete</div>

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
const route = useRoute()
const router = useRouter()
const { data } = await useFetch(`/api/menu/${route.params.id}`)
const menu = ref(data._rawValue)

function addItem(files) {
  menu.value.content.push({
    title: '',
    ingredients: '',
    price: ''
  })
}

function removeItem(index) {
  menu.value.content.splice(index, 1)
}

const editMenu = async () => {
  const { data } = await adminStore.fetchData('menu', 'put', menu)
  // if (data) {
  //   router.push({ path: "/admin/menu" })
  // }
}


const deleteMenu = async () => {
  const { success } = await adminStore.fetchData('menu', 'delete', menu); 
  if (success) {
    router.push({ path: "/admin/menu" });
  }
};

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.menu-content {
  padding: 2rem 0 1rem;
  border-bottom: 1px solid #ddd;
}
</style>
