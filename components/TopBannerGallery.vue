<template>
  <section class="top-banner" id="home">
    <div class="top-banner__container">
      <div class="center">
        <div class="headline" :class="{ 'fadeIn-2': showItem }">
          <div class="big">
            <h1>{{ topslideText.title }}</h1>
          </div>
          <div class="medium">{{ topslideText.subtitle }}</div>
        </div>
      </div>
      <div class="nav fadeIn-4">
        <span
          class="dot"
          v-for="(item, index) in gallery"
          :key="index"
          :class="{ active: index === activeIndex }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>

    <div
      class="gallery"
      @click="toggleGallery()"
      :class="{ show: showItem, active: galleryIsActive }"
      v-if="gallery.length && allImagesLoaded"
    >
      <div
        class="gallery__wrap"
        :class="{
          'slide-active': galleryItem.index === activeIndex,
          'slide-to-left': galleryItem.index === activeNext && isAnimating,
        }"
        v-for="galleryItem in gallery"
        :key="galleryItem.index"
      >
        <div
          class="gallery__item"
          :class="[
            'image-' + galleryItem.index,
            { loaded: loadedImages[galleryItem.file.url] },
          ]"
          :style="
            loadedImages[galleryItem.file.url]
              ? { backgroundImage: 'url(' + galleryItem.file.url + ')' }
              : {}
          "
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store/index'
import { useCustomGalleryStore } from '@/store/galleryCustom'
import { useTopslideStore } from '@/store/topslide'

const mainStore = useMainStore()
const galleryStore = useCustomGalleryStore()
const topslideStore = useTopslideStore()

const { activeIndex, activeNext, isAnimating, gallery, dir } = storeToRefs(galleryStore)
const dataReady = computed(() => mainStore.getDataReady)

const loadedImages = ref({})
const allImagesLoaded = ref(false)
const galleryIsActive = ref(false)
const intervalId = ref(null)

const showItem = ref(false)

const startGallery = (time = 6000) => {
  stopGallery()
  intervalId.value = setInterval(() => {
    galleryStore.next()
  }, time)
}

const stopGallery = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

const goToSlide = (index) => {
  stopGallery()
  galleryStore.goTo(index)
  startGallery()
}

const readyToGo = () => {
  galleryIsActive.value = true
  startGallery()
}

const handleVisibilityChange = () => {
  if (document.hidden) {
    stopGallery()
  } else if (allImagesLoaded.value) {
    startGallery()
  }
}

watch(dataReady, (value) => {
  showItem.value = value
}, { immediate: true })

await topslideStore.fetchData()
const topslideText = topslideStore.getData

onMounted(() => {
  if (!process.client || !gallery.value.length) return

  let loadedCount = 0

  gallery.value.forEach((item) => {
    const url = item.file.url
    const img = new Image()

    img.onload = () => {
      loadedImages.value[url] = true
      loadedCount++

      if (loadedCount === gallery.value.length) {
        allImagesLoaded.value = true
        readyToGo()
      }
    }

    img.onerror = () => {
      loadedCount++

      if (loadedCount === gallery.value.length) {
        allImagesLoaded.value = true
        readyToGo()
      }
    }

    img.src = url
  })

  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  stopGallery()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style lang="scss" scoped>
.TA_certificateOfExcellence {
  position: absolute;
  bottom: 4rem;

  @include for-phone-only {
    width: 100px;
  }

  @include for-tablet-portrait-up {
    width: 120px;
  }

  @include for-desktop-up {
    width: 150px;
  }
}

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

  @include for-phone-only {
    margin-bottom: 0rem;
  }

  @include for-tablet-portrait-up {
    margin-bottom: 0rem;
  }

  @include for-desktop-up {
    margin-bottom: 2rem;
  }

  &__container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
      padding: 2rem 1rem;

      @include for-phone-only {
      }

      @include for-tablet-portrait-up {
      }
    }

    .headline {
      opacity: 0;
      font-size: 1.15rem;
      letter-spacing: 0.25px;
      font-weight: 600;
      color: #fff;
      text-align: center;

      .big {
        padding: 1rem 0 1.35rem;
        margin-bottom: 1.5rem;
        text-shadow: 1px 1px 10px #0000003f;

        h1 {
          color: #fff;

          @include for-phone-only {
            font-size: 4rem;
            letter-spacing: 1px;
            line-height: 4.25rem;
            padding: 0.25rem 0 0.45rem;
          }

          @include for-tablet-portrait-up {
            font-size: 6.5rem;
            letter-spacing: 1px;
            line-height: 7.5rem;
            padding: 0.25rem 0 0.45rem;
          }

          @include for-desktop-up {
            font-size: 7.5rem;
            letter-spacing: 3px;
            line-height: 8rem;
            padding: 0.45rem 0 0.65rem;
          }

          @include for-big-desktop-up {
            font-size: 7.5rem;
            letter-spacing: 3px;
            line-height: 8rem;
            padding: 0.45rem 0 0.65rem;
          }
        }
      }

      .medium {
        font-weight: 500;
        text-shadow: 1px 1px 10px #0000003f;

        @include for-phone-only {
          font-size: 1.15rem;
          line-height: 1.5rem;
          letter-spacing: 0.25px;
        }

        @include for-tablet-portrait-up {
          font-size: 1.25rem;
          line-height: 1.5rem;
          letter-spacing: 0.25px;
        }

        @include for-desktop-up {
          font-size: 1.25rem;
          line-height: 1.5rem;
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

.gallery__item {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: #222325;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  opacity: 0;
  transform: scale(1.1);
  transition: opacity 0.3s ease;
}

.gallery__item.loaded {
  opacity: 0.75;
}

.gallery {
  background: #000000;
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
  opacity: 0;

  &.show {
    animation: fadeInStart 1s;
    animation-fill-mode: forwards;
  }

  &__wrap {
    opacity: 0;
    visibility: hidden;
    background: rgb(34, 35, 37);
    //display: none;
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
    opacity: 0.75;
    transform: scale(1.1);
  }
}

.slide-to-left {
  opacity: 1;
  visibility: visible;
  right: 0;
  //display: block;
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

.slide-active {
  opacity: 1;
  visibility: visible;
  display: block;
  z-index: 9;

  .gallery__item {
    animation: scaleIn 10s;
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
    animation-timing-function: ease-out;
  }

  100% {
    transform: scale(1.1);
    animation-timing-function: ease-out;
  }
}

@keyframes slideToLeft {
  0% {
    width: 0%;
    animation-timing-function: cubic-bezier(0.565, 0.43, 0.24, 0.92);
  }

  100% {
    width: 100%;
    animation-timing-function: cubic-bezier(0.565, 0.43, 0.24, 0.92);
  }
}

@keyframes slideToRight {
  0% {
    width: 0;
    animation-timing-function: cubic-bezier(0.565, 0.43, 0.24, 0.92);
  }

  100% {
    width: 100%;
    animation-timing-function: cubic-bezier(0.565, 0.43, 0.24, 0.92);
  }
}

@keyframes slideInR {
  0% {
    transform: translateX(-45px) scale(1.01);
    transform-style: preserve-3d;
    animation-timing-function: cubic-bezier(0.565, 0.43, 0.24, 0.92);
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
    animation-timing-function: cubic-bezier(0.565, 0.43, 0.24, 0.92);
  }

  100% {
    transform: translateX(0px) scale(1);
    transform-style: preserve-3d;
  }
}
</style>
