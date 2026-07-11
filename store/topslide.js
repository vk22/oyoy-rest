import { defineStore } from 'pinia'
import { fetchApiData } from './api'

export const useTopslideStore = defineStore('topslide', {
  state: () => ({
    data: {}
  }),
  actions: {
    async fetchData() {
      this.data = await fetchApiData('/api/topslide', {}, {})
    },
    setData(data) {
      this.data = data ?? {}
    },
  },
  getters: {
    getData(state) {
      return state.data
    }
  }
})
