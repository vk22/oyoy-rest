import { defineStore } from 'pinia'

export const useTopslideStore = defineStore('topslide', {
  state: () => ({
    data: {}
  }),
  actions: {
    async fetchData() {
      const { data } = await useFetch('/api/topslide')
      this.data = data.value.data
    },
  },
  getters: {
    getData(state) {
      return state.data
    }
  }
})