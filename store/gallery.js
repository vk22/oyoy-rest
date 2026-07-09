import { defineStore } from "pinia";
import { fetchApiItems } from "./api";
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
          this.items = await fetchApiItems('/api/gallery')
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
          const gallery = state.items.find(item => item.name === name);
          return gallery?.images ?? []
        },
        getModalState(state) {
            return state.modalState
        },
    }

});
