<template>
  <Transition name="fade">
    <div class="response-message" v-if="sendEmailResponse.mode" :class="sendEmailResponse.status">
      <img class="icon" src="/img/logo-b.svg" alt="">
      <h3>{{ sendEmailResponse.message.title }}</h3>
      <p>{{ sendEmailResponse.message.subtitle }}</p>
    </div>
  </Transition>
</template>

<script setup> 
import { useReservationStore }  from '@/store/reservation'
const store = useReservationStore()
let sendEmailResponse =  computed(() => store.getSendEmailResponse)
</script>

    
<style lang="scss">
@import "assets/scss/variables.scss";

.response-message {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 999999;
    color: #262626;
    text-transform: uppercase;
    transition: all 0.75s ease;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #ffffffea;
    // box-shadow: 0 1px 20px rgba(0, 0, 0, 0.15);

    .icon {
        position: absolute;
        bottom: 2rem;
        width: 200px;
        margin-bottom: 2rem;
        fill: transparent;
        z-index: 1;

        path {
          stroke: #f7f7f7;
        }
    }

    h3 {
      font-weight: 400;
      font-size: 3.5rem;
      line-height: 3.75rem;
      margin: 1rem;
      text-transform: none;
    }

    p {
        margin-top: 0.5rem;
        text-transform: none;
        font-size: 1rem;
        font-weight: 400;
        font-style: normal;
    }

    small {
        font-size: 1.25rem;
        text-transform: none;
    }

    &.error {
      h3, p {
        color: red;
      }
      
    }
}
</style>