<template>
      <div class="form-modal modal-window" v-show="formModalOpened">  
        <div class="close" @click="formModalStateToggle()">
            <svg width="30px" height="30px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square"><g id="LandingPopup" transform="translate(-983.000000, -267.000000)" stroke="#111"><g id="Group-6"><g id="Group-5" transform="translate(420.000000, 243.000000)"><path d="M571.87315,32.8400752 L582.911677,32.8400752 L571.87315,32.8400752 L571.87315,21.6856907 L571.87315,32.8400752 Z M571.87315,32.8400752 L560.911677,32.8400752 L571.87315,32.8400752 L571.87315,44.0437203 L571.87315,32.8400752 Z" id="Combined-Shape" transform="translate(571.911677, 32.864706) rotate(-315.000000) translate(-571.911677, -32.864706) "></path></g></g></g></g></svg>
          </div>
        <div class="form-modal__container">
            <div class="form-title">
              Reservations
            </div>
            <Form></Form>
        </div>
      </div>
</template>

<script setup> 
import { useReservationStore } from "@/store/reservation";
const store = useReservationStore();
let formModalOpened =  computed(() => store.getFormModalState)
const formModalStateToggle = () => {
  store.setFormModalState()
}

</script>

    
<style lang="scss">
@import "assets/scss/variables.scss";

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

.form-modal {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;

  .close {
    position: absolute;
    z-index: 9999;
    cursor: pointer;

    @include for-phone-only {
      right: 1rem;
      top: 1rem;
    }

    @include for-tablet-portrait-up {
      right: 2.5rem;
      top: 2.5rem;
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
      padding-top: 5rem;
      align-items: flex-start;
      justify-content: flex-start;
    }

    @include for-tablet-portrait-up {
      padding-top: 0rem;
      align-items: center;
      justify-content: center;
    }

    .modal-center {
      position: relative;
      width: 100%;
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


</style>