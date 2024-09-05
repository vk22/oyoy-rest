<template>
  <v-app>
    <SendEmailResponse></SendEmailResponse>
    <transition>
      <FormModal></FormModal>
    </transition>
    <transition>
      <SwiperGalleryModal></SwiperGalleryModal>
    </transition>
    <transition>
      <NewsModal></NewsModal>
    </transition>
    <Header></Header>
    <TopBannerGallery></TopBannerGallery>
    <section class="page-content">
      <AboutUs></AboutUs>
      <ImageFullWidth :type="'video'" :path="'/video/video2.mp4'" :title="''"></ImageFullWidth>
      <MenuIndex :category="'food'"></MenuIndex>
      <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-3.jpg'" :title="''"></ImageFullWidth>
      <MenuIndex :category="'drinks'"></MenuIndex>
      <SwiperGallery></SwiperGallery>
      <NewsIndex></NewsIndex>
    </section>
    <Footer></Footer>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
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

await customGalleryStore.fetchData('top');
await topslideStore.fetchData();
await aboutStore.fetchData();
await companyStore.fetchCompany();
await menuStore.fetchMenu();
await galleryStore.fetchData();
await eventsStore.fetchEvents();

const modalsIsOpen =  computed(() => eventsStore.getModalState.isOpen || reservationStore.getFormModalState)

/// 
const { $handleScroll } = useNuxtApp();
onMounted(() => {
  document.addEventListener("scroll", $handleScroll);
});

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
