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
        async fetchEvents() {
          const { data } = await useFetch('/api/events')
          this.items = data._rawValue.events
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