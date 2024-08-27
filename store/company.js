import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: {
      address: "94 Triq Spinola St, Saint Julian's, Malta",
      phone: '+356 7778 8007',
      email: 'info@oyoyrest.com',
      map: 'https://www.google.com/maps/place/OyOy+Bar/@35.919872,14.492764,18z/data=!4m6!3m5!1s0x130e45c8ce17dbff:0xdaa73ebf3a91c9bd!8m2!3d35.9196351!4d14.4926563!16s%2Fg%2F11ryrfcfkx?hl=ru-RU&entry=ttu',
      coords: '35.919872,14.492764'
    }
  }),
  actions: {
    async fetchCompany() {
      const { data } = await useFetch('/api/company')
      this.company = data._rawValue.data
      // console.log('getEvents ', data._rawValue.events)
    },
  },
  getters: {
    getCompany(state) {
      return state.company
    }
  }
})