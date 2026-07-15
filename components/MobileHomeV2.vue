<template>
  <main class="mobile-home-v2">
    <div class="mobile-home-v2__banner">
      <TopBannerGallery />
    </div>
<!-- 
    <section class="mobile-home-v2__primary">
        <a class="mobile-home-v2__button mobile-home-v2__button--secondary" :href="primaryMenuLink">
        {{ mobileText.menuButtonLabel }}
      </a>
    </section> -->

    <section class="mobile-home-v2__section mobile-home-v2__quick-info">
      <div>
        <p class="mobile-home-v2__eyebrow">{{ mobileText.findUsEyebrow }}</p>
        <h2>{{ company.address || defaultAddress }}</h2>
      </div>
      <div class="mobile-home-v2__quick-actions">
        <a class="mobile-home-v2__text-link" :href="mapLink" target="_blank" rel="noopener">
          {{ mobileText.mapLinkLabel }}
        </a>
        <a v-if="company.phone" class="mobile-home-v2__text-link" :href="'tel:' + company.phone">
          {{ company.phone }}
        </a>
      </div>
    </section>

    <section class="mobile-home-v2__section mobile-home-v2__menu" id="menu">
      <p class="mobile-home-v2__eyebrow">Menu</p>
      <h2>{{ mobileText.menuButtonLabel }}</h2>
      <div class="mobile-home-v2__menu-actions">
        <a
          v-for="item in menuLinks"
          :key="item.href"
          class="mobile-home-v2__menu-link"
          :href="item.href"
          target="_blank"
          rel="noopener"
        >
          <span>{{ item.label }}</span>
          <span>Open PDF</span>
        </a>
      </div>
    </section>

    <section class="mobile-home-v2__section mobile-home-v2__photos" id="gallery">
      <p class="mobile-home-v2__eyebrow">{{ mobileText.photosEyebrow }}</p>
      <h2>{{ mobileText.photosTitle }}</h2>
      <div class="mobile-home-v2__photo-grid">
        <img
          v-for="photo in photos"
          :key="photo.file.url"
          :src="photo.file.url"
          :alt="photo.title || 'OyOy Restaurant photo'"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>

    <div class="mobile-home-v2__sticky">
      <NuxtLink to="/reservations">{{ mobileText.bookingButtonLabel }}</NuxtLink>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useCompanyStore } from "@/store/company";
import { useGalleryStore } from "@/store/gallery";
import { useCustomGalleryStore } from "@/store/galleryCustom";
import { useMenuStore } from "@/store/menu";
import { useNavigationStore } from "@/store/nav";
import { useMobileHomeStore } from "@/store/mobileHome";

const defaultMapLink =
  "https://www.google.com/maps/place/OyOy+Bar/@35.919872,14.492764,18z/data=!4m6!3m5!1s0x130e45c8ce17dbff:0xdaa73ebf3a91c9bd!8m2!3d35.9196351!4d14.4926563!16s%2Fg%2F11ryrfcfkx";
const defaultAddress = "94 Triq Spinola, Saint Julian's, Malta";

const companyStore = useCompanyStore();
const galleryStore = useGalleryStore();
const topGalleryStore = useCustomGalleryStore();
const menuStore = useMenuStore();
const navigationStore = useNavigationStore();
const mobileHomeStore = useMobileHomeStore();

const company = computed(() => companyStore.getCompany);
const mapLink = computed(() => company.value.map || defaultMapLink);
const navigation = computed(() => navigationStore.getItems);
const mobileContent = computed(() => mobileHomeStore.getData ?? {});
const mobileText = computed(() => ({
  intro:
    mobileContent.value.intro || "Mediterranean restaurant in Spinola Bay",
  menuButtonLabel: mobileContent.value.menuButtonLabel || "View Menu",
  findUsEyebrow: mobileContent.value.findUsEyebrow || "Find us",
  mapLinkLabel: mobileContent.value.mapLinkLabel || "Open in Google Maps",
  photosEyebrow: mobileContent.value.photosEyebrow || "Photos",
  photosTitle:
    mobileContent.value.photosTitle ||
    "Spinola Bay views, terrace, food and drinks",
  bookingButtonLabel:
    mobileContent.value.bookingButtonLabel || "Book a Table",
}));

const navSectionIsAvailable = (sectionText) => {
  if (!navigation.value.length) return true;

  const section = navigation.value.find((item) => item.text === sectionText);
  return Boolean(section?.isPublished !== false);
};

const menuPdfIsAvailable = (item) => {
  if (item.category === "drinks") {
    return navSectionIsAvailable("Wine List");
  }

  return navSectionIsAvailable("Menu");
};

const menuLinks = computed(() => {
  const links = menuStore.itemsPdf
    .filter((item) => item?.published !== false && item?.link?.file?.url)
    .filter(menuPdfIsAvailable)
    .map((item) => ({
      label: item.category === "drinks" ? "Drinks & Wine" : item.title || "Food Menu",
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
  return menuLinks.value.find((item) => item.category === "food")?.href || menuLinks.value[0]?.href || "/menu/main-menu.pdf";
});

const photos = computed(() => {
  const mainGallery = galleryStore.getData("main");
  const topGallery = topGalleryStore.gallery;
  return (mainGallery.length ? mainGallery : topGallery).filter((item) => item?.file?.url).slice(0, 6);
});
</script>

<style lang="scss" scoped>
.mobile-home-v2 {
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

  &__banner {
    background: #111;

    :deep(.top-banner) {
      min-height: 100svh;
      height: 100svh;
      margin-bottom: 0;
      overflow: hidden;
    }

    :deep(.top-banner__container) {
      padding: 7rem 1.25rem 5.5rem;
      justify-content: flex-end;
    }

    :deep(.top-banner__container .center) {
      width: 100%;
      align-items: flex-start;
      margin-bottom: 1.25rem;
      padding: 0;
    }

    :deep(.headline) {
      width: 100%;
      text-align: center;
    }

    :deep(.headline .big) {
      margin-bottom: 1rem;
      padding: 0;
    }

    :deep(.headline .big h1) {
      padding: 0 1vw;
      margin: 0;
      font-family: $font-serif;
      font-size: 3.1rem;
      line-height: 0.96;
      font-weight: 500;
      letter-spacing: 0;
    }

    :deep(.headline .medium) {
      padding: 0 1vw;
      margin: 0;
      font-size: 1rem;
      line-height: 1.35;
      text-align: center;
    }

    :deep(.nav) {
      bottom: 2.2rem;
    }
  }

  &__primary {
    display: grid;
    gap: 0.75rem;
    padding: 1rem 1.25rem 1.25rem;
    background: #111;
  }

  &__button,
  &__sticky a {
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

  &__button--primary,
  &__sticky a {
    background: #b3a369;
    color: #111 !important;
  }

  &__button--secondary {
    border: 1px solid rgba(255, 255, 255, 0.72);
    color: #fff;
  }

  &__section {
    padding: 2.25rem 1.25rem;
    border-bottom: 1px solid #e8e8e8;

    h2 {
      margin: 0;
      font-family: $font-serif;
      font-size: 2rem;
      line-height: 1.05;
      font-weight: 500;
    }
  }

  &__eyebrow {
    margin: 0 0 0.7rem;
    font-size: 0.74rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8d745e;
  }

  &__quick-info {
    display: grid;
    gap: 1.25rem;
  }

  &__quick-actions,
  &__menu-actions {
    display: grid;
    gap: 0.75rem;
  }

  &__text-link {
    min-height: 46px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    padding: 0 1rem;
    font-size: 0.95rem;
    font-weight: 600;
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

    span:first-child {
      font-family: $font-serif;
      font-size: 1.45rem;
      line-height: 1;
    }

    span:last-child {
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

    img {
      width: 100%;
      aspect-ratio: 1 / 1;
      display: block;
      object-fit: cover;
      border-radius: 4px;
      background: #eee;
    }
  }

  &__sticky {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
    backdrop-filter: blur(12px);

    a {
      width: 100%;
    }
  }
}
</style>
