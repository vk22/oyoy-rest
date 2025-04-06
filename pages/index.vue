<template>
    <TopBannerGallery></TopBannerGallery>
    <section class="page-content" v-if="dataReady">
      <AboutUs ></AboutUs>
      <ImageFullWidth :type="'video'" :path="'/video/video2.mp4'" :title="''"></ImageFullWidth>
      <MenuIndex :category="'food'"></MenuIndex>
      <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-3.jpg'" :title="''"></ImageFullWidth>
      <WineListLink></WineListLink> 
      <SwiperGallery></SwiperGallery>
      <NewsIndex></NewsIndex>
    </section>
    <Footer></Footer>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue';
import { useMainStore } from '@/store/index'

//// show after loading all data
const mainStore = useMainStore()
const dataReady = computed(() => mainStore.getDataReady)




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
