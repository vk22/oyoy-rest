// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    // head: {
    //   title: 'OyOy Restaurant',
    //   charset: 'utf-8',
    //   viewport: 'width=device-width, initial-scale=1',
    //   link: [{ rel: 'icon', type: 'image/png', href: "/favicon.png" }]
    // },
    // pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: [
    '@/assets/scss/font.css',
  ],

  devtools: { enabled: false },

  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker']
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxt/image',
    'nuxt-tiptap-editor'
  ],

  tiptap: {
    lowlight: {
      theme: 'github-dark',
    },
  },

  image: {
    quality: 80,
    format: ['webp']
  },

  plugins: [
    // '~/plugins/vue-lazyload'
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  nitro: {
    plugins: ["~/server/plugins/mongodb.ts"],
  },

  runtimeConfig: {
    ///mode
    mode: process.env.MODE,
    // mongodbUri
    mongodbUri: process.env.MONGO_URI,

    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      gtagId: 'AW-16850949987',
    }
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  compatibilityDate: '2025-01-18'
})