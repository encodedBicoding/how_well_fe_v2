module.exports = {
  mode: 'universal',
  generate: {
    fallback: true
  },
  env:{
    SERVER_API: process.env.SERVER_API || process.env.NODE_ENV === 'production' ? 'https://how-well-api.onrender.com/api/v1' : 'http://localhost:4000/api/v1',
    FE_URL: process.env.FE_URL || process.env.NODE_ENV === 'production' ? 'https://how-well-fe-v2.onrender.com' : 'http://localhost:3000', 
    HOST: process.env.HOST || '0.0.0.0'
  },
  publicRuntimeConfig: {
    SERVER_API: process.env.SERVER_API || process.env.NODE_ENV === 'production' ? 'https://how-well-api.onrender.com/api/v1' : 'http://localhost:4000/api/v1',
    FE_URL: process.env.FE_URL || process.env.NODE_ENV === 'production' ? 'https://how-well-fe-v2.onrender.com' : 'http://localhost:3000', 
    HOST: process.env.HOST || '0.0.0.0'
  },
  privateRuntimeConfig: {
    SERVER_API: process.env.SERVER_API || process.env.NODE_ENV === 'production' ? 'https://how-well-api.onrender.com/api/v1' : 'http://localhost:4000/api/v1',
    FE_URL: process.env.FE_URL || process.env.NODE_ENV === 'production' ? 'https://how-well-fe-v2.onrender.com' : 'http://localhost:3000', 
    HOST: process.env.HOST || '0.0.0.0'git
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - HWDYKM',
    title: process.env.npm_package_name || '%s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'How well do you know me, is the best FREE anonymous messaging and online quiz platform.'
      },
      {
        hid: 'locale',
        name: 'locale',
        content: 'en_EN'
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'index, follow'
      },
      {
        hid: 'site_name',
        name: 'site_name',
        content: 'How well do you know me'
      },
      {
        hid: 'title',
        name: 'title',
        content:
          'HWDYKM - Anonymous messaging website, online quiz, online games'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'online quiz, online games, anonymous messaging, anonymous messages, social platform, online messages, online fun and games'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@encodedbicoding'
      },
      {
        hid: 'twitter:domain',
        name: 'twitter:domain',
        content: 'hwdykm.xyz'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image_games'
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://hwdykm.xyz/'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content:
          'HWDYKM - Anonymous messaging website, online quiz, online games'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content:
          '    How well do you know me, is the best FREE anonymous messaging and online quiz platform.'
      },
      {
        hid: 'google-site-verification',
        name: 'google-site-verification',
        content: '1Xr1LGEDUhq_6w8PTc0adfuNpPQ5Dlwbl3RYINswVXk'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/idd5osv.css'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'rgba(174,247,2,.651)' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/font-awesome-icon'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-webfontloader',
    [
      '@nuxtjs/sitemap',
      {
        path: '/sitemap.xml',
        exclude: [],
        routes: [],
        cacheTime: 900000,
        etag: {
          weak: false
        },
        gzip: false,
        trailingSlash: false,
        defaults: {},
        pathGzip: '/sitemap.xml',
        hostname: 'https://www.hwdykm.xyz'
      }
    ],
    [
      'nuxt-sweetalert2',
      {
        confirmButtonColor: '#ff5e34',
        cancelButtonColor: '#393939'
      }
    ],
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-162679180-1'
      }
    ],
    [
      '@nuxtjs/google-adsense',
      {
        id: 'ca-pub-6604666533289792'
      }
    ],
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  pwa: {
    meta: {
      description:
        ' How well do you know me, is the best FREE anonymous messaging and online quiz platform.',
      nativeUI: true,
      mobileAppIOS: false
    },
    manifest: {
      name: 'HWDYKM',
      lang: 'en',
      theme_color: '#ff5a09',
      description:
        'How well do you know me, is the best FREE anonymous messaging and online quiz platform.'
    },
    categories: [
      'online quiz',
      'online games',
      'anonymous messaging',
      'anonymous messages',
      'social platform',
      'online messages',
      'online fun and games'
    ],
    related_applications: [
      {
        platform: 'kubool',
        url:
          'https://play.google.com/store/apps/details?id=com.kubool.app&utm_source=website&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
      }
    ]
  }
}
