<template>
  <section class="gallery-index index-section" id="gallery" v-if="gallery">
      <v-row>
        <v-col class="d-flex justify-center">
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
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          
          <Swiper
            ref="mySwiper"
            :modules="[SwiperNavigation, SwiperEffectCreative, SwiperAutoplay]"
            :slides-per-view="slidesPerView"
            :space-between="1"
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
            <SwiperSlide v-for="slide in gallery" :key="slide">
              <img :src="slide.url" alt=""/>
            </SwiperSlide>
          </Swiper>
        </v-col>
      </v-row>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useGalleryStore } from "@/store/gallery";
const store = useGalleryStore();
//await store.fetchData()
const gallery = computed(() => store.getData('main'))

let slidesCount = ref(0);
let activeSlide = ref(0);

const onSwiper = (swiper) => {
  console.log(swiper.slides.length);
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
    console.log('window.innerWidth ', window.innerWidth)
    if (window.innerWidth < 700) {
      return 1
    } else {
      return 3
    }
  }
})

</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.gallery-index {

  background: #fff;
  position: relative;
  padding-bottom: 0!important;

  .swiper-slide {
    img {
      cursor: pointer;
      opacity: 1;
      @include base-transition(opacity);

      &:hover {
        //opacity: .75;
      }
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
    width: 25px;
    z-index: 99;

    &.swiper-next {
      right: 2rem;
    }

    &.swiper-prev {
      left: 2rem;
    }

    &.hide {
      opacity: 0.1;
      pointer-events: none;
    }

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>