import { defineStore } from 'pinia'

export const useCustomGalleryStore = defineStore('customGalleryStore', {
  state: () => ({
    activeIndex: 0,
    activeNext: 1,
    dir: 1,
    galleryIsWork: false,
    timerId: null,
    interval: null,
    gallery: []
  }),
  actions: {
    async fetchData(name) {
      const { data } = await useFetch('/api/gallery')
      const res = data._rawValue.items
      const images = res.find(item => item.name == name).images
      this.gallery = images
    },
    autoGalleryNext() {
        this.galleryIsWork = true
        if (this.activeIndex >= this.gallery.length - 1) {
            this.activeNext = 0;
        } else {
            this.activeNext += 1;
        }
        this.dir = 1;
        setTimeout(() => {
            this.activeIndex = (this.activeNext !== null) ? this.activeNext : this.activeIndex;
            // this.activeNext = null;
            this.galleryIsWork = false
        }, 1000);
    },
    goToSlide(index) {
      if (this.galleryIsWork) return;
      // if (this.interval) {
      //   commit('CLEAR_GALLERY_INTERVAL');
      // }

      this.activeNext = index
      if (this.activeIndex < index) {
        this.dir = -1;
      } 
      if (this.activeIndex > index) {
        this.dir = 1;
      } 
      
      setTimeout(() => {
          this.activeIndex = (this.activeNext !== null) ? this.activeNext : this.activeIndex;
          this.activeNext = null;
          this.galleryIsWork = false
      }, 1000);
    },
  },
  getters: {
    getGallery: (state) => {
      const gallery = state.gallery.map(item => {
        return {
          index: item.index,
          url: item.filename
        }
      }) 
      return gallery
    }
  }
})