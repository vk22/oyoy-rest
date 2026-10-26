<template>
  <div class="menu-page">
    <h1>Menu</h1>

    <p v-if="loadError" class="menu-page__notice">
      Menu data is temporarily unavailable. Please check back later or see our
      <a href="/reservations">reservations page</a>.
    </p>

    <template v-for="menu in menus" :key="menu.id">
      <section class="menu-page__menu" :aria-labelledby="`menu-${menu.id}`">
        <h2 :id="`menu-${menu.id}`">{{ menu.title }}</h2>
        <p v-if="menu.updatedAt" class="menu-page__updated">
          Updated {{ formatDate(menu.updatedAt) }}
        </p>

        <div
          v-for="category in menu.categories"
          :key="category.id"
          class="menu-page__category"
          :id="categorySlug(category.name)"
        >
          <h3>{{ category.name }}</h3>
          <ul class="menu-page__items">
            <li v-for="item in category.items" :key="item.id" class="menu-page__item">
              <div class="menu-page__item-main">
                <span class="menu-page__item-name">{{ item.name }}</span>
                <span
                  v-if="item.status !== 'published'"
                  class="menu-page__item-status"
                >
                  (currently unavailable)
                </span>
              </div>
              <p v-if="item.description" class="menu-page__item-description">
                {{ item.description }}
              </p>
              <div class="menu-page__item-price">{{ formatPrice(item) }}</div>
            </li>
          </ul>
        </div>
      </section>
    </template>

    <p v-if="!loadError && !menus.length" class="menu-page__notice">
      No published menu items are available right now.
    </p>

    <p class="menu-page__pdf-note">
      A PDF version of the menu may also be available on request at the restaurant.
    </p>

    <MenuJsonLd v-if="menus.length" :menus="menus" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const { data, error } = await useFetch("/api/public/menu/full");

const loadError = computed(() => Boolean(error.value));
const menus = computed(() => data.value?.data?.menus ?? []);

function formatPrice(item) {
  switch (item.pricingType) {
    case "fixed":
      return `€${Number(item.price).toFixed(2).replace(/\.00$/, "")}`;
    case "from":
      return `From €${Number(item.price).toFixed(2).replace(/\.00$/, "")}`;
    case "market":
      return "Market price";
    default:
      return "Price unavailable";
  }
}

function formatDate(iso) {
  return iso.slice(0, 10);
}

function categorySlug(name) {
  return (
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

useSeoMeta({
  title: "Menu | OyOy Restaurant",
  description:
    "Full menu and wine list for OyOy Restaurant, St Julian's, Malta — categories, dishes and prices in EUR.",
  ogTitle: "Menu | OyOy Restaurant",
  ogDescription:
    "Full menu and wine list for OyOy Restaurant, St Julian's, Malta — categories, dishes and prices in EUR.",
  ogUrl: "https://oyoyrestaurant.com/full-menu",
  ogType: "website",
});

useHead({
  link: [{ rel: "canonical", href: "https://oyoyrestaurant.com/full-menu" }],
});
</script>

<style lang="scss" scoped>
.menu-page {
  background: #fff;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;

  @include for-phone-only {
    padding-top: 7rem;
  }

  @include for-tablet-portrait-up {
    padding-top: 11rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__menu {
    margin-bottom: 3rem;
  }

  &__updated {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 1rem;
  }

  &__category {
    margin-bottom: 2rem;

    h3 {
      text-transform: uppercase;
      font-size: 1rem;
      color: #666;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.25rem;
    }
  }

  &__items {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px dotted #cacaca;
    padding: 0.75rem 0;
  }

  &__item-main {
    display: flex;
    gap: 0.5rem;
    align-items: baseline;
  }

  &__item-name {
    text-transform: uppercase;
    font-weight: 500;
  }

  &__item-status {
    font-size: 0.8rem;
    color: #b35f5f;
  }

  &__item-description {
    flex: 1 0 100%;
    font-style: italic;
    font-size: 0.85rem;
    color: #777;
    margin: 0.1rem 0 0;
  }

  &__item-price {
    white-space: nowrap;
  }

  &__notice,
  &__pdf-note {
    text-align: center;
    color: #666;
    margin: 2rem 0;
  }
}
</style>
