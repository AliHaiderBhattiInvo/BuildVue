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
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
      routeCheck: false,
    }
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
