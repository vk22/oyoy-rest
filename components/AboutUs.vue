<template>
  <ClientOnly>
    <section class="about-index index-section" id="startContent" ref="intoContent" >
      <v-container fluid>
        <v-row>
          <!-- col -->
          <v-col cols="12" md="6" class="d-flex justify-center align-center">
            <div class="about-index__images">
              <div class="img-wrap img-1 slideUp fade-in loop">
                <NuxtImg src="/img/oyster2.png" />
              </div>

            </div>
          </v-col>
          <!-- col -->
          <v-col cols="12" md="6" class="d-flex align-center">
            <v-row>
              <v-col class="d-flex justify-center">
                <div class="about-index__block centered slideUp fade-in">
                  <div class="about-index__block__title">
                    <h2>{{ about.title}}</h2>
                  </div>
                  <div class="about-index__block__text">
                    <span v-html="about.text"></span>
                  </div>
                  <div class="about-index__block__btn">
                    <div class="btn" @click="getFormModalStateToggle">Reservations</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </ClientOnly>
</template>

<script setup>
/// reservation
import { useReservationStore } from "@/store/reservation";
const reservationStore = useReservationStore();
const getFormModalStateToggle = () => {
  reservationStore.setFormModalState();
};

//// about
import { useAboutStore } from "@/store/about";
const aboutStore = useAboutStore();
aboutStore.fetchData()
const about = aboutStore.getData;

</script>

<style lang="scss">
@import "assets/scss/main.scss";

.about-index {
  display: flex;
  background: #fff;


  @include for-phone-only {
    // margin-bottom: 15rem;
    // margin-top: 3rem;
  }

  @include for-tablet-portrait-up {
    // margin-bottom: 3rem;
  }

  &__block {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    padding: 0 2rem;

    &.centered {
      align-items: center;
    }

    &__title {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    &__text {
      text-align: center;
      margin-bottom: 2rem;
    }
  }

  &__images {
    display: flex;
    position: relative;

    @include for-phone-only {
      align-items: center;
      flex-direction: column;
    }

    @include for-tablet-portrait-up {
      align-items: center;
      flex-direction: column;
    }

    .img-wrap {
      position: relative;
    }

    .img-1 {
      @include for-phone-only {
        margin-top: 1rem;
        width: 45%;
        //display: none;
      }

      @include for-tablet-portrait-up {
        // margin-top: 10rem;
        width: 65%;
      }
    }

    .img-2 {

      @include for-phone-only {
        margin-top: 2rem;
        width: 350px;
        padding: 1rem;
      }

      @include for-tablet-portrait-up {
        margin-top: 8rem;
        width: 350px;
        padding: 1rem;
        margin-left: -5%;
      }
    }

    .img-3 {

      @include for-phone-only {
        margin-top: 0rem;
        width: 420px;
        padding: 1rem;
      }

      @include for-tablet-portrait-up {
        margin-top: 3rem;
        width: 500px;
        padding: 1rem;
        margin-right: -20%;
      }
    }

    .img-4 {
      @include for-phone-only {
        margin-top: 1rem;
        width: 85%;
      }

      @include for-tablet-portrait-up {
        // margin-top: 4rem;
        width: 80%;
      }
    }
  }

}
</style>
