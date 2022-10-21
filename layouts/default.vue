<template>
  <v-app dark>
    <div>
      <v-btn
        v-if="routeCheck"
        class="float-right btn-width ma-4"
        color="primary"
        @click="$router.push({ path: '/' })"
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
import { mapGetters } from "vuex";
export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters(["getLogin", "getDashboard"]),
  },
  data() {
    return {
      fixed: false,
      routeCheck: false,
    }
  },
  mounted() {
    console.log("getter", this.getLogin, this.getDashboard)
  },
  watch: {
    $route(to) {
      if (to.path !== '/') this.routeCheck = true
      else this.routeCheck = false
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
