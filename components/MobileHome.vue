<template>
  <main class="mobile-home">
    <section class="mobile-home__hero">
      <div class="mobile-home__hero-media">
        <img
          v-if="heroImage"
          :src="heroImage"
          alt="OyOy Restaurant"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div
        class="mobile-home__hero-content is-animated"
        :class="{ 'is-animated_in': heroContentIsAnimatedIn }"
      >
        <!-- <img
          class="mobile-home__logo"
          src="/img/logo.svg"
          alt="OyOy Restaurant"
        /> -->
        <div class="mobile-home__text-animation mobile-home__text-animation--fade-in-up" style="--delay: 0.2s">
          <div class="out">
            <div class="in">
              <p class="mobile-home__intro">
                Mediterranean restaurant in Spinola Bay
              </p>
            </div>
          </div>
        </div>
        <div class="mobile-home__text-animation mobile-home__text-animation--fade-in-up" style="--delay: 0.45s">
          <div class="out">
            <div class="in">
              <div class="mobile-home__actions">
                <!-- <NuxtLink class="mobile-home__button mobile-home__button--primary" to="/reservations">
                  Book a Table
                </NuxtLink> -->
                <a class="mobile-home__button-sm" :href="primaryMenuLink">
                  View Menu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mobile-home__section mobile-home__quick-info">
      <div>
        <p class="mobile-home__eyebrow">Find us</p>
        <p class="mobile-home__address">{{ company.address || defaultAddress }}</p>
        
      </div>
      <div class="mobile-home__quick-actions">
        <a
          class="mobile-home__text-link"
          :href="mapLink"
          target="_blank"
          rel="noopener"
        >
        <v-icon icon="mdi-map-marker"></v-icon>
          Open in Google Maps
        </a>
        <a
          v-if="company.phone"
          class="mobile-home__text-link"
          :href="'tel:' + company.phone"
        >
        <v-icon icon="mdi-phone"></v-icon>
          {{ company.phone }}
        </a>
      </div>
    </section>

    <!-- <section class="mobile-home__section mobile-home__menu" id="menu">
      <p class="mobile-home__eyebrow">Menu</p>
      <h2>View our menu</h2>
      <div class="mobile-home__menu-actions">
        <a
          v-for="item in menuLinks"
          :key="item.href"
          class="mobile-home__menu-link"
          :href="item.href"
          target="_blank"
          rel="noopener"
        >
          <span>{{ item.label }}</span>
          <span>Open PDF</span>
        </a>
      </div>
    </section> -->

    <section class="mobile-home__section mobile-home__photos" id="gallery">
      <p class="mobile-home__eyebrow">Photos</p>
      <h2>Spinola Bay views, terrace, food and drinks</h2>
      <div class="mobile-home__photo-grid">
        <button
          v-for="(photo, index) in photos"
          :key="photo.file.url"
          class="mobile-home__photo-button"
          type="button"
          :aria-label="'Open gallery image ' + (index + 1)"
          @click="openGallery(index)"
        >
          <img
            :src="photo.file.url"
            :alt="photo.title || 'OyOy Restaurant photo'"
            loading="lazy"
            decoding="async"
          />
        </button>
      </div>
    </section>

    <div
      v-if="galleryModalIsOpen"
      class="mobile-home__gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Restaurant photo gallery"
      @click.self="closeGallery"
    >
      <button
        class="mobile-home__gallery-close"
        type="button"
        aria-label="Close gallery"
        @click="closeGallery"
      >
        <span></span>
        <span></span>
      </button>

      <button
        class="mobile-home__gallery-arrow mobile-home__gallery-arrow--prev mobile-gallery-prev"
        type="button"
        aria-label="Previous image"
      >
        <img src="/img/arrow-l.svg" alt="" />
      </button>
      <button
        class="mobile-home__gallery-arrow mobile-home__gallery-arrow--next mobile-gallery-next"
        type="button"
        aria-label="Next image"
      >
        <img src="/img/arrow-r.svg" alt="" />
      </button>

      <Swiper
        class="mobile-home__gallery-swiper"
        :modules="[SwiperNavigation, SwiperKeyboard]"
        :slides-per-view="1"
        :space-between="0"
        :loop="true"
        :initial-slide="galleryModalInitialSlide"
        :keyboard="{ enabled: true }"
        :navigation="{
          enabled: true,
          nextEl: '.mobile-gallery-next',
          prevEl: '.mobile-gallery-prev',
        }"
      >
        <SwiperSlide v-for="photo in galleryPhotos" :key="photo.file.url">
          <img
            :src="photo.file.url"
            :alt="photo.title || 'OyOy Restaurant photo'"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="mobile-home__sticky">
      <NuxtLink to="/reservations">Book a Table</NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useCompanyStore } from "@/store/company";
import { useGalleryStore } from "@/store/gallery";
import { useCustomGalleryStore } from "@/store/galleryCustom";
import { useMenuStore } from "@/store/menu";

const defaultMapLink =
  "https://www.google.com/maps/place/OyOy+Bar/@35.919872,14.492764,18z/data=!4m6!3m5!1s0x130e45c8ce17dbff:0xdaa73ebf3a91c9bd!8m2!3d35.9196351!4d14.4926563!16s%2Fg%2F11ryrfcfkx";
const defaultAddress = "94 Triq Spinola, Saint Julian's, Malta";

const companyStore = useCompanyStore();
const galleryStore = useGalleryStore();
const topGalleryStore = useCustomGalleryStore();
const menuStore = useMenuStore();

const company = computed(() => companyStore.getCompany);
const mapLink = computed(() => company.value.map || defaultMapLink);

const menuLinks = computed(() => {
  const links = menuStore.itemsPdf
    .filter((item) => item?.published !== false && item?.link?.file?.url)
    .map((item) => ({
      label:
        item.category === "drinks"
          ? "Drinks & Wine"
          : item.title || "Food Menu",
      href: item.link.file.url,
      category: item.category,
    }));

  if (links.length) return links;

  return [
    { label: "Food Menu", href: "/menu/main-menu.pdf", category: "food" },
    { label: "Wine List", href: "/menu/wine-list.pdf", category: "drinks" },
  ];
});

const primaryMenuLink = computed(() => {
  return (
    menuLinks.value.find((item) => item.category === "food")?.href ||
    menuLinks.value[0].href
  );
});

const galleryPhotos = computed(() => {
  const mainGallery = galleryStore.getData("main");
  const topGallery = topGalleryStore.gallery;
  return (mainGallery.length ? mainGallery : topGallery).filter(
    (item) => item?.file?.url,
  );
});

const photos = computed(() => {
  return galleryPhotos.value.slice(0, 6);
});

const heroImage = computed(() => {
  return photos.value[0]?.file?.url || "/img/oyoy-og.jpg";
});

const galleryModalIsOpen = ref(false);
const galleryModalInitialSlide = ref(0);
const heroContentIsAnimatedIn = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    heroContentIsAnimatedIn.value = true;
  });
});

const openGallery = (index) => {
  galleryModalInitialSlide.value = index;
  galleryModalIsOpen.value = true;
};

const closeGallery = () => {
  galleryModalIsOpen.value = false;
};

watch(galleryModalIsOpen, (isOpen) => {
  if (!process.client) return;

  document.body.style.overflow = isOpen ? "hidden" : "";
});

onBeforeUnmount(() => {
  if (!process.client) return;

  document.body.style.overflow = "";
});
</script>

<style lang="scss" scoped>
.mobile-home {
  display: none;

  @include for-phone-only {
    display: block;
    background: #fff;
    color: #151515;
    padding-bottom: 5.75rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  &__hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: #111;
  }

  &__hero-media {
    position: absolute;
    inset: 0;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35),
        rgba(0, 0, 0, 0.65)
      );
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }

  &__hero-content {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 7rem 1.25rem 7rem;
    color: #fff;
  }

  &__text-animation {
    --duration: 1.2s;
    --easing: cubic-bezier(0.165, 0.84, 0.44, 1);

    .out,
    .in {
      overflow: hidden;
      transition: transform var(--duration) var(--easing) var(--delay, 0s);
    }
  }

  .is-animated &__text-animation--rotate {
    .out,
    .in {
      transform-origin: bottom left;
    }

    .out {
      transform: translateY(-80px) rotate(-60deg);
    }

    .in {
      transform: translateY(40px) rotate(60deg);
    }
  }

  .is-animated_in &__text-animation--rotate {
    .out,
    .in {
      transform: none;
    }
  }

  .is-animated &__text-animation--fade-in-up {
    .out {
      transform: translateY(-100%);
    }

    .in {
      transform: translateY(100%) translateY(30px);
    }
  }

  .is-animated_in &__text-animation--fade-in-up {
    .out,
    .in {
      transform: none;
    }
  }

  &__logo {
    width: 180px;
    display: block;
    margin-bottom: 1rem;
  }

  &__intro {
    max-width: 100%;
    margin: 0 0 3.5rem;
    font-family: $font-serif;
    font-size: 3.75rem;
    line-height: 1;
    text-align: center;
  }

  &__actions,
  &__menu-actions,
  &__quick-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__button {
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__button--primary {
    background: #e9e9e9;
    color: #111 !important;
  }

  &__button--secondary {
    border: 1px solid rgba(255, 255, 255, 0.72);
    color: #fff;
  }

  &__button-sm {
    padding: 1rem 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid rgba(255, 255, 255, 0.72);
    background: #00000022;
    color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    &__text-animation {
      .out,
      .in {
        transition: none;
        transform: none !important;
      }
    }
  }

  &__section {
    padding: 2.25rem 1.25rem;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;

    h2 {
      margin: 0;
      font-family: $font-serif;
      font-size: 2.5rem;
      line-height: 1.05;
      font-weight: 500;
    }
  }

  &__eyebrow {
    margin: 0 0 1.25rem;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8d745e;
    text-align: center;
  }

  &__quick-info {
    display: grid;
    gap: 1rem;
  }

  &__address {
    padding: 0 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 0;
  }

  &__text-link {
    min-height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border: 1px solid #d8d8d8;
    border-radius: 4px;
    padding: 0 1rem;
    font-size: 1rem;
    font-weight: 500;
    gap: .5rem;
  }

  &__phone-link {
    min-height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 1rem 2rem;
    font-size: 1.15rem;
    font-weight: 400;
    gap: .5rem;
    margin-top: 1rem;
  }

  &__menu {
    background: #f7f4ef;
  }

  &__menu-link {
    min-height: 62px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-radius: 4px;
    padding: 0 1rem;
    background: #fff;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);

    // span:first-child {
    //   font-family: $font-serif;
    //   font-size: 1.45rem;
    //   line-height: 1;
    // }

    span {
      flex: 0 0 auto;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #8d745e;
    }
  }

  &__photos h2 {
    margin-bottom: 1rem;
  }

  &__photo-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
  }

  &__photo-button {
    width: 100%;
    border: 0;
    padding: 0;
    display: block;
    border-radius: 4px;
    background: #eee;
    overflow: hidden;

    img {
      width: 100%;
      aspect-ratio: 1 / 1;
      display: block;
      object-fit: cover;
    }
  }

  &__gallery-modal {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.95);
  }

  &__gallery-close {
    position: absolute;
    top: calc(1rem + env(safe-area-inset-top));
    right: 1rem;
    z-index: 3;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    cursor: pointer;

    span {
      position: absolute;
      left: 11px;
      top: 21px;
      width: 22px;
      height: 2px;
      background: #fff;

      &:first-child {
        transform: rotate(45deg);
      }

      &:last-child {
        transform: rotate(-45deg);
      }
    }
  }

  &__gallery-arrow {
    position: absolute;
    top: 50%;
    z-index: 3;
    width: 42px;
    height: 54px;
    border: 0;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.14);
    cursor: pointer;

    img {
      width: 100%;
      display: block;
      filter: invert(1);
    }

    &--prev {
      left: 0.75rem;
    }

    &--next {
      right: 0.75rem;
    }
  }

  &__gallery-swiper {
    width: 100%;
    height: 100%;

    :deep(.swiper-slide) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4.75rem 0rem;
    }

    :deep(.swiper-slide img) {
      width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  &__sticky {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
    //background: rgba(17, 17, 17, 0.88);
    backdrop-filter: blur(12px);

    a {
      width: 100%;
      // border: 1px solid #968855;
      min-height: 48px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 40px;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: #b3a369;
      color: #111 !important;
    }
  }
}
</style>
