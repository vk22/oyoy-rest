<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div v-for="(option, i) of options" :key="i" @click="
        selected = option;
      open = false;
      $emit('input', option);
      ">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  default: {
    type: String,
    required: false,
    default: null,
  },
  tabindex: {
    type: Number,
    required: false,
    default: 0,
  },
});
let open = ref()
let selected = computed(() => props.default ? props.default : props.options.length > 0 ? props.options[0] : null)
</script>

<style lang="scss" scoped>
@import "assets/scss/variables.scss";

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 57px;
  line-height: 56px;

  .selected {
    /* background-color: #fff; */
    border-radius: 0px;
    border: 1px solid #BDBDBD;
    color: #111;
    padding-left: .75rem;
    cursor: pointer;
    user-select: none;
    font-weight: 400;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .selected.open {
    border: 1px solid #a9a9a9;
    border-radius: 4px 4px 0px 0px;
  }

  .selected:after {
    position: absolute;
    content: "";
    top: 27px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: #000000 transparent transparent transparent;
  }

  .items {
    color: #fff;
    border-radius: 0px 0px 4px 4px;
    overflow: scroll;
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 240px;
    left: 0;
    right: 0;
    z-index: 99999;
    box-shadow: 1px 1px 10px #00000024;
  }

  .items div {
    color: #111;
    padding-left: 1em;
    cursor: pointer;
    user-select: none;
  }

  .items div:hover {
    background-color: #e0e0e0;
  }

}

.selectHide {
  display: none;
}


.has-error {
  .custom-select {
    background-color: $colorErrorBg !important;
  }
}
</style>