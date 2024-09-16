<template>
  
  <div class="main-menu" :class="{ show: mainNavIsOpened }">
    <div class="main-menu__sidebar">
      <div class="close-icon" @click="toggleMenu()">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div class="m-top">
        <ul>
          <li v-for="(item, index) in navigation" :key="index">
            <a
              class="menu-item"
              :key="item.href"
              :href="item.href"
              :data-href="item.href"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <div class="m-bottom">
        <div class="phone">
          <a :href="'tel:'+company.phone"
            ><v-icon icon="mdi-phone"></v-icon> <span>{{ company.phone }}</span></a
          >
        </div>
        <div class="btn" @click="getFormModalStateToggle">
          Reservations
        </div>
      </div>
    </div>
    <div class="main-menu__background" @click="toggleMenu()"></div>
  </div>

  <header class="main-header" :class="[{ small: isScrolled }, {'fadeIn-1': dataReady}]">
    <div class="header-l">
      <div class="icon-nav" @click="toggleMenu()">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
    <div class="header-c">
      <div class="logo">
        <img src="/img/logo.svg" class="white" alt="" />
        <img src="/img/logo-b.svg" class="black" alt="" />
      </div>
    </div>
    <div class="header-r">
      <div class="phone">
        <a :href="'tel:'+company.phone"
            ><v-icon icon="mdi-phone"></v-icon> <span>{{ company.phone }}</span></a
        >
      </div>
      <!-- <div class="btn-quote-icon" @click="getFormModalStateToggle">
        <img src="/img/book-now.svg" alt="" />
      </div> -->
      <div class="btn btn-header" @click="getFormModalStateToggle">Reservations</div>
    </div>
  </header>
</template>
  
<script setup>
import { onMounted, ref } from "vue";
import { useCompanyStore } from "@/store/company";
import { useMainStore }  from '@/store/index'
import { useReservationStore } from "@/store/reservation";
import { useNavigationStore } from "@/store/nav";

/// main store
const mainStore = useMainStore()
const dataReady = computed(() => mainStore.getDataReady)
/// reservation
const reservationStore = useReservationStore();
const getFormModalStateToggle = () => {
  reservationStore.setFormModalState();
};
/// menu
const navigationStore = useNavigationStore();
const navigation = computed(() => navigationStore.getItems);
const mainNavIsOpened = computed(() => navigationStore.getMainMenuState);
const toggleMenu = () => {
  navigationStore.toggleMenu();
};
//// getcompany
const companyStore = useCompanyStore();
const company = companyStore.getCompany
///
const headerHandler = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

////
let isScrolled = ref(null);
function manualSmoothScroll(event) {
  event.preventDefault();
  const id = event.target.dataset.href;
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  const yOffset = -50;
  const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
  setTimeout(() => {
    toggleMenu();
  }, 500);
}

onMounted(() => {
  document.addEventListener("scroll", headerHandler);
  document.querySelectorAll(".main-menu .menu-item").forEach((link, index) => {
    link.addEventListener("click", manualSmoothScroll);
  });
});


</script>

<style lang="scss" scoped>
@import "assets/scss/variables.scss";

.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 999;
  width: 100vw;
  padding: 2rem;
  opacity: 0;

  .header-l,
  .header-r {
    width: 40%;
    display: flex;
    align-items: flex-start;
    // padding-top: 2rem;
    color: #fff;
  }

  .icon-nav {
    position: relative;
    width: 35px;
    height: 20px;
    cursor: pointer;

    @include for-phone-only {
      margin-left: 0px;
      width: 35px;
    }

    @include for-tablet-portrait-up {
      margin-left: 0px;
      width: 45px;
    }

    @mixin for-tablet-landscape-up {
      margin-left: 0px;
      width: 45px;
    }

    .line {
      position: absolute;
      width: 100%;
      height: 1px;
      background: #fff;
      transition: all 0.4s ease-in-out;

      &:first-child {
        top: 0;
      }

      &:nth-child(2n) {
        top: 45%;
      }

      &:last-child {
        bottom: 0;
        width: 100%;
      }
    }

    &:hover {
      .line {
        &:last-child {
          width: 100%;
        }
      }
    }

    &.active {
      .line {
        &:first-child {
          transform: translateY(8px) rotate(-45deg);
        }

        &:nth-child(2n) {
          top: 42.5%;
          opacity: 0;
        }

        &:last-child {
          transform: translateY(-8px) rotate(45deg);
          width: 100%;
        }
      }
    }
  }

  .header-r {
    justify-content: flex-end;
    align-items: center;
    color: #fff;
  }

  .logo {
    img {
      width: 200px;

      @include for-phone-only {
        width: 200px;
      }
      @include for-tablet-portrait-up {
        width: 200px;
      }
      @include for-desktop-up {
        width: 200px;
      }
      @include for-700-height-only {
        width: 200px;
      }
    }
    .black {
      display: none;
    }
    .white {
      display: block;
    }
  }

  .btn-quote {
    background-color: #86775000;
    border: 1px solid #ffffff86;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 0.75rem 1.25rem;
    text-align: center;
    text-transform: uppercase;
    transition-duration: 0.25s;
    transition-property: all;
    transition-timing-function: ease-out;
    width: auto;
    margin-left: 2rem;
    @include for-phone-only {
      display: none;
    }
    @include for-tablet-portrait-up {
      display: flex;
    }

    @include for-desktop-up {
      display: flex;
    }

    &:hover {
      color: #fff;
      background: #6c4d19;
    }
  }

  .btn-quote-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #673ab7;
    border-radius: 100px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    transition-duration: 0.25s;
    transition-property: all;
    transition-timing-function: ease-out;

    @include for-phone-only {
      width: 40px;
      height: 40px;
      margin-left: 0rem;
    }
    @include for-tablet-portrait-up {
      width: 50px;
      height: 50px;
      margin-left: 2rem;
    }

    img {
      width: 55%;
    }
  }

  .phone {
    @include for-phone-only {
      display: none;
    }
    @include for-tablet-portrait-up {
      display: flex;
      span {
        display: none;
      }
    }

    @include for-desktop-up {
      display: flex;
      span {
        display: block;
      }
    }
  }

  ///
  &.small {
    background: #ffffff;
    padding: 1rem 2rem;
    @include base-transition(all);
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.15);

    .icon-nav {
      .line {
        background: #000;
      }
    }

    .header-l,
    .header-r {
      // padding-top: 2rem;
      color: #1c1c1c;

      .phone {
        a {
          color: #1c1c1c;
        }
      }
    }

    .logo {
      img {
        @include for-phone-only {
          width: 120px;
        }
        @include for-tablet-portrait-up {
          width: 150px;
        }

        @include for-desktop-up {
          width: 150px;
        }
        @include for-700-height-only {
          width: 140px;
        }
      }
      .black {
        display: block;
      }
      .white {
        display: none;
      }
    }
    .btn-header-icon {
      @include for-phone-only {
        width: 40px;
        height: 40px;
        margin-left: 0rem;
      }
      @include for-tablet-portrait-up {
        width: 40px;
        height: 40px;
        margin-left: 2rem;
      }

      img {
        width: 55%;
      }
    }
  }
}
.main-menu-wrap {
}

.phone {
  a {
    display: flex;
    text-decoration: none;
    font-size: 1.15rem;
    letter-spacing: 1px;
  }
  i {
    margin-right: 0.5rem;
  }
}

.main-menu {
  position: fixed;
  top: 0px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 0px);
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: opacity 0.75s ease, visibility 0.75s ease;
  display: flex;
  z-index: 99999;
  opacity: 0;
  visibility: hidden;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;

    li {
      @include base-transition(all);
      opacity: 0;
      transform: translateY(20px);
      text-align: left;

      @include for-phone-only {
        padding: .25rem 0;
      }

      @include for-tablet-portrait-up {
        padding: .25rem 0;
      }

      @include for-tablet-landscape-up {
        padding: .35rem 0;
      }

      a {
        font-family: $font-serif;
        // text-transform: uppercase;
        color: $text-color;
        letter-spacing: 1px;
        color: #262626;
        text-decoration: none;

        @include for-phone-only {
          font-size: 2.25rem;
          line-height: 2.5rem;
        }

        @include for-tablet-portrait-up {
          font-size: 2.25rem;
          line-height: 2.25rem;
        }

        @include for-tablet-landscape-up {
          font-size: 2.25rem;
          line-height: 2.25rem;
        }

        &:hover,
        &.nuxt-link-exact-active {
          color: #af8e72;
          text-decoration: none;
        }
      }
    }
  }

  .btn {
    margin-top: 2rem;
  }

  &__sidebar {
    position: absolute;
    top: 0px;
    left: 0;
    width: 300px;
    height: calc(100vh - 0px);
    background: #fff;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 999;
    transform: translateX(-300px);
    transition: transform 0.75s ease, visibility 0.75s ease;
    display: flex;
    flex-direction: column;
    z-index: 999;
    padding: 10rem 2rem;
    box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.15);
    // opacity: 0;
    // visibility: hidden;
    @include for-phone-only {
      width: 100%;
    }

    @include for-tablet-portrait-up {
      width: 300px;
    }

    @mixin for-tablet-landscape-up {
      width: 300px;
    }

    hr {
      width: 30%;
      border-color: #ffffff;
      margin: 3rem 0 0rem;
      opacity: 0;
      transform: translateY(20px);
      @include base-transition(all);
    }

    .m-bottom {
      margin-top: 2rem;
      opacity: 0;
      transform: translateY(20px);
      @include base-transition(all);
    }

    a {
      color: #262626;
    }
  }

  &__background {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .45);
    z-index: 99;
  }

  .close-icon {
    position: absolute;
    top: 3rem;
    left: 2rem;
    width: 35px;
    height: 18px;
    cursor: pointer;
    @include base-transition(all);

    @include for-phone-only {
      margin-left: 0px;
      width: 25px;
    }

    @include for-tablet-portrait-up {
      margin-left: 0px;
      width: 35px;
    }

    @mixin for-tablet-landscape-up {
      margin-left: 0px;
      width: 35px;
    }

    .line {
      position: absolute;
      width: 100%;
      height: 1px;
      background: #262626;
      transition: all 0.4s ease-in-out;

      &:first-child {
        top: 0;
        transform: translateY(8px) rotate(-45deg);
      }

      &:nth-child(2n) {
        top: 42.5%;
        opacity: 0;
      }

      &:last-child {
        bottom: 0;
        transform: translateY(-8px) rotate(45deg);
        width: 100%;
      }
    }

    &:hover {
      transform: rotate(-90deg);
      .line {
        &:last-child {
          width: 100%;
        }
      }
    }
  }

  &.show {
    opacity: 1;
    visibility: visible;

    .main-menu__sidebar {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);



      li {
        opacity: 1;
        transform: translateY(0px);
      }

      li:nth-child(1) {
        transition-delay: 0s;
      }
      li:nth-child(2) {
        transition-delay: 0.1s;
      }
      li:nth-child(3) {
        transition-delay: 0.2s;
      }
      li:nth-child(4) {
        transition-delay: 0.3s;
      }
      li:nth-child(5) {
        transition-delay: 0.4s;
      }
      li:nth-child(6) {
        transition-delay: 0.5s;
      }
      li:nth-child(7) {
        transition-delay: 0.6s;
      }
     
      hr {
        opacity: 1;
        transform: translateY(0px);
        transition-delay: 0.5s;
      }

      .m-bottom {
        opacity: 1;
        transform: translateY(0px);
        transition-delay: 0.6s;
      }
    }
  }
}

.quote-form-container {
  background: #fff;
  padding: 3rem 2rem;
  border-radius: 6px;
}
</style>