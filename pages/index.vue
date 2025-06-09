<template>
    <TopBannerGallery></TopBannerGallery>
    <section class="page-content" v-show="dataReady">
      <AboutUs ></AboutUs>
      <ImageFullWidth :type="'video'" :path="'/video/video2.mp4'" :title="''"></ImageFullWidth>
      <MenuIndex :category="'food'" v-if="menuIsPublished"></MenuIndex>
      <MenuIndexAsPDF :category="'food'"></MenuIndexAsPDF> 
      <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-1.jpg'" :title="''"></ImageFullWidth>
      <MenuIndexAsPDF :category="'drinks'" v-if="wineListIsActive"></MenuIndexAsPDF> 
      <SwiperGallery></SwiperGallery>
      <EventsIndex></EventsIndex>
      <BlogIndex></BlogIndex>
    </section>
    <Footer></Footer>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue';
import { useMainStore } from '@/store/index'
import { useNavigationStore } from "@/store/nav";

//// show after loading all data
const mainStore = useMainStore()
const dataReady = computed(() => mainStore.getDataReady)

/// Check id sections is active
const navigationStore = useNavigationStore();
const navigation = computed(() => navigationStore.getItems);
const getIfSectionIsActive = (sectionText) => {
  const getNavData = navigation.value.find(el => el.text === sectionText)
  if (getNavData) {
    return true
  } else {
     return false
  }
}

const getIfMenuIsPublished = (sectionText) => {
  const getNavData = navigation.value.find(el => el.text === sectionText)
  if (getNavData) {
    return getNavData.isPublished
  } else {
     return false
  }
}

const menuIsPublished = getIfMenuIsPublished('Menu')
const menuIsActive = getIfSectionIsActive('Menu')
const wineListIsActive = getIfSectionIsActive('Wine List')


useHead({
  title: 'OyOy Restaurant',
  meta: [
    { name: 'description', content: 'OyOy Restaurant' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [{ rel: 'icon', type: 'image/png', href: "/favicon.png" }]
})

</script>

<style lang="scss"></style>
