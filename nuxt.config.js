import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: '',
          redirect: { name: 'ProjectsList' },
        },
        {
          name: 'Login',
          path: '/login',
          component: resolve(__dirname, 'pages/Login/login.vue'),
        },
        {
          name: 'ProjectsList',
          path: '/projects',
          component: resolve(__dirname, 'pages/projects/index.vue'),
        },
        {
          name: 'ProjectDetails',
          path: '/projects/:projectId',
          redirect: { name: 'PhasesList' },
        },
        {
          name: 'PhasesList',
          path: '/projects/:projectId/phases',
          component: resolve(__dirname, 'pages/phase/index.vue'),
        },
        {
          path: '/projects/:projectId/phases/:phaseId',
          component: resolve(__dirname, 'pages/phase/_id.vue'),
        }
      )
    },
  },
  head: {
    titleTemplate: '%s - BuildVue',
    title: 'BuildVue',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://stoplight.io/mocks/buildvue/api/1170503/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  auth: {
    watchLoggedIn: true,
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/projects',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'oauth/token',
            method: 'post',
            propertyName: 'access_token',
          },
          logout: {
            url: '',
            method: 'delete',
          },
          user: {
            url: 'api/v1/users',
            method: 'get',
            propertyName: 'data',
          },
        },
        tokenType: 'Bearer',
      },
    },
  },
}
