<template>
  <section class="blog-list" v-if="posts.length">
    <v-dialog v-model="dialogIsOpen" persistent max-width="600px">
      <div class="subscribe-form-modal">
        <div class="close" @click="dialogIsOpen = false">
          <svg width="30px" height="30px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
              <g id="LandingPopup" transform="translate(-983.000000, -267.000000)" stroke="#111">
                <g id="Group-6">
                  <g id="Group-5" transform="translate(420.000000, 243.000000)">
                    <path
                      d="M571.87315,32.8400752 L582.911677,32.8400752 L571.87315,32.8400752 L571.87315,21.6856907 L571.87315,32.8400752 Z M571.87315,32.8400752 L560.911677,32.8400752 L571.87315,32.8400752 L571.87315,44.0437203 L571.87315,32.8400752 Z"
                      id="Combined-Shape"
                      transform="translate(571.911677, 32.864706) rotate(-315.000000) translate(-571.911677, -32.864706) ">
                    </path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <FormSubscribe></FormSubscribe>
      </div>
    </v-dialog>
    <BlogLastPostGallery :slides="lastPosts"></BlogLastPostGallery>
    <v-container class="blog-container">
      <v-row>
        <v-col>
          <div class="subscribe-preview slideUp fade-in">
            <div class="subscribe-preview__title">Sign up for our newsletter to receive all the latest news</div>
            <div class="subscribe-preview__btn">
              <div class="btn" @click="dialogIsOpen = true">Get the Newsletter</div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="posts.length">
        <v-col v-for="(post, index) in posts" :key="index" cols="12" sm="6">
          <BlogPostItem :post="post"></BlogPostItem>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section v-else>
    <div class="blog-list__header empty">
      <v-container class="blog-container">
        <div class="last-post-info slideUp fade-in">
          <div class="blog-title">
            <h2>No posts yet here</h2>
          </div>
        </div>
      </v-container>
    </div>
  </section>
  <Footer></Footer>
</template>

<script setup>
definePageMeta({
  middleware: 'route'
})
useHead({
  title: 'Blog | OyOy Restaurant',
  meta: [
    { name: 'description', content: 'My amazing blog.' },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [{ rel: 'icon', type: 'image/png', href: "/favicon.png" }]
})
import FormSubscribe from '~/components/FormSubscribe.vue'
import { useBlogStore } from '@/store/blog'
const store = useBlogStore()
const posts = computed(() => store.getItems)
const lastPosts = posts.value.slice(0, 3);
const dialogIsOpen = ref(false)

/// handleScroll
const { $handleScroll } = useNuxtApp();
onMounted(() => {
  $handleScroll()
});

</script>

<style lang="scss">

.subscribe-preview {
  text-align: center;
  display: flex;
  flex-direction: column;
  // border: 1px solid #ddd;
  background: #EBEDF0;
  padding: 1rem 1rem 2rem 1rem;

  &__title {
    font-size: 1.1rem;
    text-transform: uppercase;
    padding: 1rem;
  }

  &__btn {
    display: flex;
    justify-content: center;
    
  }
}

.subscribe-form-modal {
  position: relative;
  background: #fff;

  .close {
    position: absolute;
    z-index: 9999;
    cursor: pointer;

    @include for-phone-only {
      right: 1rem;
      top: 1rem;
    }

    @include for-tablet-portrait-up {
      right: 1.5rem;
      top: 1.5rem;
    }
  }
}

.blog-list {
  padding-bottom: 5rem;

  &__header {
    background: red;
    position: relative;
    width: 100%;
    height: 650px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-bottom: 5rem;
    margin-bottom: 3rem;
    flex-direction: column;
  
    @include for-phone-only {
      padding-bottom: 2rem;
    }

    @include for-tablet-portrait-up {
      padding-bottom: 5rem;
    }

   &.empty {
      height: calc(100vh - 283px);
      background: #9e9e9e;
      margin-bottom: 0rem;
      .blog-title {
        width: 100%;
        h2 {
          font-family: $font-sans !important;
          font-size: 2.5rem;
          line-height: 3rem;
          text-transform: uppercase;
          color: #fff;
          text-align: center;
          font-weight: 400;
        }
      }
   } 

    .last-post-info {
      position: relative;
      z-index: 99;
    }



    .blog-top-img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;

      &:after {
        background-color: rgba(0, 0, 0, 0.35);
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        content: ' ';
        z-index: 1;
        display: block;
      }
    }
  }

  h3 {
    margin-bottom: 2rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.75;
    margin-bottom: 2rem;
  }
}

</style>