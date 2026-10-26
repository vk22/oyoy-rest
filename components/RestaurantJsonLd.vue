<template></template>

<script setup lang="ts">
/**
 * Renders a single serverside schema.org/Restaurant JSON-LD block with a
 * stable @id, from the same /api/public/restaurant data used by REST/MCP.
 * Only includes fields backed by verified data (openingHoursSpecification
 * is omitted entirely when hours are unconfirmed, no aggregateRating).
 */
const { data } = await useFetch("/api/public/restaurant", { key: "restaurant-json-ld" });

const restaurant = computed(() => data.value?.data);

const jsonLd = computed(() => {
  const r = restaurant.value;
  if (!r) return null;

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": "https://oyoyrestaurant.com/#restaurant",
    name: r.name,
    url: r.canonicalUrl,
    image: "https://oyoyrestaurant.com/img/oyoy-og.jpg",
    hasMenu: "https://oyoyrestaurant.com/full-menu",
    acceptsReservations: "https://oyoyrestaurant.com/reservations",
  };

  if (r.description) node.description = r.description;
  if (r.telephone) node.telephone = r.telephone;
  if (r.email) node.email = r.email;
  if (r.address) {
    node.address = { "@type": "PostalAddress", streetAddress: r.address, addressCountry: "MT" };
  }
  if (r.geo) {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: r.geo.latitude,
      longitude: r.geo.longitude,
    };
  }
  if (r.cuisines?.length) node.servesCuisine = r.cuisines;
  if (r.socialLinks?.length) node.sameAs = r.socialLinks;

  return node;
});

useHead(() => ({
  script: jsonLd.value
    ? [
        {
          key: "restaurant-json-ld",
          type: "application/ld+json",
          innerHTML: JSON.stringify(jsonLd.value).replace(/</g, "\\u003c"),
        },
      ]
    : [],
}));
</script>
