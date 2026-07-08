<template>
   <ReservationConfirmed></ReservationConfirmed>
</template>

<script setup>
import { onMounted, watch } from 'vue';

definePageMeta({
  layout: "reservation"
});

const consent = useCookie('user_cookies');

onMounted(() => {
  let conversionSent = false;

  watch(
    () => consent.value?.accept_cookies,
    (hasConsent) => {
      if (!hasConsent || conversionSent) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'reservation_confirmed',
        google_ads_send_to: 'AW-16850949987/dt6fCKuT8qAaEOOulOM-',
      });
      conversionSent = true;
    },
    { immediate: true },
  );
});

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
