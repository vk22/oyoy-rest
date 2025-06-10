import { createGtm } from '@gtm-support/vue-gtm';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createGtm({
    id: 'GTM-N3484GLZ',
    defer: false,
    compatibility: false,
    enabled: true,
    debug: true, 
    loadScript: true,
    vueRouter: useRouter(),
    trackOnNextTick: false,

  }))
  });