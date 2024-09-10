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
      if (data.value) {
        const token = useCookie('token'); 
        token.value = data?.value?.token; 
        this.authenticated = true; 
      }
    },
    logOut() {
      const token = useCookie('token'); 
      this.authenticated = false; 
      token.value = null; 
      console.log('this.authenticated? ', this.authenticated)
    }
  },
  getters: {
    isAuthenticated() {
      return this.authenticated;
    },
  }
});
