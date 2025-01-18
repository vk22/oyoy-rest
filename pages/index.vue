<template>
  <v-app>
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
    <TopBannerGallery></TopBannerGallery>
    <section class="page-content">
      <Transition>
        <AboutUs v-if="showItem"></AboutUs>
      </Transition>
      <ImageFullWidth :type="'video'" :path="'/video/video2.mp4'" :title="''"></ImageFullWidth>
      <MenuIndex :category="'food'"></MenuIndex>
      <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-3.jpg'" :title="''"></ImageFullWidth>
      <!-- <MenuIndex :category="'drinks'"></MenuIndex> -->
      <WineListLink></WineListLink> 
      <SwiperGallery></SwiperGallery>
      <NewsIndex></NewsIndex>
    </section>
    <Footer></Footer>
  </v-app>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useMainStore } from '@/store/index'
import { useMenuStore } from "@/store/menu";
import { useCompanyStore } from "@/store/company";
import { useCustomGalleryStore } from '@/store/galleryCustom';
import { useGalleryStore } from "@/store/gallery";
import { useEventStore } from '@/store/events';
import { useAboutStore } from "@/store/about";
import { useTopslideStore } from "@/store/topslide";
import { useReservationStore } from "@/store/reservation";

const customGalleryStore = useCustomGalleryStore();
const menuStore = useMenuStore();
const companyStore = useCompanyStore();
const galleryStore = useGalleryStore();
const eventsStore = useEventStore();
const aboutStore = useAboutStore();
const topslideStore = useTopslideStore();
const reservationStore = useReservationStore();
const modalsIsOpen =  computed(() => eventsStore.getModalState.isOpen || reservationStore.getFormModalState)

await customGalleryStore.fetchData('top');
await topslideStore.fetchData();
await aboutStore.fetchData();
await companyStore.fetchCompany();
await menuStore.fetchMenu();
await galleryStore.fetchData();
await eventsStore.fetchEvents();



//// show after loading all data
const mainStore = useMainStore()
const dataReady = computed(() => mainStore.getDataReady)
const showItem = ref(false);
watch(dataReady, (newValue) => {
  setTimeout(() => {
    showItem.value = true
  }, 1000);
})

/// 
const { $handleScroll } = useNuxtApp();
onMounted(() => {
  document.addEventListener("scroll", $handleScroll);
  
});

if (process.client) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}


useHead({
  bodyAttrs: {
    class: computed(() => {
      if (modalsIsOpen.value) return 'popup-is-open';
      return '';
    }),
  },
});

</script>

<style lang="scss"></style>
