import { defineStore } from "pinia";
// import { useCommentStore } from "./CommentStore";

export const useEventStore = defineStore("EventStore", {
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
          const { data } = await useFetch('/api/events')
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
              item.eventDate = useNuxtApp().$formatDate(item.eventDate)
              return item
            });
            return items
        },
        getModalState(state) {
            return state.modalState
        },
    }

});