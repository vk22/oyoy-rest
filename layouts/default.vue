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

const customGalleryStore = useCustomGalleryStore();
const companyStore = useCompanyStore();
const eventsStore = useEventStore();
const reservationStore = useReservationStore();
const navStore = useNavigationStore();
const modalsIsOpen = computed(
  () => eventsStore.getModalState.isOpen || reservationStore.getFormModalState,
);
//// show after loading all data
const mainStore = useMainStore();
const dataReady = computed(() => mainStore.getDataReady);
//console.log('Layout dataReady ', dataReady.value)


if (!dataReady.value) {
  const results = await Promise.allSettled([
    customGalleryStore.fetchData("top"),
    companyStore.fetchData(),
    navStore.fetchData(),
    reservationStore.getReservationAvailableState(),
  ]);

  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error("Default layout data fetch failed", result.reason);
    }
  });

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
