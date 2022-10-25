<template>
  <v-app dark>
    <div>
      <v-btn
        v-show="loggedIn"
        class="float-right btn-width ma-4"
        color="primary"
        @click="logout()"
        >Logout</v-btn
      >
    </div>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
    }
  },
  computed: {
    ...mapGetters(['getLogin', 'getDashboard']),
    loggedIn() {
      return !!this.$auth.loggedIn || this.$route.path !== '/login'
    },
  },
  methods: {
    // ...mapMutations(['setToken']),
    // setUser() {
    //   if (!process.client) return
    //   const token = localStorage.getItem('auth._token.local')
    //   if (token) {
    //     this.setToken(token)
    //   }
    // },
    logout() {
      this.$auth.logout()
      // .then(() => {
      // this.$store.commit('setToken', null)
      // this.$router.push({ path: '/login' })
      // })
    },
  },
}
</script>
<style scoped>
.float-right {
  float: right;
}
.btn-width {
  width: 100px;
}
</style>
