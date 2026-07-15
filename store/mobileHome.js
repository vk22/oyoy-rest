import { defineStore } from "pinia";
import { fetchApiData } from "./api";

export const useMobileHomeStore = defineStore("mobileHome", {
  state: () => ({
    data: {},
  }),
  actions: {
    async fetchData() {
      this.data = await fetchApiData("/api/mobile-home", {}, {});
    },
    setData(data) {
      this.data = data ?? {};
    },
  },
  getters: {
    getData(state) {
      return state.data;
    },
  },
});
