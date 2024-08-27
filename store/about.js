import { defineStore } from 'pinia'

export const useAboutStore = defineStore('about', {
  state: () => ({
    data: {}
  }),
  actions: {
    async fetchData() {
      const { data } = await useFetch('/api/about')
      this.data = data._rawValue.data
    },
  },
  getters: {
    getData(state) {
      return state.data
    }
  }
})