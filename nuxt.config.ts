// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { 
          name: 'google-site-verification', 
          content: 'JBVbMFlQp-diGTgDwynmCQSUqMne9pdP8hfB3Gd4RHg' 
        }
      ],
      link: [
        {
          rel: 'preload',
          href: '/fonts/Melodrama-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ],
    },
    // head: {
    //   title: 'OyOy Restaurant',
    //   charset: 'utf-8',
    //   viewport: 'width=device-width, initial-scale=1',
    //   link: [{ rel: 'icon', type: 'image/png', href: "/favicon.png" }]
    // },
    // pageTransition: { name: 'page', mode: 'out-in' }
  },

  routeRules: {
    '/reservations': { prerender: true },
    '/reservation-confirmed': { prerender: true },
  },

  css: [
    '@/assets/scss/font.css',
    // '@/assets/scss/variables.scss'
  ],

  devtools: { enabled: false },

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
    externals: {
      allowlist: ['bcrypt']
    },
  },
  runtimeConfig: {
    ///mode
    mode: process.env.MODE,
    // mongodbUri
    mongodbUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,

    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || 'GTM-N3484GLZ',
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
