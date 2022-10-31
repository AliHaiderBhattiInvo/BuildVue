<template>
  <v-app dark>
    <v-snackbar
      v-model="snackbar"
      class="mt-5"
      top
      right
      :color="snackbarMessagecolor ? 'red lighten-5' : 'green lighten-5'"
      light
      timeout="5000"
    >
      <span :class="snackbarMessagecolor ? 'red--text' : 'green--text'">
        {{ snackbarMessage }}</span
      >
      <template #action="{ attrs }">
        <v-btn
          :color="snackbarMessagecolor ? 'red' : 'green'"
          text
          v-bind="attrs"
          small
          fab
          @click="snackbar = false"
        >
          <v-icon small> mdi-close-circle </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <div style="max-height: 70px">
      <v-toolbar
        v-if="$route.name !== 'Login'"
        dense
        height="70"
        class="toolbar"
      >
        <v-app-bar-nav-icon lg color="white"></v-app-bar-nav-icon>

        <v-toolbar-title class="font-weight-bold text-h4">{{
          title
        }}</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn
          v-show="loggedIn"
          class="float-right create-btn-width ma-4"
          color="primary"
          @click="openProjectDialog = true"
          >Create {{ buttonTitle }}</v-btn
        >

        <v-btn
          v-show="loggedIn"
          class="float-right btn-width ma-4"
          color="primary"
          @click="logout()"
          >Logout</v-btn
        >
      </v-toolbar>
    </div>
    <v-main>
      <div class="d-flex justify-center align-center">
        <Nuxt />
      </div>
    </v-main>
    <ProjectDialog
      v-if="openProjectDialog"
      :openProjectDialog.sync="openProjectDialog"
      :titleFlag.sync="titleFlag"
    />

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'DefaultLayout',
  components: {
    ProjectDialog: () => import('../components/Projects/ProjectDialog.vue'),
  },
  data() {
    return {
      fixed: false,
      title: '',
      buttonTitle: '',
      openProjectDialog: false,
      titleFlag: 'Create Project',
      snackbar: false,
      snackbarMessagecolor: false,
      snackbarMessage: null,
    }
  },
  computed: {
    ...mapGetters(['getLogin', 'getToken', 'getSelectedCompany']),
    loggedIn() {
      return !!this.$auth.loggedIn || this.$route.path !== '/login'
    },
  },
  methods: {
    ...mapMutations(['setToken', 'setSelectedCompany']),
    logout() {
      this.$auth.logout().then(() => {
        this.$store.commit('setToken', null)
        localStorage.removeItem('setSelectedCompany')
        this.$router.push({ path: '/login' })
      })
    },
    checkRouteName() {
      const routeName = this.$route.name
      if (routeName === 'ProjectsList') {
        this.title = 'Projects List'
        this.buttonTitle = 'Project'
      } else if (routeName === 'PhasesList') {
        this.title = 'Phases List'
        this.buttonTitle = 'Phase'
      } else if (routeName === 'PhaseDetails') {
        this.title = 'Tasks List'
        this.buttonTitle = 'Task'
      }
    },
  },
  mounted() {
    this.$nuxt.$on('show-snackbar', (event) => {
      this.snackbar = event.snackbar
      this.snackbarMessage = event.snackbarMessage
      this.snackbarMessagecolor = event.snackbarMessagecolor
    })
    this.checkRouteName()
    const token = localStorage.getItem('auth._token.local')
    if (token) {
      this.setToken(token.slice(7))
      this.setSelectedCompany(
        JSON.parse(localStorage.getItem('setSelectedCompany'))
      )
    }
  },
  beforeDestroy() {
    this.$nuxt.$off('show-snackbar')
  },
  watch: {
    $route(value) {
      if (value) this.checkRouteName()
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
.create-btn-width {
  width: 140px;
}
.toolbar {
  color: white;
  background-color: #05e6f6 !important;
}
</style>
