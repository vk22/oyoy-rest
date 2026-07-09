import { defineStore } from 'pinia'
import { fetchApiData } from './api'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: {}
  }),
  actions: {
    async fetchData() {
      this.company = await fetchApiData('/api/company', {}, {})
    },
  },
  getters: {
    getCompany(state) {
      return state.company
    }
  }
})
