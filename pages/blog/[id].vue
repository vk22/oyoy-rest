<template>
  <div class="blog-page">
    <section class="blog-page-hero">
      <div class="blog-title fadeIn-0">
        <h1>{{ post.title }}</h1>
      </div>
      <div class="post-date fadeIn-1">{{ useNuxtApp().$formatDate(post.date) }}</div>
      <div
        class="blog-top-img"
        :style="{ backgroundImage: 'url(' + post.mainImage.file.url + ')' }"
      ></div>
    </section>
    <section class="blog-page-content">
      <v-container class="blog-container">
        <v-row>
          <v-col cols="12" md="8" class="text-col">
            <div
              v-for="(item, index) in post.contentItems"
              :key="index"
              class="text-paragraph"
            >
              <div v-if="item.type === 'text'" v-html="item.data"></div>
              <div v-if="item.type === 'gallery'">
                <SwiperGalleryBlog
                  :gallery="post.gallery"
                  v-if="post.gallery.length"
                ></SwiperGalleryBlog>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <FormSubscribe></FormSubscribe>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="blog-page-related">
      <v-container class="blog-container">
        <v-row>
          <v-col>
            <BlogRelatedPosts :currentPost="post._id" />
          </v-col>
        </v-row>
      </v-container>
    </section>
    <Footer></Footer>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "route",
});
import FormSubscribe from "~/components/FormSubscribe.vue";
const route = useRoute();
const { data } = await useFetch(`/api/blog/${route.params.id}`);
const post = ref(data.value);
if (!post.value.mainImage) {
  post.value.mainImage = post.value.images[0];
  post.value.previewImage = post.value.images[0];
}
const pageTitle = post.value.title.substring(0, 40);
const textFromContent = post.value.contentItems.find(
  (item) => item.type === "text"
);
const pageDescription = truncate(
  textFromContent.data.replace(/<[^>]*>/g, ""),
  159
);
const metaRobots = post.value.published ? "all" : "noindex";
const postOgImage = post.value.previewImage
  ? `${post.value.previewImage.file.url}?v=2`
  : "https://oyoyrestaurant.com/img/full-w-banner-1.jpg";
const postDate = post.value.date;

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

useHead({
  title: pageTitle + " | OyOy Restaurant",
  meta: [
    { name: "description", content: pageDescription },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "robots", content: metaRobots },
  ],
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
});

useSeoMeta({
  title: pageTitle + " | OyOy Restaurant",
  ogLocale: "en_US",
  ogTitle: pageTitle + " | OyOy Restaurant",
  description: pageDescription,
  ogDescription: pageDescription,
  ogUrl: "https://oyoyrestaurant.com/blog/" + post.value.url,
  ogType: "website",
  ogImage: postOgImage,
  ogImageWidth: "1200",
  ogImageHeight: "630",
  ogSiteName: "OyOy Restaurant",
  articlePublisher: "https://www.facebook.com/oyoy.mlt",
  articlePublishedTime: postDate,
  articleModifiedTime: postDate,
  twitterCard: "summary_large_image",
  twitterCreator: "@oyoy",
  twitterSite: "@oyoy",
});
</script>

<style lang="scss">
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
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;

      @include for-phone-only {
        width: 100%;
        padding: 0 1rem;
        margin-top: 5rem;
      }

      @include for-tablet-portrait-up {
        width: 50vw;
        margin-top: 5rem;
      }

      h1 {
        font-family: $font-sans !important;
        text-transform: uppercase;
        color: #fff;
        text-align: center;
        font-weight: 500;

        @include for-phone-only {
          font-size: 2.5rem;
          line-height: 3.25rem;
        }

        @include for-tablet-portrait-up {
          font-size: 3.5rem;
          line-height: 4rem;
        }
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
        content: " ";
        z-index: 1;
        display: block;
      }
    }
  }

  .blog-page-content {
    padding-bottom: 5rem;

    .text-col {
      @include for-phone-only {
        padding-right: 1rem;
      }

      @include for-tablet-portrait-up {
        padding-right: 2rem;
      }
    }

    .text-paragraph {
      margin-bottom: 2rem;
    }
    h2 {
      font-family: $font-sans !important;
      font-size: 2.25rem;
      line-height: 2.75rem;
      text-transform: uppercase;
      font-weight: 500 !important;
      margin-bottom: 1rem;
    }

    h3 {
      font-family: $font-sans !important;
      font-size: 1.5rem;
      line-height: 1.75rem;
      text-transform: uppercase;
      font-weight: 500 !important;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.75;
      margin-bottom: 1.5rem;
    }
    a {
      color: #111;
      text-decoration: underline;
      &:hover {
        text-decoration: none;
      }
    }

    div[data-youtube-video] {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      height: 0;
      overflow: hidden;
    }

    div[data-youtube-video] iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .youtube-container {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      height: 0;
      overflow: hidden;
    }

    .youtube-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

  }

  .blog-page-related {
    background: #f9fbff;
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