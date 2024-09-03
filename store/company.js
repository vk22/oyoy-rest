import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: {}
  }),
  actions: {
    async fetchCompany() {
      const { data } = await useFetch('/api/company')
      if (data) {
        this.company = data._rawValue.data
      }
    },
  },
  getters: {
    getCompany(state) {
      return state.company
    }
  }
})