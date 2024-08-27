import { defineStore } from 'pinia'

export const useTopslideStore = defineStore('topslide', {
  state: () => ({
    data: {}
  }),
  actions: {
    async fetchData() {
      const { data } = await useFetch('/api/topslide')
      this.data = data._rawValue.data
      // console.log('getEvents ', data._rawValue.events)
    },
  },
  getters: {
    getData(state) {
      return state.data
    }
  }
})