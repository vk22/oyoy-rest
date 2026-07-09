import { defineStore } from "pinia";
import { fetchApiData } from "./api";
// import { useCommentStore } from "./CommentStore";

export const useBlogStore = defineStore("BlogStore", {
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
          this.items = await fetchApiData('/api/blog', {
            method: 'GET',
            params: {
                published: 1
            }
          }, [])
        },
        setModalState(data) {
            this.modalState.isOpen = !this.modalState.isOpen
            this.modalState.item = this.items[data.index]
        },
        resetModalState() {
            this.modalState.isOpen = false
            this.modalState.item = 0
        },
    },
    getters: {
        getItems(state) {
            const items = state.items.map((item) => {
              item.date = useNuxtApp().$formatDate(item.date);
              if (!item.mainImage) {
                item.mainImage = item.images?.[0];
                item.previewImage = item.images?.[0];
              }
              return item
            });
            return items
        },
        getModalState(state) {
            return state.modalState
        },
    }

});
