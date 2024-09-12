import { defineStore } from "pinia";
// import { useCommentStore } from "./CommentStore";

export const useGalleryStore = defineStore("galleryStore", {
    state: () => {
        return {
          items: [],
          modalState: {
            isOpen: false,
            item: 0
          },
        };
    },
    actions: {
        async fetchData() {
          const { data } = await useFetch('/api/gallery')
          this.items = data._rawValue.items
        },
        setModalState(data) {
            this.modalState.isOpen = !this.modalState.isOpen
            this.modalState.item = data.item

        },
        resetModalState() {
            this.modalState.isOpen = false
            this.modalState.item = 0
        },
    },
    getters: {
        getData: (state) => (name) => {
          const gallery = state.items.find(item => item.name === name)
          const images = gallery.images.map((item, index) => {
            return {
              index: index,
              url: item.filename
            }
          })
          return images
        },
        getModalState(state) {
            return state.modalState
        },
    }

});