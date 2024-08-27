import { defineStore } from "pinia";
// import { useCommentStore } from "./CommentStore";

export const useMenuStore = defineStore("menuStore", {
    state: () => {
        return {
          items: []
        };
    },
    actions: {
        async getMenu(category) {
          const { data } = await useFetch('/api/menu')
          this.items = data._rawValue.items
        }
    },
    getters: {
        getItems: (state) => (category) => {
          return state.items.filter(item => item.category === category)
        }
    }

});