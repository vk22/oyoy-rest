<template>
  <header class="reservation-header">
    <NuxtLink
      class="reservation-header__logo"
      :to="{ path: '/' }"
      aria-label="OyOy Restaurant home"
    >
      <img src="/img/logo-b.svg" alt="OyOy Restaurant" />
    </NuxtLink>
    <NuxtLink
      class="reservation-header__close"
      :to="{ path: '/' }"
      aria-label="Back to home"
    >
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

  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.96);
  opacity: 0;
  animation: reservationFadeIn 0.7s ease forwards;

  @include for-phone-only {
    padding: 1.25rem 2rem;
  }

  @include for-tablet-portrait-up {
    padding: 2rem 2rem;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      display: block;
      width: 150px;
      height: auto;

      @include for-phone-only {
        width: 150px;
      }

      @include for-tablet-portrait-up {
        width: 175px;
      }
    }
  }

  &__close {
    position: absolute;

    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    @include for-phone-only {
      right: 0.5rem;
      top: 1rem;
    }

    @include for-tablet-portrait-up {
      right: 2rem;
      top: 2rem;
    }

    span {
      position: absolute;

      height: 1.5px;
      background: #111;
      transform-origin: center;

      @include for-phone-only {
        width: 28px;
      }

      @include for-tablet-portrait-up {
        width: 40px;
      }
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
