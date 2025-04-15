<template>
      <Transition name="loading">
      <LoadingComponent></LoadingComponent>  
    </Transition>
    <CookiePolicy></CookiePolicy>  
    <SendEmailResponse></SendEmailResponse>
    <Transition>
      <FormModal></FormModal>
    </Transition>
    <Transition>
      <SwiperGalleryModal></SwiperGalleryModal>
    </Transition>
    <Transition>
      <NewsModal></NewsModal>
    </Transition>
    <Header></Header>
    <slot />
</template>
<script lang="ts" setup>
import { onMounted, watch, computed } from 'vue';
import { useMainStore } from '@/store/index'
import { useMenuStore } from "@/store/menu";
import { useCompanyStore } from "@/store/company";
import { useCustomGalleryStore } from '@/store/galleryCustom';
import { useGalleryStore } from "@/store/gallery";
import { useEventStore } from '@/store/events';
import { useAboutStore } from "@/store/about";
import { useTopslideStore } from "@/store/topslide";
import { useReservationStore } from "@/store/reservation";
import { useBlogStore } from "@/store/blog";
import { useNavigationStore } from "@/store/nav";

const customGalleryStore = useCustomGalleryStore();
const menuStore = useMenuStore();
const companyStore = useCompanyStore();
const galleryStore = useGalleryStore();
const eventsStore = useEventStore();
const aboutStore = useAboutStore();
const topslideStore = useTopslideStore();
const reservationStore = useReservationStore();
const blogStore = useBlogStore();
const navStore = useNavigationStore();
const modalsIsOpen =  computed(() => eventsStore.getModalState.isOpen || reservationStore.getFormModalState)
//// show after loading all data
const mainStore = useMainStore()
const dataReady = computed(() => mainStore.getDataReady)
console.log('Layout dataReady ', dataReady.value)
if (!dataReady.value) {
  await reservationStore.getReservationAvailableState()
  await customGalleryStore.fetchData('top');
  await topslideStore.fetchData();
  await aboutStore.fetchData();
  await companyStore.fetchData();
  await menuStore.fetchData();
  await galleryStore.fetchData();
  await eventsStore.fetchData();
  await blogStore.fetchData()
  await navStore.fetchData()
  /// set data ready
  setTimeout(() => {
    mainStore.setDataReady();    
  }, 1000);

}

/// handleScroll
const { $handleScroll } = useNuxtApp();
onMounted(() => {
  $handleScroll()
  document.addEventListener("scroll", $handleScroll);
});

useHead({
  bodyAttrs: {
    class: computed(() => {
      if (modalsIsOpen.value) return 'popup-is-open';
      return '';
    }),
  },
})

</script>
<style lang="scss">
@import "assets/scss/main.scss";
</style>
 