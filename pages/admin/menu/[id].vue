<template>
  <section>
    <v-container>
      <v-row>
        <v-col>
          <div class="admin-title">
            <h1>{{ menu.section }}</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="admin-list">
            <div class="menu-content" v-for="(menuItem, index) in menu.content" :key="index">
              <div class="item-content">
                <div class="mb-3">
                  <v-text-field v-model="menuItem.title" variant="outlined" label="Title" density="compact"></v-text-field>
                </div>
                <div class="mb-3">
                    <v-text-field v-model="menuItem.ingredients" variant="outlined" label="Ingredients" density="compact"></v-text-field>
                </div>
                <div class="mb-3">
                  <v-text-field v-model="menuItem.price" variant="outlined" label="Price" density="compact"></v-text-field>
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
          <div class="admin-main-btn mr-2" @click="editEvent()">Save</div>
          <div class="admin-sec-btn" @click="deleteEvent()">Delete</div>

        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  //middleware: ["auth"]
  // or middleware: 'auth'
})
const route = useRoute()
const { data } = await useFetch(`/api/menu/${route.params.id}`)
const menu = ref(data._rawValue)
const uploaderRef = ref(null);

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

const editEvent = async () => {
  const { data } = await useFetch(`/api/menu`, {
    method: 'put',
    body: menu
  });
  menu.value = data._rawValue.data
}

const deleteEvent = async () => {
  const { data } = await useFetch(`/api/menu`, {
    method: 'delete',
    body: menu
  });

  if (data._rawValue) {
    router.push({ path: "/admin/menu" })
  }

  //
}



</script>



<style lang="scss" scoped>
@import "assets/scss/admin.scss";

.menu-content {
  padding: 2rem 0 1rem;
  border-bottom: 1px solid #ddd;
}
</style>
