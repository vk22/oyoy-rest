import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ username, password }) {
      const { data, pending } = await useFetch('/api/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
      }); 
      this.loading = pending;
      if (data.value.success) {
        const token = useCookie('token'); 
        token.value = data?.value?.token; 
        this.authenticated = true; 
        return data.value
      } else {
        return data.value
      }
    },
    logOut() {
      const token = useCookie('token'); 
      this.authenticated = false; 
      token.value = null; 
    }
  },
  getters: {
    isAuthenticated() {
      return this.authenticated;
    },
  }
});
