import { defineStore } from 'pinia'
import { useToast } from "vue-toast-notification";
const toast = useToast();
import 'vue-toast-notification/dist/theme-bootstrap.css';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    loading: false
  }),
  actions: {
    async setLoading(state) {
      this.loading = state
    },
    async fetchData(route, method, sendData) {
      this.setLoading(true)
      const { data, status } = await useFetch(`/api/${route}`, {
        method: method,
        body: sendData
      });
      this.setLoading(false)
      if (process.client) {
        if (data._rawValue.success) {
          toast.success(data._rawValue.message, {
            timeout: 2000
          });
        } else {
          toast.error(data._rawValue.message, {
            timeout: 2000
          });
        }
      }
      
      if (status._rawValue === 'success') {
        return {
          success: data._rawValue.success,
          message: data._rawValue.message,
          data: data._rawValue.data
        }
        
      } else {
        return {
          success: false
        }
      }
    },
    async uploadFiles(formData) {
      const { data, pending } = await useFetch('/api/uploadgallery', { method: 'POST', body: formData })
      return data
    }
  },
  getters: {

  }
})