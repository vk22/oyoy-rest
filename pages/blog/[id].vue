<template>
  <div class="blog-page">
    <section class="blog-page-hero">
      <div class="blog-title">
        <h1>{{ post.title }}</h1>
      </div>
      <div class="post-date">{{ useNuxtApp().$formatDate(post.date) }}</div>
      <div class="blog-top-img" :style="{ backgroundImage: 'url(' + post.images[0].file.url + ')' }"></div>
    </section>
    <section class="blog-page-content">
      <v-container class="blog-container">
          <v-row>
            <v-col cols="12" md="8" class="pr-12">
              <div v-html="post.text"></div>
            </v-col>
            <v-col cols="12" md="4">
              <FormSubscribe></FormSubscribe>
            </v-col>
          </v-row>
      </v-container>
    </section>
    <Footer></Footer>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'route'
})
import FormSubscribe from '~/components/FormSubscribe.vue'

const route = useRoute()
const { data } = await useFetch(`/api/blog/${route.params.id}`)
const post = ref(data._rawValue)
const pageTitle = post.value.title.substring(0, 40)
const pageDescription =  truncate(post.value.text.replace(/<[^>]*>/g, ''), 159)

function truncate(str, n){
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};


useHead({
  title: pageTitle + ' | OyOy Restaurant',
  meta: [
    { name: 'description', content: pageDescription },
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [{ rel: 'icon', type: 'image/png', href: "/favicon.png" }]
})

</script>

<style lang="scss">
@import "assets/scss/variables.scss";
.blog-page {
  
  .blog-page-hero {
    position: relative;
    width: 100%;
    height: 650px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3rem;
    flex-direction: column;
    overflow: hidden;

    .blog-title {
      position: relative;
      z-index: 99;
      width: 50vw;
      margin-bottom: 1rem;

      h1 {
        font-family: $font-sans!important;
        font-size: 3.5rem;
        line-height: 4rem;
        text-transform: uppercase;
        font-weight: 400!important;
        color: #fff;
        text-align: center;
        font-weight: 500;
      }
    }

    .post-date {
      position: relative;
      z-index: 99;
      color: #e7e7e7;
      text-align: center;
      font-weight: 500;
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
      animation: scaleIn 1s;
      animation-fill-mode: forwards;

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

  .blog-page-content {
    padding-bottom: 5rem;
    h3 {
      font-family: $font-sans!important;
      font-size: 1.5rem;
      line-height: 1.75rem;
      text-transform: uppercase;
      font-weight: 500!important;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.75;
      margin-bottom: 2rem;
    }
  } 

  @keyframes scaleIn {
  0% {
    transform: scale(1.01);
    animation-timing-function: cubic-bezier(0.565, 0.43, 0.24, 0.92);
  }

  100% {
    transform: scale(1);
  }
}


}
</style>