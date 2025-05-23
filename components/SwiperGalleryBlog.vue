<template>
  <section class="gallery-blog" id="gallery" v-if="props.gallery">
          <div class="gallery-nav">
            <div
              class="gallery-nav__arrow swiper-prev">
              <img src="/img/arrow-l2.svg" alt="" />
            </div>
            <!-- <h2>Gallery</h2> -->
            <div
              class="gallery-nav__arrow swiper-next">
              <img src="/img/arrow-r2.svg" alt="" />
            </div>
          </div>
          
          <Swiper
            ref="mySwiper"
            :modules="[SwiperNavigation, SwiperEffectCreative, SwiperAutoplay]"
            :slides-per-view="slidesPerView"
            :centered-slides="true"
            :loop="true"
            :navigation="{
              enabled: true,
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }"
            @slideChange="onSlideChange"
            @swiper="onSwiper"
            :effect="'slide'"
            :autoplay="{
              delay: 8000,
              disableOnInteraction: true,
            }"
            :creative-effect="{
              prev: {
                shadow: false,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }"
          >
            <SwiperSlide v-for="slide in props.gallery" :key="slide">
              <img :src="slide.file.url" alt=""/>
            </SwiperSlide>
          </Swiper>
  </section>
</template>

<script setup>
import { ref } from "vue";
// import { useGalleryStore } from "@/store/gallery";
// const store = useGalleryStore();
// //await store.fetchData()
// const gallery = computed(() => store.getData('main'))

const props = defineProps({
	gallery: { type: Array }
})

let slidesCount = ref(0);
let activeSlide = ref(0);

const onSwiper = (swiper) => {
  slidesCount.value = swiper.slides.length;
};

const onSlideChange = (swiper) => {
  activeSlide.value = swiper.realIndex;
};

const galleryModalToggle = (slide) => {
    store.setModalState({item: slide.index})
}

onMounted(() => nextTick(() => {

}))

const slidesPerView = computed(() => {
  if (process.browser) {
    if (window.innerWidth < 700) {
      return 1
    } else {
      return 1
    }
  }
})

</script>

<style lang="scss" scoped>
@import "assets/scss/variables.scss";



.gallery-blog {

  background: #000000;
  position: relative;
  padding-bottom: 0!important;

  .swiper-slide {     
    display: flex;
    justify-content: center;
    width: 100%!important;
    overflow: hidden;

    @include for-phone-only {
      height: 250px;
    }

    @include for-tablet-portrait-up {
      height: 500px;
    }

    img {
      width: auto;
      overflow: hidden;
      max-width: none;
      cursor: pointer;
      opacity: 1;
      @include base-transition(opacity);

      &:hover {
        //opacity: .75;
      }
    }
  }

  .gallery-nav {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    &__arrow {
      cursor: pointer;
      margin: 0 1rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 42px;
      z-index: 99;
      background-color: rgba(255, 255, 255, 0.5);
      padding: 15px;
      display: flex;
      @include base-transition(background-color, 0.25s);

      &.swiper-next {
        @include for-phone-only {
          right: 0rem;
        }
        @include for-tablet-portrait-up {
          right: 1rem;
        }
      }

      &.swiper-prev {
        @include for-phone-only {
          left: 0rem;
        }
        @include for-tablet-portrait-up {
          left: 1rem;
        }
      }

      &.hide {
        opacity: 0.1;
        pointer-events: none;
      }

      &:hover {
        // opacity: 0.5;
        background-color: rgba(255, 255, 255, 0.75);
      }
    }
  }

}


</style>