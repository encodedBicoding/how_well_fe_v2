module.exports = {
  mode: 'universal',
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
          '    How well do you know me, is the best FREE anonymous messaging and online quiz platform.'
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
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/idd5osv.css'
      },
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  env: {
    BE_URL: process.env.API,
    FE_URL: process.env.BASE_URL || 'http://localhost:3000'
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
    '@nuxtjs/dotenv'
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
      'nuxt-sweetalert2',
      {
        confirmButtonColor: '#ff5e34',
        cancelButtonColor: '#393939'
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
  }
}
