<template>
  <div class="progress-wrap" v-if="show">
    <svg viewBox="0 0 389 107" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
      <path class="color-animate" fill-rule="evenodd" clip-rule="evenodd"
        d="M114.701 72.8001C111.801 79.9001 97.4006 96.4001 83.5005 92.5001C68.6005 88.4001 69.7005 66.9001 88.2005 64.5001C95.7005 63.6001 110.101 69.1001 114.701 72.8001ZM126.201 52.5001C125.201 55.9001 123.901 58.8001 121.401 61.2001C107.701 56.4001 96.8005 47.2001 78.7005 53.9001C44.8005 66.3001 62.3006 116.5 98.3006 104.1C113.601 98.8001 119.901 86.4001 127.101 78.5001C138.801 82.7001 147.201 87.5001 161.401 88.2001C174.101 88.8001 187.201 83.7001 194.101 76.9001L181.701 70.8001C166.201 78.0001 147.501 75.7001 133.701 67.1001L168.101 3.80008L154.001 3.6001L133.101 41.6001L98.5005 12.7001L87.1006 3.70007L69.3006 3.6001C70.9006 6.5001 123.901 51.3001 126.201 52.5001Z"
        fill="black" />
      <path class="color-animate" fill-rule="evenodd" clip-rule="evenodd"
        d="M309.4 73.3C306.5 80.4 292.101 96.9 278.201 93C263.301 88.9 264.4 67.4 282.9 65C290.4 64.1 304.8 69.6 309.4 73.3ZM320.9 53.1C319.9 56.5 318.601 59.4 316.101 61.8C302.401 57 291.5 47.8 273.4 54.5C239.5 66.9 257.001 117.1 293.001 104.7C308.301 99.3999 314.6 87 321.8 79.1C333.5 83.3 341.901 88.1 356.101 88.8C368.801 89.4 381.9 84.3 388.8 77.5L376.4 71.4C360.9 78.6 342.201 76.2999 328.4 67.7L362.8 4.39996L348.701 4.19995L327.8 42.2L293.001 13.3L281.601 4.29996L263.8 4.19995C265.6 6.99995 318.6 51.8 320.9 53.1Z"
        fill="black" />
      <path class="color-animate" fill-rule="evenodd" clip-rule="evenodd"
        d="M232.5 0C253 0 269.6 16.6 269.6 37.1C269.6 57.6 253 74.2 232.5 74.2C212 74.2 195.4 57.6 195.4 37.1C195.4 16.6 212 0 232.5 0ZM232.6 13.3C219.4 13.3 208.7 24 208.7 37.2C208.7 50.4 219.4 61.1 232.6 61.1C245.8 61.1 256.5 50.4 256.5 37.2C256.6 24 245.9 13.3 232.6 13.3Z"
        fill="black" />
      <path class="color-animate" fill-rule="evenodd" clip-rule="evenodd"
        d="M37.1005 0.199951C57.6005 0.199951 74.2004 16.8 74.2004 37.3C74.2004 57.8 57.6005 74.4 37.1005 74.4C16.6005 74.4 0.000446772 57.8 0.000446772 37.3C-0.0995532 16.9 16.6005 0.199951 37.1005 0.199951ZM37.2004 13.6C24.0004 13.6 13.3004 24.3 13.3004 37.5C13.3004 50.7 24.0004 61.4 37.2004 61.4C50.4004 61.4 61.1005 50.7 61.1005 37.5C61.1005 24.3 50.4004 13.6 37.2004 13.6Z"
        fill="black" />
      <path class="color-animate" fill-rule="evenodd" clip-rule="evenodd"
        d="M173.701 56.6C178.801 56.6 182.9 52.5 182.9 47.4C182.9 42.3 178.801 38.2 173.701 38.2C168.601 38.2 164.5 42.3 164.5 47.4C164.5 52.4 168.601 56.6 173.701 56.6Z"
        fill="black" />
    </svg>

  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useMainStore } from '@/store/index'
const mainStore = useMainStore();
const dataReady = computed(() => mainStore.getDataReady)
const show = ref(false);
setTimeout(() => {
  show.value = true
}, 100);
watch(dataReady, (newValue) => {
  show.value = false
})
</script>


<style lang="scss">
.progress-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: hsla(0, 0%, 89%, 0.85);
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  svg.logo {
    width: 25vw;
  }

  .spinners {
    margin-bottom: 40px;
  }

  .spinners svg {
    width: 40px;
    height: 40px;
  }

  .progress-status {
    font-size: 1.25rem;
    margin-top: 1rem;
    color: #212121;
    opacity: 1;
    transform: translateY(0px);
    transition: all 0.45s ease-in;

    &.onchange {
      transform: translateY(10px);
      opacity: 0;
    }
  }

  .progress {
    border-radius: 20px;
    height: 25px;
  }
}

.color-animate {
  animation: col 3s ease-in-out infinite;
}

@keyframes col {
  0% {
    fill: #880d1e
  }
  25% {
    fill: #dd2d4a
  }
  75% {
    fill: #f26a8d
  }
  100% {
    fill: #880d1e
  }
}
</style>