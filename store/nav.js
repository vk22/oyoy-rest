import { defineStore } from 'pinia'
import { fetchApiData } from './api'


export const useNavigationStore = defineStore('nav', {
  state: () => ({
    mainMenulIsOpen: false,
    items: [],
  }),
  actions: {
    async fetchData() {
      this.items = await fetchApiData('/api/nav', {}, [])
    },
    toggleMenu() {
      this.mainMenulIsOpen = !this.mainMenulIsOpen
    },
    closeMenu() {
      this.mainMenulIsOpen = false
    },
  },
  getters: {
    getMainMenuState(state) {
      return state.mainMenulIsOpen
    },
    getItems(state) {
      const itemsActive = state.items.filter(item => item.isActive);
      return itemsActive
    },
  }
})
