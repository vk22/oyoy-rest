import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", {
    state: () => {
        return {
          items: []
        };
    },
    actions: {
        async fetchMenu() {
          const { data } = await useFetch('/api/menu')
          if (data) {
            this.items = data._rawValue.items
          }
        }
    },
    getters: {
        getItems: (state) => (category) => {
          return state.items.filter(item => item.category === category)
        }
    }

});