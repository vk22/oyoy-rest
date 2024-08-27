import { defineStore } from 'pinia'
import { useMenuStore } from "./nav";

export const useReservationStore = defineStore('reservation', {
  state: () => ({
    messages: {
      'success': {
        title: "Your reserve has been accepted",
        subtitle: "We look forward to seeing you in our restaurant"
      },
      'error': {
        title: "There was an error",
        subtitle: "We're already dealing with her"
      },
    },
    sendEmailResponse: {
      mode: false,
      status: undefined,
      message: ''
    },
    formModalIsOpen: false,
  }),
  actions: {
    async postData(values) {
      const { data } = await useFetch("/api/reservations", {
        method: "POST",
        body: values,
        headers: { "cache-control": "no-cache" }
      });
      let response = data._rawValue
      console.log('response ', response)
      this.afterSubmit({
        mode: true,
        status: response.status,
        message: response.message
      })
      return response
    },
    afterSubmit (data) {
      this.setFormModalState()
      this.setSendmailResponse(data);
      setTimeout(() => {
        this.setSendmailResponse({
          mode: false,
          message: ''
        });
      }, 4000);
    },
    setSendmailResponse(response) {
      this.sendEmailResponse = response;
    },
    setFormModalState(state) {
      this.formModalIsOpen = !this.formModalIsOpen
      if (this.formModalIsOpen) {
        const menuStore = useMenuStore();
        menuStore.closeMenu();
      }
    },
  },
  getters: {
    getSendEmailResponse(state) {
      return state.sendEmailResponse
    },
    getFormModalState(state) {
      return state.formModalIsOpen
    },
  }
})