import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering
  ssr: false,

  // Global page headers
  head: {
    titleTemplate: '%s - nuxt-test',
    title: 'nuxt-test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
  ],

  // Plugins to run before rendering page
  plugins: [
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Modules
  modules: [
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt'
  ],

  // Axios module configuration
  axios: {
    baseURL: 'http://localhost:8000'
  },

  // Vuetify module configuration
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#0863B6',
        },
      }
    }
  },

  // Build Configuration
  build: {
  }
}
