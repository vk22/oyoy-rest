<template></template>

<script setup lang="ts">
/**
 * Menu -> MenuSection -> MenuItem -> Offer JSON-LD for /menu, built from the
 * exact same menu data already rendered in the page's HTML. Offers are only
 * emitted for pricingType "fixed" + status "published" items — per spec, no
 * zero-price Offer for market/unknown/from pricing.
 */
const props = defineProps<{ menus: any[] }>();

const jsonLd = computed(() =>
  props.menus.map((menu) => ({
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": `https://oyoyrestaurant.com/full-menu#${menu.id}`,
    name: menu.title,
    inLanguage: menu.language,
    hasMenuSection: menu.categories.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      hasMenuItem: category.items
        .filter((item) => item.pricingType === "fixed" && item.status === "published")
        .map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: item.currency,
          },
        })),
    })),
  })),
);

useHead(() => ({
  script: [
    {
      key: "menu-json-ld",
      type: "application/ld+json",
      innerHTML: JSON.stringify(jsonLd.value).replace(/</g, "\\u003c"),
    },
  ],
}));
</script>
