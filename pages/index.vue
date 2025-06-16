<template>
    <TopBannerGallery></TopBannerGallery>
    <section class="page-content" v-show="dataReady">
      <AboutUs ></AboutUs>
      <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-1.jpg'" :title="''"></ImageFullWidth>
      <Chef></Chef>
      <ImageFullWidth :type="'video'" :path="'/video/video2.mp4'" :title="''"></ImageFullWidth>
      <MenuIndex :category="'food'" v-if="menuIsPublished"></MenuIndex>
      <MenuIndexAsPDF :category="'food'"></MenuIndexAsPDF> 
      <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-4.jpg'" :title="''"></ImageFullWidth>
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
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [{ rel: 'icon', type: 'image/png', href: "/favicon.png" }]
})

useSeoMeta({
  title: 'OyOy Restaurant',
  ogTitle: 'OyOy Restaurant',
  description: 'We would like to present to you OyOy - a restaurant with spectacular 180 degree views on Spinola Bay.',
  ogDescription: 'We would like to present to you OyOy - a restaurant with spectacular 180 degree views on Spinola Bay.',
  ogUrl: 'https://oyoyrestaurant.com/',
  ogType: 'website',
  ogImage: 'https://oyoyrestaurant.com/img/full-w-banner-1.jpg',
  twitterCard: 'summary_large_image'
})

</script>

<style lang="scss"></style>
