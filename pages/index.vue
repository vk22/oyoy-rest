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
import { onMounted } from 'vue'
import { useMenuStore } from "@/store/menu";
import { useCompanyStore } from "@/store/company";
import { useCustomGalleryStore }  from '@/store/galleryCustom'
import { useGalleryStore } from "@/store/gallery";
import { useEventStore }  from '@/store/events'
import { useAboutStore } from "@/store/about";
import { useTopslideStore } from "@/store/topslide";

const customGalleryStore = useCustomGalleryStore()
const menuStore = useMenuStore();
const companyStore = useCompanyStore();
const galleryStore = useGalleryStore();
const eventsStore = useEventStore()
const aboutStore = useAboutStore();
const topslideStore = useTopslideStore();

await customGalleryStore.fetchData('top')
await topslideStore.fetchData()
await aboutStore.fetchData()
await companyStore.fetchCompany()
await menuStore.fetchMenu()
await galleryStore.fetchData()
await eventsStore.fetchEvents()

/// 
const { $handleScroll } = useNuxtApp();
onMounted(() => {
  document.addEventListener("scroll", $handleScroll);
});


</script>


<style lang="scss">
 @import "assets/scss/main.scss";
</style>
