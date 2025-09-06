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
    // '@/assets/scss/variables.scss'
  ],

  devtools: { enabled: true },

  build: {
    transpile: ['vuetify', '@vuepic/vue-datepicker'],
    extractCSS: true
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
    'nuxt-tiptap-editor',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    //'@zadigetvoltaire/nuxt-gtm'
  ],

  tiptap: {
    lowlight: {
      theme: 'github-dark',
    },
  },

  image: {
    quality: 80,
    format: ['webp'],
    domains: ['8hdewv6u55ya8hjg.public.blob.vercel-storage.com'],
  },
  plugins: [
    // '~/plugins/vue-lazyload'
  ],
  gtag: {
    id: 'AW-16850949987',
    //id: 'AW-17212492361' /// my test
  },
  // gtm: {
  //   id: 'GTM-N3484GLZ'
  //   //id: 'GTM-5GQBQS5S' /// my test
  // },
  sitemap: {
    sources: ['/api/sitemap'],
    cacheMaxAgeSeconds: 60,
    discoverImages: false,
    discoverVideos: false,
    xslColumns: [
        { label: 'URL', width: '50%' },
        { label: 'Last Modified', select: 'sitemap:lastmod', width: '50%' }
    ],
  },
  robots: {
    disallow: ['/login', '/admin/', ],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables.scss" as *;'
        }
      }
    },
    inspect: false
  },
  nitro: {
    plugins: ["~/server/plugins/mongodb.ts"],
    externals: {
      allowlist: ['bcrypt']
    },
  },
  runtimeConfig: {
    ///mode
    mode: process.env.MODE,
    // mongodbUri
    mongodbUri: process.env.MONGO_URI,

    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      //gtmId: 'GTM-N3484GLZ'
    },
    vercelBlobToken: process.env.BLOB_READ_WRITE_TOKEN,
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  compatibilityDate: '2025-06-06',
  experimental: {
     headNext: true,
     inlineSSRStyles: false
  }
})