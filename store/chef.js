import { defineStore } from 'pinia'
import { fetchApiData } from './api'

export const useChefStore = defineStore('chefStore', {
  state: () => ({
    data: {}
  }),
  actions: {
    async fetchData() {
      this.data = await fetchApiData('/api/chef', {}, {})
    },
  },
  getters: {
    getData(state) {
      return state.data
    }
  }
})
