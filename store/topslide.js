import { defineStore } from 'pinia'

export const useTopslideStore = defineStore('topslide', {
  state: () => ({
    data: {}
  }),
  actions: {
    async fetchData() {
      const { data } = await useFetch('/api/topslide')
      this.data = data._rawValue.data
    },
  },
  getters: {
    getData(state) {
      return state.data
    }
  }
})