<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title mb-3">
            <v-text-field v-model="menu.section" variant="outlined" label="Menu Title Section"></v-text-field>
            <!-- <h1>{{ menu.section }}</h1> -->
          </div>
          <div>
            <p>Category: {{ menu.category }}</p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>

        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="admin-list">

            <draggable :list="menu.content" handle=".handle">

                  <div v-for="(element, index) in menu.content" :key="element._id" class="menu-item" :class="{ 'not-draggable': !enabled }">

                    <div class="d-flex justify-space-between">
                      <div class="handle">
                          {{ index + 1 }}
                          <v-icon>mdi-drag</v-icon>  
                      </div>
                    </div>
                    <div class="item-content">
                      <div class="mb-3">
                        <v-text-field v-model="element.title" variant="outlined" label="Title"
                          density="compact"></v-text-field>
                      </div>
                      <div class="mb-3">
                        <v-text-field v-model="element.ingredients" variant="outlined" label="Ingredients"
                          density="compact"></v-text-field>
                      </div>
                      <div class="mb-3">
                        <v-text-field v-model="element.price" variant="outlined" label="Price"
                          density="compact"></v-text-field>
                      </div>
                    </div>
                    <div class="d-flex justify-space-between mt-5">
                      <div class="remove-item">
                        <div class="admin-sec-btn btn-sm" @click="removeItem(index)">Remove</div>
                      </div>
                      
                  </div>

                  </div>  

              </draggable>
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
import { useConfirm } from '../../compositions/useConfirm';
const { isConfirmed } = useConfirm();
const adminStore = useAdminStore();
const route = useRoute()
const router = useRouter()
const { data } = await useFetch(`/api/menu/${route.params.id}`)
const menu = ref(data.value)

function addItem(files) {
  menu.value.content.push({
    title: '',
    ingredients: '',
    price: ''
  })
}

async function removeItem(index) {
   //// ask confirmation
  if (await isConfirmed()) {
    menu.value.content.splice(index, 1)   
  }
}

const editMenu = async () => {
  const { data } = await adminStore.fetchData('menu', 'put', menu)
  // if (data) {
  //   router.push({ path: "/admin/menu" })
  // }
}

const deleteMenu = async () => {
  //// ask confirmation
  if (await isConfirmed()) {
    const { success } = await adminStore.fetchData('menu', 'delete', menu); 
    if (success) {
      router.push({ path: "/admin/menu" });
    }
  }
};

</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.menu-item {
  padding: 2rem;
  border: 1px dashed #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  max-width: 900px;
}
</style>
