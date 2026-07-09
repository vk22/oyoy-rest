import { defineStore } from 'pinia'
import { fetchApiItems } from './api'

const TRANSITION_MS = 1000

export const useCustomGalleryStore = defineStore('customGalleryStore', {
  state: () => ({
    activeIndex: 0,
    activeNext: null,
    dir: 1,
    isAnimating: false,
    gallery: [],
  }),

  getters: {
    hasSlides: (state) => state.gallery.length > 0,
    lastIndex: (state) => Math.max(state.gallery.length - 1, 0),
  },

  actions: {
    async fetchData(name) {
      const items = await fetchApiItems('/api/gallery')
      const entry = items.find(item => item.name === name)

      this.gallery = entry?.images ?? []
      this.activeIndex = 0
      this.activeNext = null
      this.isAnimating = false
    },

    next() {
      if (this.isAnimating || !this.gallery.length) return

      const nextIndex =
        this.activeIndex >= this.gallery.length - 1
          ? 0
          : this.activeIndex + 1

      this.startTransition(nextIndex, 1)
    },

    goTo(index) {
      if (this.isAnimating || index === this.activeIndex || !this.gallery.length) return
      if (index < 0 || index >= this.gallery.length) return

      const dir = index > this.activeIndex ? -1 : 1
      this.startTransition(index, dir)
    },

    startTransition(nextIndex, dir) {
      this.activeNext = nextIndex
      this.dir = dir
      this.isAnimating = true

      setTimeout(() => {
        this.activeIndex = this.activeNext ?? this.activeIndex
        this.activeNext = null
        this.isAnimating = false
      }, TRANSITION_MS)
    },
  },
})
