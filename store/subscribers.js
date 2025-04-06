import { defineStore } from 'pinia'

export const useSubscribersStore = defineStore('subscribers', {
  state: () => ({
    available: true
  }),
  actions: {
    async postData(values) {
      const { data } = await useFetch("/api/subscribers", {
        method: "POST",
        body: values,
        headers: { "cache-control": "no-cache" }
      });
      let response = data.value
      return response
    },
  },
  getters: {

  }
})