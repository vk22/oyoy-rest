<template>
  <header class="reservation-header">
    <NuxtLink class="reservation-header__logo" :to="{ path: '/' }" aria-label="OyOy Restaurant home">
      <img src="/img/logo-b.svg" alt="OyOy Restaurant" />
    </NuxtLink>
    <NuxtLink class="reservation-header__close" :to="{ path: '/' }" aria-label="Back to home">
      <span></span>
      <span></span>
    </NuxtLink>
  </header>
</template>

<style lang="scss" scoped>
.reservation-header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 84px;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.96);
  opacity: 0;
  animation: reservationFadeIn 0.7s ease forwards;

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: 150px;
      height: auto;
    }
  }

  &__close {
    position: absolute;
    right: .5rem;
    top: 1rem;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      position: absolute;
      width: 28px;
      height: 1.5px;
      background: #111;
      transform-origin: center;
    }

    span:first-child {
      transform: rotate(45deg);
    }

    span:last-child {
      transform: rotate(-45deg);
    }
  }

  @include for-phone-only {
    min-height: 72px;
    padding: 1rem 1.25rem;

    &__logo img {
      width: 140px;
    }

    &__close {
      right: 1.25rem;
    }
  }
}

@keyframes reservationFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
