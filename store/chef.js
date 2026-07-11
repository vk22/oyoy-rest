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
