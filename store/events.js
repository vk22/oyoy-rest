import { defineStore } from "pinia";
import { fetchApiData } from "./api";
// import { useCommentStore } from "./CommentStore";

export const useEventStore = defineStore("EventStore", {
  state: () => {
    return {
      items: [],
      modalState: {
        isOpen: false,
        item: 0,
      },
    };
  },
  actions: {
    async fetchData() {
      this.items = await fetchApiData("/api/events", {
        method: "GET",
        params: {
          published: 1,
        },
      }, []);
    },
    setModalState(data) {
      this.modalState.isOpen = !this.modalState.isOpen;
      this.modalState.item = this.items[data.index];
    },
    resetModalState() {
      this.modalState.isOpen = false;
      this.modalState.item = 0;
    },
  },
  getters: {
    getItems(state) {
      const items = state.items.map((item) => {
        item.date = useNuxtApp().$formatDate(item.date);
        item.eventDate = useNuxtApp().$formatDate(item.eventDate);
        return item;
      });
      return items;
    },
    getModalState(state) {
      return state.modalState;
    },
  },
});
