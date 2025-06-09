import { defineStore } from 'pinia'

export const useChefStore = defineStore('chefStore', {
  state: () => ({
    data: {}
  }),
  actions: {
    async fetchData() {
      const { data } = await useFetch('/api/chef')
      this.data = data.value.data
    },
  },
  getters: {
    getData(state) {
      return state.data
    }
  }
})