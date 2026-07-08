<template>
  <HeaderReservation />
  <main class="reservation-layout">
    <slot />
  </main>
</template>

<style lang="scss">
@use "~/assets/scss/main.scss";

.reservation-layout {
  min-height: 100vh;
  background: #fff;
  opacity: 0;
  animation: reservationContentFadeIn 0.8s ease 0.15s forwards;
}

@keyframes reservationContentFadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
