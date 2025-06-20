<template>
   <ReservationConfirmed></ReservationConfirmed>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue';

onMounted(() => {
  const { gtag } = useGtag();
  gtag('event', 'conversion', {'send_to': 'AW-16850949987/dt6fCKuT8qAaEOOulOM-'});    
  //gtag('event', 'conversion', {'send_to': 'AW-17212492361/_FxNCKiOh9waEMmUx49A'}); /// my test
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
