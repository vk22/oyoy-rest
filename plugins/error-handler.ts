export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:chunkError', () => {
      window.location.reload()
    })
  })