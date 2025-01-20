// import draggable from 'vuedraggable'
import { VueDraggableNext } from 'vue-draggable-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('draggable', VueDraggableNext);
})