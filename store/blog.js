import { defineStore } from "pinia";
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
          const { data } = await useFetch('/api/blog', {
            method: 'GET',
            params: {
                published: 1
            }
          })
          this.items = data.value.data
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
              item.date = useNuxtApp().$formatDate(item.date)
              return item
            });
            return items
        },
        getModalState(state) {
            return state.modalState
        },
    }

});