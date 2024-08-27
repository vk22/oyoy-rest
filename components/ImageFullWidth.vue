<template>
  <section class="full-w-banner slideUp fade-in">
    <div class="full-w-banner__title">
      {{ title }}
    </div>
    <div class="full-w-banner__image" v-if="type === 'image'">
      <img :src="path" alt="" class="img-cover" />
    </div>
    <div class="full-w-banner__video" v-if="type === 'video'">
    <video muted="" autoplay="" playsinline="" loop="">
      <source :src="path" type="video/mp4">
    </video> 
  </div>
  </section>
</template>

<script setup>
defineProps(["type","path", "title"]);

</script>

<style lang="scss">
@import "assets/scss/main.scss";

.full-w-banner {
  display: flex;
  width: 100%;
  height: 75vh;
  position: relative;
  margin: 2rem 0;
  

  @include for-phone-only {
  }

  @include for-tablet-portrait-up {
  }

  @include for-desktop-up {
  }

  &__title {
      align-items: center;
      color: #fff;
      display: flex;
      font-size: 2.5rem;
      font-weight: 300;
      height: 100%;
      justify-content: center;
      left: 50%;
      letter-spacing: 2px;
      position: absolute;
      text-align: center;
      text-transform: uppercase;
      top: 0;
      transform: translateX(-50%);
      width: 650px;
      z-index: 1;
  }

  &__image {
    filter: brightness(.9);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
  }

  &__video {
    filter: brightness(.9);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
    video {
      height: 100%;
      left: 0;
      object-fit: cover;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
}
</style>
