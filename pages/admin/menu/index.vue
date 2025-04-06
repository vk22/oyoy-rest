<template>
  <section v-if="menuItems">
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
          <h3>Food</h3>
          <draggable :list="menuItems.food" handle=".handle1" @change="dragged">
              <div class="list-item"  v-for="(element, index) in food" :key="element._id">
                <nuxt-link :to="'/admin/menu/' + element._id">
                  <v-row>
                    <v-col md="1">
                      <div class="handle1">
                          {{ index + 1 }}
                          <v-icon>mdi-drag</v-icon>  
                      </div>
                    </v-col>
                    <v-col md="6">
                      <div>
                        {{ element.section }}
                      </div>
                    </v-col>
                    <v-col md="5">
                      <div>
                        {{ element.category }}
                      </div>
                    </v-col>
                  </v-row>
                </nuxt-link>
              </div>
          </draggable>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>Drinks</h3>
          <draggable :list="menuItems.drinks" handle=".handle2" @change="dragged">
              <div class="list-item"  v-for="(element, index) in drinks" :key="element._id">
                <nuxt-link :to="'/admin/menu/' + element._id">
                  <v-row>
                    <v-col md="1">
                      <div class="handle2">
                          {{ index + 1 }}
                          <v-icon>mdi-drag</v-icon>  
                      </div>
                    </v-col>
                    <v-col md="6">
                      <div>
                        {{ element.section }}
                      </div>
                    </v-col>
                    <v-col md="5">
                      <div>
                        {{ element.category }}
                      </div>
                    </v-col>
                  </v-row>
                </nuxt-link>
              </div>
          </draggable>
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

const { data } = await useFetch('/api/menu')
console.log('data ', data)
const menu = data.value.data
const foodItems = menu.filter(item => item.category === 'food')
const food = ref(foodItems)
const drinksItems = menu.filter(item => item.category === 'drinks')
const drinks = ref(drinksItems)
const menuItems = ref(
  {
    food: foodItems,
    drinks: drinksItems
  }
)

async function dragged(event) {
  console.log(menuItems.value[event.moved.element.category])
  const menuNewSort = menuItems.value[event.moved.element.category]
  const { data } = await adminStore.fetchData('menu-sort', 'post', menuNewSort)
}

</script>



<style lang="scss" scoped>
  @import "assets/scss/admin.scss";
</style>
