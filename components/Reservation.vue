<template>
  <div class="reservation-page">
    <!-- <div class="close">
          <NuxtLink :to="{ path: '/'}">
              <svg width="30px" height="30px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square"><g id="LandingPopup" transform="translate(-983.000000, -267.000000)" stroke="#111"><g id="Group-6"><g id="Group-5" transform="translate(420.000000, 243.000000)"><path d="M571.87315,32.8400752 L582.911677,32.8400752 L571.87315,32.8400752 L571.87315,21.6856907 L571.87315,32.8400752 Z M571.87315,32.8400752 L560.911677,32.8400752 L571.87315,32.8400752 L571.87315,44.0437203 L571.87315,32.8400752 Z" id="Combined-Shape" transform="translate(571.911677, 32.864706) rotate(-315.000000) translate(-571.911677, -32.864706) "></path></g></g></g></g></svg>
          </NuxtLink>   
        </div> -->
    <div class="reservation-page__container">
      <h2>Reservations</h2>
      <!-- <Form></Form> -->
      <iframe
        src="https://app.tableo.com/r/g9BzkED"
        width="100%"
        height=" 100%"
        referrerpolicy="unsafe-url"
        id="tableo-iframe"
        v-if="reservationAvailable"
      ></iframe>
      <div class="reservation-empty" v-else>
        The reservation form is currently disabled
      </div>
    </div>
  </div>
</template>

<script setup>
import { useReservationStore } from "@/store/reservation";
const reservationStore = useReservationStore();
const reservationAvailable = reservationStore.reservationAvailable;

</script>

    
<style lang="scss" scoped>


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

.reservation-page {
  position: relative;
  background: #fff;

  @include for-phone-only {
    padding-top: 4rem;
  }

  @include for-tablet-portrait-up {
    padding-top: 10rem;
  }

  .close {
    position: absolute;
    z-index: 9999;
    cursor: pointer;

    @include for-phone-only {
      right: 5rem;
      top: 5rem;
    }

    @include for-tablet-portrait-up {
      right: 5rem;
      top: 5rem;
    }
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;

    @include for-phone-only {
      padding-top: 4rem;
      align-items: center;
      justify-content: center;
    }

    @include for-tablet-portrait-up {
      padding-top: 0rem;
      align-items: center;
      justify-content: center;
    }

    .reservation-empty {
      padding: 3rem;
    }
  }

  .form-title {
    font-family: $font-serif;
    font-size: 4rem;
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;

    @include for-phone-only {
      font-size: 3rem;
      text-align: left;
      margin-bottom: 0rem;
    }

    @include for-tablet-portrait-up {
      font-size: 4rem;
    }
  }
}

.overlay {
  // background: #0d6b80ba;
  // background: #002229ba;
  background-color: rgba($color: #000000, $alpha: 0.3);
  background-image: radial-gradient(at center, #3e3e3e26 20%, #2c3238b7 100%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

iframe {
  border: none;

  @include for-phone-only {
    min-height: 850px;
    height: 100%;
  }

  @include for-tablet-portrait-up {
    min-height: 850px;
    height: 850px;
  }
}
</style>