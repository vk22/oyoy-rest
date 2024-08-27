import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    host: undefined,
    allDataReady: false
  }),
  actions: {
    setDataReady() {
      this.allDataReady = true
    },
  },
  getters: {
    getDataReady(state) {
      return state.allDataReady
    }
  }
})