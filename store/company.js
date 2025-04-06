import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: {}
  }),
  actions: {
    async fetchData() {
      const { data } = await useFetch('/api/company')
      if (data) {
        this.company = data.value.data
      }
    },
  },
  getters: {
    getCompany(state) {
      return state.company
    }
  }
})