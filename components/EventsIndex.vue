<template>
  <section class="index-section events-index" id="events" v-if="events.length">
    <v-container fluid>
      <v-row>
        <v-col class="d-flex justify-center">
          <div class="section-title fadeIn-2">
            <h2>Events</h2>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col v-for="(oneevents, index) in events" :key="index" cols="12" sm="4">
          <div class="events-index__item" @click="modalToggle(index)" v-if="oneevents.file.type !== 'video/mp4'">
            <div class="img-wrap img-1">
              <NuxtImg :src="oneevents.file.url" class="img-cover" />
            </div>
            <div class="text-wrap">
              <div class="title">
                {{ oneevents.title }}
              </div>
              <div class="date">
                {{ oneevents.date }}
              </div>
            </div>
          </div>
          <div class="events-index__item video" @click="modalToggle(index)" v-else>
            <div class="video-wrap img-1">
              <video muted="" autoplay="" playsinline="" loop="">
                <source :src="oneevents.file.url" :type="oneevents.file.type">
              </video>
            </div>
            <div class="text-wrap">
              <div class="title">
                {{ oneevents.title }}
              </div>
              <div class="date">
                {{ oneevents.date }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useEventStore } from '@/store/events'
const store = useEventStore()
const events = computed(() => store.getItems)
const modalToggle = (index) => {
  store.setModalState({ index: index })
}

</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.events-index {
  display: flex;
  background: #f9fbff;
  padding-bottom: 3rem !important;

  @include for-phone-only {
    flex-direction: row;
  }

  @include for-tablet-portrait-up {
    flex-direction: column;
  }

  &__item {
    cursor: pointer;
    @include base-transition(all);

    &:hover {
      opacity: .75;
    }

    .img-wrap {
      position: relative;
      height: 70vh;
      margin-bottom: 1rem;
    }

    .video-wrap {
      position: relative;
      margin-bottom: 1rem;

      video {
        width: 100%;
      }
    }

    .text-wrap {
      //padding: 0 2rem;
    }

    .title {
      font-size: 1.25rem;
      text-transform: uppercase;
    }

    .date {
      color: #999;
    }


    // &.video {
    //   margin: 0 auto;

    //   @include for-phone-only {
    //     width: 100%;
    //   }

    //   @include for-tablet-portrait-up {
    //     width: 33%;
    //   }

    // }
  }

  .section-title {
    h2 {
      max-width: 700px;
      width: 100%;
      text-align: center;
      margin: auto;
      margin-bottom: 40px;
    }
  }





}
</style>
