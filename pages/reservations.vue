<template>
   <Reservation></Reservation>
</template>

<script setup>
definePageMeta({
  layout: "reservation"
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
