<template>
  <div class="blog-top-slider">
    <div class="post-info">
      <div class="post-info-container">
        <div class="title-block">
          <div class="post-title">
            <h2>{{ postInfo.title }}</h2>
          </div>
          <div class="post-date">
            {{ postInfo.date }}
          </div>
          <NuxtLink
            v-if="postInfo.url"
            :to="{
              name: 'blog-id',
              params: { id: postInfo.url },
            }"
          >
            <div class="btn inverse">Read article</div>
          </NuxtLink>
        </div>
      <!-- <div class="swiper-pagination-titles"></div> -->
      <div class="swiper-pagination-lines"></div>
      </div>
    </div>

    <swiper
      ref="mySwiper"
      :spaceBetween="30"
      :effect="'fade'"
      :loop="true"
      :pagination="paginationLines"
      :modules="modules"
      class="mySwiper"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
    >
      <swiper-slide v-for="slide in slides" :key="slide">
        <img :src="slide.images[0].file.url" alt="" class="img-cover" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
const modules = [EffectFade, Autoplay, Pagination];

const props = defineProps({
  slides: { type: Array },
});

let slidesCount = ref(0);
let activeSlide = ref(0);

const paginationTitles = {
  el: ".swiper-pagination-titles",
  clickable: true,
  renderBullet: function (index, className) {
    return (
      '<span class="' +
      className +
      ' swiper-pagination-item">' +
      props.slides[index].title +
      "</span>"
    );
  },
};

const paginationLines = {
  el: ".swiper-pagination-lines",
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="' + className + ' line"></span>';
  },
};

const postInfo = ref({
  title: "",
  date: "",
  url: "",
});

const sliderToggleText = () => {
  const sliderInfo = document.getElementsByClassName("title-block")[0];
  sliderInfo.style.opacity = "0";
  sliderInfo.style.transform = "translateY(10px)";
  setTimeout(() => {
    postInfo.value = {
      title: props.slides[activeSlide.value].title,
      date: useNuxtApp().$formatDate(props.slides[activeSlide.value].date),
      url: props.slides[activeSlide.value].url,
    };

    sliderInfo.style.opacity = "1";
    sliderInfo.style.transform = "translateY(0px)";
  }, 500);
};

const onSwiper = (swiper) => {
  slidesCount.value = swiper.slides.length;
  sliderToggleText();
};

const onSlideChange = (swiper) => {

  if (swiper.realIndex !== activeSlide.value) {
    activeSlide.value = swiper.realIndex;
    sliderToggleText();
  }

};

const galleryModalToggle = (slide) => {
  store.setModalState({ item: slide.index });
};

onMounted(() => nextTick(() => {}));
</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.blog-top-slider {
  position: relative;
  height: 650px;
  background: #000000;
  margin-bottom: .5rem;

  .post-info {
    position: absolute;
    bottom: 5rem;
    width: 100%;
    z-index: 99;

    @include for-phone-only {
      bottom: 3rem;
    }

    @include for-tablet-portrait-up {
      bottom: 5rem;
    }

    .post-info-container {
      max-width: 1400px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 16px;

      @include for-phone-only {
        flex-direction: column;
        justify-content: flex-start;
      }

      @include for-tablet-portrait-up {
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .title-block {
      transition: all 0.2s;
      width: 45%;

      @include for-phone-only {
        width: 85%;
      }

      @include for-tablet-portrait-up {
        width: 75%;
      }

      @include for-tablet-landscape-up {
        width: 55%;
      }

      @include for-desktop-up {
        width: 45%;
      }

    }

    .post-title {
      position: relative;
      z-index: 99;
      margin-bottom: 1rem;
      display: flex;

      @include for-phone-only {
        width: 100%;
        justify-content: center;
      }

      @include for-tablet-portrait-up {
        justify-content: flex-start;
      }

      h2 {
        font-family: $font-sans !important;
        font-size: 2.75rem;
        line-height: 3.25rem;
        text-transform: uppercase;
        color: #fff;
        text-align: left;
        font-weight: 400;

        @include for-phone-only {
          font-size: 2rem;
          line-height: 2.5rem;
        }

        @include for-tablet-portrait-up {
          font-size: 2rem;
          line-height: 2.5rem;
        }

        @include for-tablet-landscape-up {
          font-size: 2.5rem;
          line-height: 2.75rem;
        }

        @include for-desktop-up {
          font-size: 2.75rem;
          line-height: 3.25rem;
        }

      }
    }

    .post-date {
      position: relative;
      z-index: 999;
      color: #e7e7e7;
      text-align: left;
      font-weight: 500;
      margin-bottom: 2rem;
    }

    .btn {
      width: 200px;
    }
  }

  .swiper {
    width: 100%;
    height: 100%;
    opacity: 0.65;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }

  .swiper-pagination-titles {
    display: flex;
    left: auto !important;
    width: 300px;
    flex-direction: column;
    align-items: flex-end;

    .swiper-pagination-item {
      font-size: 1.1rem;
      font-weight: 600;
      color: #fff;
      padding: 1rem;
      width: auto !important;
      height: auto !important;
      border-radius: 0 !important;
      background: transparent !important;
      opacity: 0.65 !important;

      &.swiper-pagination-bullet-active {
        background: transparent !important;
        opacity: 1 !important;
      }
    }
  }
  .swiper-pagination-lines {
    display: flex;
    left: auto !important;
    width: 300px;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    bottom: 12px;

      @include for-phone-only {
        justify-content: flex-start;
        margin-top: 3rem;
      }

      @include for-tablet-portrait-up {
        justify-content: flex-end;
      }

    .line {
      display: block;
      color: #fff;
      padding: 0;
      width: 40px !important;
      height: 4px !important;
      border-radius: 0 !important;
      background: #fff !important;
      opacity: 0.65 !important;

      &.swiper-pagination-bullet-active {
        background: #fff !important;
        opacity: 1 !important;
      }
    }
  }
}
</style>