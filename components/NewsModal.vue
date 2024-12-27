<template>
  <div class="news-modal modal-window" v-if="newsModalState.isOpen">  
    <div class="news-modal__container">
      <div class="close" @click="modalToggle()">
        <svg width="30px" height="30px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square"><g id="LandingPopup" transform="translate(-983.000000, -267.000000)" stroke="#111"><g id="Group-6"><g id="Group-5" transform="translate(420.000000, 243.000000)"><path d="M571.87315,32.8400752 L582.911677,32.8400752 L571.87315,32.8400752 L571.87315,21.6856907 L571.87315,32.8400752 Z M571.87315,32.8400752 L560.911677,32.8400752 L571.87315,32.8400752 L571.87315,44.0437203 L571.87315,32.8400752 Z" id="Combined-Shape" transform="translate(571.911677, 32.864706) rotate(-315.000000) translate(-571.911677, -32.864706) "></path></g></g></g></g></svg>
      </div>
      <div class="news-block" v-if="newsType !== 'video'">
        <div class="img-wrap img-1">
          <img :src="newsModalState.item.image" />
        </div>
        <div class="text-wrap">
          <div class="title">
            {{ newsModalState.item.title }}
          </div>
          <div class="content">
            <div v-html="newsModalState.item.text "></div>
          </div>
          <div class="date">
            {{ newsModalState.item.date }}
          </div>
        </div>
      </div>
      <div class="news-block" v-else>

        <div class="video-wrap img-1" >
          <video autoplay="" playsinline="" loop="" controls>
            <source src="/video/NY2025.mp4" type="video/mp4">
          </video>
        </div>

        <div class="text-wrap">
          <div class="title">
            New Year’s Dinner at OyOy Restaurant! 
          </div>
          <div class="content">
            <p>Come celebrate the start of a fresh year with delectable dishes, lively conversations, and great company. We look forward to sharing this special evening with you.</p>
            <p>Our chef has crafted a special menu to ring in the New Year with an array of gourmet dishes, complemented by refreshing beverages and warm hospitality. Whether you’re looking to relax, unwind, or dance the night away, we’ve created a welcoming atmosphere for all to enjoy! </p>
          </div>
          <div class="date">
            27 December 2024
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup> 
import { useEventStore }  from '@/store/events'
const store = useEventStore()
const newsModalState =  computed(() => store.getModalState)
const modalToggle = () => {
    store.resetModalState({newsItemIndex: 0})
}

const newsType = ref('video')
console.log('newsType ', newsType.value)

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

.news-modal {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  .close {
    position: absolute;
    z-index: 99;
    cursor: pointer;
    @include for-phone-only {
      right: 1rem;
      top: 1rem;
    }

    @include for-tablet-portrait-up {
      right: 2rem;
      top: 2rem;
    }
  }

  &__container {
    overflow: auto;
    max-height: 100%;
    padding: 1rem 0;
    @include for-phone-only {
      width: 95%;
      max-width: 1200px;
    }

    @include for-tablet-portrait-up {
      width: 75%;
      max-width: 1200px;
    }
  }

  .news-title {
    font-family: $font-serif;
    font-size: 4rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .news-block {
    display: flex;


    .video-wrap {
      width: 300px;
      flex-basis: 50%;
      padding: 1rem;

      @include for-phone-only {
        width: 100%;
        flex-basis: 100%;
        padding: 1rem;
      }

      @include for-tablet-portrait-up {
        width: 300px;
        flex-basis: 50%;
        padding: 1rem;
      }

      video {
        width: 100%;
      }

    } 

    .img-wrap {
      width: 300px;
      flex-basis: 50%;
      padding: 1rem;

      @include for-phone-only {
        width: 100%;
        flex-basis: 100%;
        padding: 1rem;
      }

      @include for-tablet-portrait-up {
        width: 300px;
        flex-basis: 50%;
        padding: 1rem;
      }

    }   
    .text-wrap {
      //padding: 0 2rem;
      @include for-phone-only {
        flex-basis: 100%;
        padding: 1rem;
      }

      @include for-tablet-portrait-up {
        flex-basis: 50%;
        padding: 1rem;
      }

    }
    .title {
      font-size: 2rem;
      line-height: 2.5rem;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
    .content {
      margin-bottom: 1rem;
    }
    .date {
      color: #999;
    }

    @include for-phone-only {
      flex-direction: column;
    }

    @include for-tablet-portrait-up {
      flex-direction: row;
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