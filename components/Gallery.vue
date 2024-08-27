<template>
  <div class="top-banner__container">
    <div class="center">
      <div class="headline fadeIn-2">
        <div class="big">Find the spirit of Malta</div>
        <div class="medium">A restaurant with spectacular 180 degree views on Spinola Bay</div>
      </div>

    </div>
    <!-- <div class="nav fadeIn-4">
        <span class="dot" v-for="(item, index) in gallery" :key="index" :class="{'active': index === activeIndex}" @click="goToSlide(index)"></span>
    </div> -->
    <div class="go-down fadeIn-4" @click="scrollToElement" :class="{'loop': needToLoop}">
      <img src="/img/arrow-down.svg" alt="" />
    </div>
  </div>
  <div class="gallery" @click="toggleGallery()" :class="{'active': galleryIsActive}">
    <div
      class="gallery__wrap"
      :class="{
        'active': galleryItem.index === activeIndex,
        'slide-to-left': galleryItem.index === activeNext && galleryIsActive,
      }"
      v-for="galleryItem in gallery"
      :key="galleryItem.index"
    >
      <div
        class="gallery__item"
        :class="'image-' + galleryItem.index"
        :style="{ backgroundImage: 'url(' + galleryItem.url + ')' }"
      ></div>
    </div>
  </div>
</template>

<script setup> 
useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: "/img/gallery0.jpg"
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/gallery1.jpg"
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/gallery2.jpg"
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/gallery3.jpg"
    },
  ]
})
import { ref } from 'vue'
import { useCustomGalleryStore }  from '@/store/galleryCustom'
const store = useCustomGalleryStore()
const gallery = store.getGallery
let activeIndex = computed(() => store.activeIndex)
let activeNext = computed(() => store.activeNext)
let interval;
const startGallery = () => {
  interval = setInterval(() => store.autoGalleryNext(), 5000);
}
const goToSlide = (index) => {
  if (interval) {
    clearTimeout(interval)
  }
  store.goToSlide(index)
}
let galleryIsActive = false

setTimeout(() => {
  needToLoop.value = true
}, 1000);

setTimeout(() => {
  galleryIsActive = true
  startGallery()
}, 2000);


////
const needToLoop = ref(null)
const scrollToElement = () => {
  const startContentPos = document.getElementById('startContent').offsetTop;
  window.scrollTo({ top: startContentPos-100, behavior: "smooth" });  
}



</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.top-banner {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 700px;
  height: 100vh;
  //min-height: 600px;
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;

  @include for-phone-only {
    margin-bottom: 0rem;
  }

  @include for-tablet-portrait-up {
    margin-bottom: 0rem;
  }

  @include for-desktop-up {
    margin-bottom: 5rem;
  }

  &__container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 99;
    padding: 3rem 0 3rem;

    @include for-phone-only {
      max-width: 100%;
    }

    @include for-tablet-portrait-up {
      max-width: 75%;
    }

    @include for-desktop-up {
      max-width: 75%;
    }

    @include for-big-desktop-up {
      max-width: 75%;
    }

    @include for-700-height-only {
      padding: 1.75rem 0 1.75rem;
    }

    @include for-800-height-only {
      padding: 2rem 0 2rem;
    }

    .center {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      padding: 0 1rem;

        
      @include for-phone-only {

      }

      @include for-tablet-portrait-up {

      }
    }

    .headline {
      font-size: 1.15rem;
      letter-spacing: 0.25px;
      font-weight: 400;
      color: #fff;
      text-align: center;
      // text-transform: uppercase;
      margin-bottom: 7vh;

      @include for-700-height-only {
        margin-bottom: 8vh;
      }

      @include for-800-height-only {
        margin-bottom: 10vh;
      }

      .big {
        font-family: $font-serif;
        font-weight: 200;
        letter-spacing: 0.25px;
        padding: 1rem 0 1.35rem;
        margin-bottom: 1.5rem;

        @include for-phone-only {
          font-size: 4rem;
          letter-spacing: 1px;
          line-height: 4.5rem;
          padding: 0.25rem 0 0.45rem;
        }

        @include for-tablet-portrait-up {
          font-size: 3em;
          letter-spacing: 3px;
          line-height: 1em;
          padding: 0.25rem 0 0.45rem;
        }

        @include for-desktop-up {
          font-size: 7em;
          letter-spacing: 3px;
          line-height: 1em;
          padding: 0.45rem 0 0.65rem;
        }

        @include for-700-height-only {
          font-size: 4rem;
          letter-spacing: 1px;
          line-height: 4.5rem;
          padding: 0.25rem 0 0.45rem;
        }

        // @include for-700-height-only {
        //   font-size: 2.5em;
        //   letter-spacing: 0px;
        //   line-height: .85em;
        //   padding: 0.25rem 0 0.45rem;
        // }
        // @include for-800-height-only {
        //   font-size: 3.5em;
        //   letter-spacing: 0px;
        //   line-height: .85em;
        //   padding: 0.45rem 0 0.65rem;
        // }
      }
      .medium {
        font-weight: 400;

        @include for-phone-only {
          font-size: 1.35rem;
          line-height: 1.75rem;
          letter-spacing: 0.25px;
        }

        @include for-tablet-portrait-up {
          font-size: 1.5rem;
          line-height: 1.75rem;
          letter-spacing: 0.25px;
        }

        @include for-desktop-up {
          font-size: 1.5rem;
          line-height: 1.75rem;
          letter-spacing: 0.25px;
        }


        // @include for-700-height-only {
        //   font-size: .95rem;
        //   line-height: 1.15rem;
        //   letter-spacing: 0.25px;
        // }

        // @include for-800-height-only {
        //   font-size: 1.15rem;
        //   line-height: 1.55rem;
        //   letter-spacing: 0.25px;
        // }
      }


      div {
      }
    }

    .nav {
      position: absolute;
      bottom: 3rem;
    }

    .go-down {
      cursor: pointer;
      position: absolute;
      bottom: 3rem;
  
      &.loop {
         animation: arDownLoop 2s steps(20) infinite;
      }

      img {
        width: 20px;
      }
    }
  }

}

.gallery {
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: hidden;
  opacity: 1;
  animation: fadeInStart 1s;
  animation-fill-mode: forwards;

  &__wrap {
    background: rgb(0, 17, 38);
    display: none;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__item {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    opacity: .75;
  }
}

.slide-to-left {
  right: 0;
  display: block;
  z-index: 89;
  overflow: hidden;
  animation: slideToLeft 1s;
  animation-fill-mode: forwards;
  .gallery__item {
    right: 0;
    animation: slideInL 1s;
    animation-fill-mode: forwards;
  }
}

.slide-to-right {
  left: 0;
  display: block;
  z-index: 89;
  overflow: hidden;
  animation: slideToRight 1s;
  animation-fill-mode: forwards;
  .gallery__item {
    left: 0;
    animation: slideInR 1s;
    animation-fill-mode: forwards;
  }
}

.activeNext {
  display: block;
  z-index: 9;
}

.active {
  display: block;
  z-index: 9;

  .gallery__item {
    animation: scaleIn 6s;
    animation-fill-mode: forwards;
  }
}

@keyframes arDownLoop {
  0% {
    opacity: 1;
    -ms-transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  50% {
      -ms-transform: translate(0, 20%);
      -webkit-transform: translate(0, 20%);
      transform: translate(0, 20%);
  }
  100% {
    opacity: 1;
    -ms-transform: translate(0, 0);
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(1);
    animation-timing-function: cubic-bezier(.565,.43,.24,.92);
  }
  100% {
    transform: scale(1.02);
    animation-timing-function: cubic-bezier(.565,.43,.24,.92);
  }
}

@keyframes slideToLeft {
  0% {
    width: 0%;
    animation-timing-function: cubic-bezier(.565,.43,.24,.92);
  }
  100% {
    width: 100%;
    animation-timing-function: cubic-bezier(.565,.43,.24,.92);
  }
}

@keyframes slideToRight {
  0% {
    width: 0;
    animation-timing-function: cubic-bezier(.565,.43,.24,.92);
  }
  100% {
    width: 100%;
    animation-timing-function: cubic-bezier(.565,.43,.24,.92);
  }
}

@keyframes slideInR {
  0% {
    transform: translateX(-45px) scale(1.01);
    transform-style: preserve-3d;
    animation-timing-function: cubic-bezier(.565,.43,.24,.92);
  }
  100% {
    transform: translateX(0px) scale(1);
    transform-style: preserve-3d;
  }
}

@keyframes slideInL {
  0% {
    transform: translateX(45px) scale(1.01);
    transform-style: preserve-3d;
    animation-timing-function: cubic-bezier(.565,.43,.24,.92);
  }
  100% {
    transform: translateX(0px) scale(1);
    transform-style: preserve-3d;
  }
}

.fadeIn-1 {
  opacity: 0;
  animation: fadeIn 1s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}

.fadeIn-2 {
  opacity: 0;
  animation: fadeIn 1s;
  animation-delay: 1.25s;
  animation-fill-mode: forwards;
}

.fadeIn-3 {
  opacity: 0;
  animation: fadeIn 1s;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
}

.fadeIn-4 {
  opacity: 0;
  animation: fadeIn 1s;
  animation-delay: 1.75s;
  animation-fill-mode: forwards;
}

</style>
