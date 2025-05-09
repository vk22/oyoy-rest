import { ref } from 'vue'

  const confirming = ref(false)
  
  const params = ref({
    title: 'Title',
    message: 'Description',
    label: 'Confirm',
    action: () => {},
  })

  async function confirm (title, message, label, action) {
    params.value = { title, message, label, action }
    confirming.value = true;
  }
  
  export default function useConfirm() {
    return { confirm, confirming, params }
  }