import { defineStore } from "pinia";
import { fetchApiData } from "./api";

export const useMenuStore = defineStore("menuStore", {
  state: () => {
    return {
      items: [],
      itemsPdf: [],
    };
  },
  actions: {
    async fetchData() {

      this.items = await fetchApiData("/api/menu", {
        method: "GET",
        params: {
          published: 1,
        },
      }, []);
    },
    async fetchDataPdf() {

      this.itemsPdf = await fetchApiData("/api/menu-pdf", {
        method: "GET",
        params: {
          published: 1,
        },
      }, []);
    },
  },
  getters: {
    getItems: (state) => (category) => {
      return state.items.filter((item) => item.category === category);
    },
    getItemsPdf: (state) => (category) => {
      return state.itemsPdf.filter((item) => item.category === category);
    },
  },
});
