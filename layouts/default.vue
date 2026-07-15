<template>
  <!-- <Transition name="loading">
      <LoadingComponent></LoadingComponent>  
    </Transition> -->
  <CookiePolicy></CookiePolicy>
  <SendEmailResponse></SendEmailResponse>
  <Transition>
    <FormModal></FormModal>
  </Transition>
  <Transition>
    <SwiperGalleryModal></SwiperGalleryModal>
  </Transition>
  <Transition>
    <EventsModal></EventsModal>
  </Transition>
  <Header></Header>
  <slot />
</template>
<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useMainStore } from "@/store/index";
import { useCompanyStore } from "@/store/company";
import { useCustomGalleryStore } from "@/store/galleryCustom";
import { useEventStore } from "@/store/events";
import { useReservationStore } from "@/store/reservation";
import { useNavigationStore } from "@/store/nav";
import { useAboutStore } from "@/store/about";
import { useChefStore } from "@/store/chef";
import { useTopslideStore } from "@/store/topslide";
import { useMobileHomeStore } from "@/store/mobileHome";
import { useMenuStore } from "@/store/menu";
import { useGalleryStore } from "@/store/gallery";
import { useBlogStore } from "@/store/blog";
import { isMobileUserAgent } from "@/utils/device";

const customGalleryStore = useCustomGalleryStore();
const companyStore = useCompanyStore();
const eventsStore = useEventStore();
const reservationStore = useReservationStore();
const navStore = useNavigationStore();
const aboutStore = useAboutStore();
const chefStore = useChefStore();
const topslideStore = useTopslideStore();
const mobileHomeStore = useMobileHomeStore();
const menuStore = useMenuStore();
const galleryStore = useGalleryStore();
const blogStore = useBlogStore();
const route = useRoute();
const modalsIsOpen = computed(
  () => eventsStore.getModalState.isOpen || reservationStore.getFormModalState,
);
//// show after loading all data
const mainStore = useMainStore();
const dataReady = computed(() => mainStore.getDataReady);
//console.log('Layout dataReady ', dataReady.value)

const requestHeaders = useRequestHeaders(["user-agent"]);
const userAgent = process.server
  ? requestHeaders["user-agent"] || ""
  : navigator.userAgent;
const mobileUserAgent = isMobileUserAgent(userAgent);
const initialViewportMode = useState("initialViewportMode", () => ({
  isMobile: mobileUserAgent,
}));
initialViewportMode.value.isMobile = mobileUserAgent;
const isMobileHomeRequest =
  route.name === "index" && mobileUserAgent;
const publicHomeEndpoint = isMobileHomeRequest
  ? "/api/public/mobile-home"
  : "/api/public/home";

if (!dataReady.value) {
  const { data, error } = await useFetch(publicHomeEndpoint);

  if (error.value) {
    console.error("Default layout data fetch failed", error.value);
  }

  const homeData = data.value?.data ?? {};
  customGalleryStore.setData(homeData.topGallery);
  companyStore.setData(homeData.company);
  aboutStore.setData(homeData.about);
  chefStore.setData(homeData.chef);
  topslideStore.setData(homeData.topslide);
  mobileHomeStore.setData(homeData.mobileHome);
  navStore.setData(homeData.nav);
  galleryStore.setData(homeData.gallery);
  menuStore.setData(homeData.menu);
  menuStore.setDataPdf(homeData.menuPdf);
  eventsStore.setData(homeData.events);
  blogStore.setData(homeData.blog);
  reservationStore.setReservationAvailableState(homeData.reservationAvailable);

  mainStore.setDataReady();
}

/// handleScroll
const { $handleScroll } = useNuxtApp();
onMounted(() => {
  $handleScroll();
  document.addEventListener("scroll", $handleScroll);
});

useHead({
  bodyAttrs: {
    class: computed(() => {
      if (modalsIsOpen.value) return "popup-is-open";
      return "";
    }),
  },
});
</script>
<style lang="scss">
@use "~/assets/scss/main.scss";
</style>
