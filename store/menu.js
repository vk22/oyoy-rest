import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", {
    state: () => {
        return {
          items: []
        };
    },
    actions: {
        async fetchData() {
          const { data } = await useFetch('/api/menu')
          if (data) {
            this.items = data.value.data
          }
        }
    },
    getters: {
        getItems: (state) => (category) => {
          return state.items.filter(item => item.category === category)
        }
    }

});