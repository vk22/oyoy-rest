<template>
  <section class="awards slideUp fade-in" v-if="gallery?.length">
    <div class="awards__title"><h2>Awards</h2></div>
    <div class="awards__images">
      <img
        :src="image.file.url"
        alt=""
        v-for="(image, index) in gallery"
        :key="index"
      />
    </div>
  </section>
</template>

<script setup>
defineProps(["type", "path", "title"]);
const path = "/img/award.webp";
import { useGalleryStore } from "@/store/gallery";
const store = useGalleryStore();
const gallery = computed(() => store.getData("awards"));
</script>

<style lang="scss">
.awards {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin: 4rem 0 1rem;

  @include for-phone-only {
  }

  @include for-tablet-portrait-up {
  }

  @include for-desktop-up {
  }

  &__title {
    text-align: center;
  }

  &__images {
    display: flex;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    justify-content: space-between;
    img {
      // filter: grayscale(100%);
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
