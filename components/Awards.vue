<template>
  <section class="awards slideUp fade-in">
    <div class="awards__images">
      <img :src="path" alt="" />
      <img :src="path" alt="" />
      <img :src="path" alt="" />
    </div>
  </section>
</template>

<script setup>
defineProps(["type", "path", "title"]);
const path = "/img/award.webp";
</script>

<style lang="scss">
.awards {
  display: flex;
  width: 100%;
  position: relative;
  margin: 1rem 0;

  @include for-phone-only {
  }

  @include for-tablet-portrait-up {
  }

  @include for-desktop-up {
  }

  &__images {
    display: flex;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    justify-content: space-between;
    img {
      filter: grayscale(100%);
      @include for-phone-only {
        width: 30%;
      }

      @include for-tablet-portrait-up {
        width: 200px;
      }
    }
  }

  &__video {
    filter: brightness(0.9);
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
