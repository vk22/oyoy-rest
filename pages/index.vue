<template>
    <MobileHome v-if="isMobile"></MobileHome>
    <div v-else class="desktop-home">
    <TopBannerGallery></TopBannerGallery>
    <section class="page-content" v-show="true">
      <Awards :title="'Awards'"></Awards>
      <AboutUs ></AboutUs>
      <ClientOnly>
        <ImageFullWidth :type="'video'" :path="'/video/video2.mp4'" :title="''"></ImageFullWidth>
      </ClientOnly>
      <Chef></Chef>
      <ClientOnly>
        <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-1.jpg'" :title="''"></ImageFullWidth>
      </ClientOnly>
      <ClientOnly>
        <MenuIndex :category="'food'" v-if="menuIsPublished"></MenuIndex>
      </ClientOnly>
      <ClientOnly>
        <MenuIndexAsPDF :category="'food'"></MenuIndexAsPDF> 
      </ClientOnly>
      <ClientOnly>
        <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-4.jpg'" :title="''"></ImageFullWidth>
      </ClientOnly>
      <ClientOnly>
        <MenuIndex :category="'drinks'" v-if="wineListIsActive"></MenuIndex>
      </ClientOnly>
      <ClientOnly>
        <MenuIndexAsPDF :category="'drinks'"></MenuIndexAsPDF> 
      </ClientOnly>
      <ClientOnly>
        <SwiperGallery></SwiperGallery>
      </ClientOnly>
      <EventsIndex></EventsIndex>
      <BlogIndex></BlogIndex>
    </section>
    
    </div>
    <Footer></Footer>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from 'vue';
import { useMainStore } from '@/store/index'
import { useNavigationStore } from "@/store/nav";
import { isMobileUserAgent } from "@/utils/device";

//// show after loading all data
const mainStore = useMainStore()
const dataReady = computed(() => mainStore.getDataReady)
const requestHeaders = process.server ? useRequestHeaders(["user-agent"]) : {};
const initialViewportMode = useState("initialViewportMode", () => ({
  isMobile: process.server
    ? isMobileUserAgent(requestHeaders["user-agent"] || "")
    : true,
}));
const isMobile = ref(initialViewportMode.value.isMobile)
let mediaQuery

const updateViewportMode = () => {
  isMobile.value = mediaQuery.matches
}

onMounted(() => {
  mediaQuery = window.matchMedia("(max-width: 599px)")
  updateViewportMode()
  mediaQuery.addEventListener("change", updateViewportMode)
})

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener("change", updateViewportMode)
})

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
  ogImage: 'https://oyoyrestaurant.com/img/oyoy-og.jpg',
  twitterCard: 'summary_large_image'
})

</script>

<style lang="scss">
.desktop-home {
  @include for-phone-only {
    display: none;
  }
}
</style>
