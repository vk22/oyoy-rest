import { reactive } from "vue"

const confirmConfig = reactive({
  cancel: () => ({}),
  cancelLabel: "Cancel",
  confirm: () => ({}),
  confirmLabel: "Delete",
  isOpen: false,
  message: "Are you sure?"
})

export const useConfirm = () => {
  const isConfirmed = (message, options = {}) => {
    const confirmPromise = new Promise((resolve, reject) => {
      Object.assign(confirmConfig, {
        ...options,
        cancel: reject,
        confirm: resolve,
        isOpen: true,
        // message
      })
    })

    return confirmPromise.then(
      () => {
        confirmConfig.isOpen = false
        return true
      },
      () => {
        confirmConfig.isOpen = false
        return false
      }
    )
  }

  return {
    confirmConfig,
    isConfirmed
  }
}
