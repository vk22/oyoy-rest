import { defineStore } from 'pinia'


export const useNavigationStore = defineStore('nav', {
  state: () => ({
    mainMenulIsOpen: false,
    items: [],
  }),
  actions: {
    async fetchData() {
      const { data } = await useFetch('/api/nav')
      if (data) {
        this.items = data.value.data
      }
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