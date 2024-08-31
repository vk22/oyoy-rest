<template>
  <v-app>
      <SendEmailResponse></SendEmailResponse>
      <transition>
        <FormModal></FormModal>
      </transition>
      <transition>
        <SwiperGalleryModal></SwiperGalleryModal>
      </transition>
      <transition>
        <NewsModal></NewsModal>
      </transition>
      <Header></Header>
      <TopBannerGallery></TopBannerGallery>
      <section class="page-content">
        <AboutUs></AboutUs>
        <ImageFullWidth :type="'video'" :path="'/video/video2.mp4'" :title="''"></ImageFullWidth>
        <MenuIndex :category="'food'"></MenuIndex>
        <ImageFullWidth :type="'image'" :path="'/img/full-w-banner-3.jpg'" :title="''"></ImageFullWidth>
        <MenuIndex :category="'drinks'"></MenuIndex>
        <SwiperGallery></SwiperGallery>
        <NewsIndex></NewsIndex>
      </section>
      <Footer></Footer>
  </v-app>
</template>

<script setup>
import { useMenuStore } from "@/store/menu";
const store = useMenuStore();
await store.getMenu()

</script>


<style lang="scss">
// @import "assets/scss/main.scss";

// .v-move,
// .v-enter-active,
// .v-leave-active {
//   transition: 0.3s ease;
// }

// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
//   transform: translateY(10px);
// }

// .body h1 {
//   font-family: sans-serif;
//   font-size: 8vw;
// }


// .nav {
//   width: 90%;
//   display: flex;
//   justify-content: center;

//   .nav-arr {
//     margin: 0 24px;

//     &.disable {
//       opacity: 0.5;
//       pointer-events: none;
//     }
//   }

//   &__left {
//     svg {
//       transform: rotate(-180deg);
//     }
//   }

//   svg {
//     width: 40px;

//     path {
//       fill: #fff;
//     }
//   }

//   .dot {
//     background: #fff;
//     width: 30px;
//     height: 5px;
//     margin: 5px;
//     opacity: .5;
//     transition: opacity .25s ease-in-out;
//     border-radius: 2px;
//     cursor: pointer;

//     &.active {
//       opacity: 1;
//     }
//   }
// }

// .forma {
//   background: #d4d8e937;
//   padding: 5rem 2.5rem;
//   display: flex;
//   justify-content: center;


//   &__container {
//     width: 100%;
//     max-width: 700px;
//   }
// }
</style>
