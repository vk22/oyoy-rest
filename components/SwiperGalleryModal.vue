<template>
  <div class="gallery-modal modal-window" v-if="modalIsOpen">
    <div class="gallery-close" @click="modalToggle">
      <svg width="30px" height="30px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square"><g id="LandingPopup" transform="translate(-983.000000, -267.000000)" stroke="#111"><g id="Group-6"><g id="Group-5" transform="translate(420.000000, 243.000000)"><path d="M571.87315,32.8400752 L582.911677,32.8400752 L571.87315,32.8400752 L571.87315,21.6856907 L571.87315,32.8400752 Z M571.87315,32.8400752 L560.911677,32.8400752 L571.87315,32.8400752 L571.87315,44.0437203 L571.87315,32.8400752 Z" id="Combined-Shape" transform="translate(571.911677, 32.864706) rotate(-315.000000) translate(-571.911677, -32.864706) "></path></g></g></g></g></svg>
    </div>
    <div class="gallery-nav">
      <div
        class="gallery-nav__arrow swiper-prev"
      >
        <img src="/img/arrow-l.svg" alt="" />
      </div>
      <div
        class="gallery-nav__arrow swiper-next"
      >
        <img src="/img/arrow-r.svg" alt="" />
      </div>
    </div>
    <Swiper
      ref="mySwiper"
      :modules="[SwiperNavigation]"
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :initialSlide="galleryModalInitialSlide"
      :navigation="{
        enabled: true,
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      }"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="slide in gallery" :key="slide">
        <img :src="slide.url" alt="" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGalleryStore } from "@/store/gallery";
const store = useGalleryStore();
const gallery = store.getItems;
const modalIsOpen =  computed(() => store.getModalState.isOpen)
const galleryModalInitialSlide =  computed(() => store.getModalState.item)
const modalToggle = (slide) => {
    console.log('modalToggle ', slide)
    store.setModalState({item: slide.index})
}

let slidesCount = ref(0);
let activeSlide = ref(0);

const onSwiper = (swiper) => {
  console.log(swiper.slides.length);
  slidesCount.value = swiper.slides.length;
};

const onSlideChange = (swiper) => {
  console.log("slide change", swiper.activeIndex);
  activeSlide.value = swiper.realIndex;
};
</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #ffffffe7;

  .gallery-close {
    position: absolute;
    z-index: 99;
    cursor: pointer;
    @include for-phone-only {
      right: 1rem;
      top: 1rem;
    }

    @include for-tablet-portrait-up {
      right: 2rem;
      top: 2rem;
    }
  }

  .gallery-nav {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1rem;
    position: absolute;
    top: 45%;
    z-index: 99;

    &__arrow {
      cursor: pointer;
      margin: 0 1rem;

      &.hide {
        opacity: 0.1;
        pointer-events: none;
      }

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: auto;
      height: 75%;
      min-width: 0;
      max-width: none;
    }
  }
}
</style>