import { defineStore } from "pinia";

export const useMenuStore = defineStore("menuStore", {
    state: () => {
        return {
          items: [],
          itemsPdf: []
        };
    },
    actions: {
        async fetchData() {
          const { data } = await useFetch('/api/menu')
          if (data) {
            this.items = data.value.data
          }
        },
        async fetchDataPdf() {
          const { data } = await useFetch('/api/menu-pdf')
          if (data) {
            this.itemsPdf = data.value.data
          }
        }
    },
    getters: {
        getItems: (state) => (category) => {
          return state.items.filter(item => item.category === category)
        },
        getItemsPdf: (state) => (category) => {
          return state.itemsPdf.filter(item => item.category === category)
        }
    }

});