<template>
  <NuxtLink :to="{ name: 'blog-id', params: { id: post.url } }">
    <div class="post-item slideUp fade-in">
      <div class="img-wrap img-1">
        <NuxtImg format="webp" :src="postMainImage" class="img-cover" />
      </div>
      <div class="text-wrap">
        <div class="title">
          {{ post.title }}
        </div>
        <div class="date">
          {{ post.date }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
const props = defineProps(["post"]);
const postMainImage = computed(() => {
  if (props.post.previewImage) {
    return props.post.previewImage.file.url
  } else {
    return null
  }
})
</script>

<style lang="scss">


  .post-item {
    cursor: pointer;

    .img-wrap {
      position: relative;
      // height: 400px;
      padding-top: 65%;
      margin-bottom: 1rem;
      overflow: hidden;

      img {
        @include base-transition(all);
      }
    }

    .text-wrap {
      //padding: 0 2rem;
    }

    .title {
      font-size: 1.25rem;
      text-transform: uppercase;
      color: #111;
    }

    .date {
      color: #999;
    }

    &:hover {
      .img-wrap img {
        transform: scale(1.05);
      }
    }
  }

</style>
