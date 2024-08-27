<template>
  <section class="index-section events-index" id="events">
    <v-container fluid>
      <v-row>
        <v-col class="d-flex justify-center">
          <div class="section-title fadeIn-2">
            <h2>Events</h2>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(oneevents, index) in events" :key="index" cols="12" sm="4">
          <div class="events-index__item" @click="modalToggle(index)">
            <div class="img-wrap img-1">
              <img :src="'/uploads/'+oneevents.image" class="img-cover"/>
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
import { useEventStore }  from '@/store/events'
const store = useEventStore()
await store.getEvents()
const events = computed(() => store.getItems)
const modalToggle = (index) => {
    store.setModalState({index: index})
}

</script>

<style lang="scss">
@import "assets/scss/main.scss";

.events-index {
  display: flex;
  background: #f9fbff;
  padding-top: 4rem!important;

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
      height: 50vh;
      margin-bottom: 1rem;
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
