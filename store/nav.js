import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('nav', {
  state: () => ({
    mainMenulIsOpen: false,
    items: [
      {
        text: "About",
        href: "startContent",
      },
      {
        text: "Menu",
        href: "food",
      },
      {
        text: "Wine List",
        href: "drinks",
      },
      {
        text: "Gallery",
        href: "gallery",
      },
      {
        text: "Events",
        href: "events",
      },
    ]
  }),
  actions: {
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
      return state.items
    },
  }
})