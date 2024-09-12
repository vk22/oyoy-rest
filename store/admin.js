import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    loading: false
  }),
  actions: {
    async setLoading(state) {
      this.loading = state
    }
  },
  getters: {

  }
})