import { defineStore } from 'pinia'
import { fetchApiData } from './api'

export const useAboutStore = defineStore('aboutStore', {
  state: () => ({
    data: {}
  }),
  actions: {
    async fetchData() {
      this.data = await fetchApiData('/api/about', {}, {})
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
