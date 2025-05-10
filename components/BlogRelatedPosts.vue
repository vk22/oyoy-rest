<template>
  <section class="blog-related" v-if="relatedPosts.length">
    <v-container fluid>
      <v-row>
        <v-col class="d-flex justify-center">
          <div class="section-title fadeIn-2">
            <h3 v-if="posts.length > 0">Relaited Posts</h3>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="posts.length" class="justify-center">
        <v-col v-for="(post, index) in relatedPosts" :key="index" cols="12" sm="6">
          <NuxtLink :to="{ name: 'blog-id', params: { id: post.url } }">
            <div class="post-item slideUp fade-in">
              <div class="img-wrap img-1">
                <NuxtImg :src="post.images[0].file.url" class="img-cover" />
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
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
const props = defineProps(["currentPost"]);
import { useBlogStore } from '@/store/blog';
const store = useBlogStore();
const posts = computed(() => store.getItems);
const relatedPosts = posts.value.filter(el => el._id !== props.currentPost).slice(0, 2);

</script>

<style lang="scss">
@import "assets/scss/variables.scss";

.blog-related {
  display: flex;
  background: #f9fbff;
  padding: 3rem 0;

  @include for-phone-only {
    flex-direction: row;
  }

  @include for-tablet-portrait-up {
    flex-direction: column;
  }

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

  .section-title {
    h3 {
      font-family: $font-sans !important;
      max-width: 700px;
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
      line-height: 1.75rem;
      text-transform: uppercase;
      font-weight: 500 !important;
      margin: auto;
      margin-bottom: 40px;
    }
  }





}
</style>
