import { defineStore } from 'pinia'


export const useNavigationStore = defineStore('nav', {
  state: () => ({
    mainMenulIsOpen: false,
    items: [],
    homeItems: [
      {
        text: "About",
        href: "#about",
      },
      {
        text: "Menu",
        href: "#food",
      },
      {
        text: "Wine List",
        href: "#drinks",
      },
      {
        text: "Gallery",
        href: "#gallery",
      },
      {
        text: "Events",
        href: "#events",
      }
    ],
    allItems: [
      {
        text: "Blog",
        href: "blog",
      },
    ],

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
      const itemsActive = state.items.map(item => {
        if (item.isActive) return item;
      });
      return itemsActive
    },
    getHomeItems(state) {
      return state.homeItems
    },
    getAllItems(state) {
      return state.allItems
    },
  }
})