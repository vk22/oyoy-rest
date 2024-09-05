<template>
  <section class="menu index-section" :id="props.category" v-if="menuData.length">
    <v-container>
      <v-row>
        <v-col class="d-flex justify-center">
          <div class="section-title fadeIn-2">
            <h2 v-if="props.category === 'food'">Our menu</h2>
            <h2 v-else>Wine List</h2>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12" class="d-flex justify-center">
          <div class="menu-sections-nav">
            <div
              class="item"
              v-for="(item, index) in menuData"
              :key="index"
              @click="activeMenu(index)"
              :class="[{ active: index === acviveMenuIndex }, props.category]"
            >
              <span class="text">{{ item.section }}</span
              ><span class="arrow" v-if="index !== menuData.length-1">|</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">

          <div class="menu-content">
            <div
              class="menu-content__item"
              v-for="(menuItem, index) in menuData[acviveMenuIndex].content.slice(0, getMiddleOfList(menuData[acviveMenuIndex].content))"
              :key="index"
            >
              <div class="item-content">
                <div class="item-content__title">{{ menuItem.title }}</div>
                <div class="item-content__ingredients">
                  {{ menuItem.ingredients }}
                </div>
              </div>
              <div class="item-price">
                <div><span v-if="menuItem.price !== 'Market price'">€</span>{{ menuItem.price }}</div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="menu-content">
            <div
              class="menu-content__item"
              v-for="(menuItem, index) in menuData[acviveMenuIndex].content.slice(getMiddleOfList(menuData[acviveMenuIndex].content), menuData[acviveMenuIndex].content.length)"
              :key="index"
            >
              <div class="item-content">
                <div class="item-content__title">{{ menuItem.title }}</div>
                <div class="item-content__ingredients">
                  {{ menuItem.ingredients }}
                </div>
              </div>
              <div class="item-price">
                <div><span v-if="menuItem.price !== 'Market price'">€</span>{{ menuItem.price }}</div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
const props = defineProps(["category"]);
import { ref } from "vue";
import { useMenuStore } from "@/store/menu";
const store = useMenuStore();
const menuData = computed(() => store.getItems(props.category))

let acviveMenuIndex = ref(0);
let loaded = ref(true)
function activeMenu(index) {
  loaded.value = !loaded.value;
  acviveMenuIndex.value = index;
  setTimeout(() => {
    loaded.value = !loaded.value;
  }, .25);
}
function getMiddleOfList(list) {
  return Math.floor(list.length/2)
}
</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.myfade-enter-active,
.myfade-leave-active {
  transition: opacity 0.75s ease;
}

.myfade-enter-from,
.myfade-leave-to {
  opacity: 0;
}

.menu {
  background: #fff;
  padding: 4rem;
  .menu-sections-nav {
    margin-bottom: 1rem;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;

    .item {
      text-transform: uppercase;
      cursor: pointer;
      font-size: 1rem;
      display: flex;
      font-size: .9rem;
      font-weight: 500;
      margin: 5px 0;

      .text {
        color: #666;
        padding: 0 .35rem;
        border-radius: 0px;
        // transform: skewX(-20deg);
      }

      .arrow {
        margin: 0 .5rem;
        color: #c1c1c1;
      }
      &.active {
        &.food {
          .text {
            color: #fff;
            background: #af8e72;
          }
        }
        &.drinks {
          .text {
            color: #fff;
            background: #b35f7c;
          }
        }

      }
    }
  }
  .menu-content {
    padding-right: .5rem;

    &__item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dotted #cacaca;
      padding: .75rem 0;
      font-size: 1rem;
      color: #111;

      .item-content {
        padding-right: 1rem;
        &__title {
          text-transform: uppercase;
          margin-bottom: .1rem;
          line-height: 1.5rem;
          font-weight: 500;
          //font-size: 1rem;
        }
        &__ingredients {
          font-style: italic;
          font-size: .85rem;
          color: #777;
        }
      }

      .item-price {

      }
    }
  }
  .menu-image {
    
    @include for-phone-only {    
      padding: 0rem 3rem;
      display: none;
    }
    @include for-tablet-portrait-up {
      padding: 1rem 3rem 0;
    }
    img {
    }
  }
}
</style>
