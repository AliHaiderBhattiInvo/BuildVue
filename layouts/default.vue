<template>
  <v-app app dark>
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
    <v-app-bar
      v-if="$route.name !== 'Login'"
      app
      dense
      height="70"
      class="toolbar elevation-1"
    >
      <v-menu
        content-class="bg-color"
        ref="menu"
        v-model="companyMenu"
        :close-on-content-click="false"
        transition="scale-transition"
        min-width="auto"
        left
        nudge-top="200"
        nudge-right="200"
      >
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-app-bar-nav-icon v-on="on" lg color="white"></v-app-bar-nav-icon>
          </div>
        </template>
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          background-color="white"
          color="#2a206a"
          placeholder="Search"
          class="pa-1 position"
          outlined
          hide-details
          autofocus
          solo
          dense
          flat
          v-model="search"
        >
        </v-text-field>
        <v-list v-if="searchedCompanies" color="white">
          <v-list-item
            v-for="(company, index) in searchedCompanies"
            :key="index"
            class="pointer"
            :class="
              company.id == getSelectedCompany.id ? 'selected-company' : ''
            "
            @click="selectCompany(company)"
            >{{ company.name }}
            <v-spacer></v-spacer>

            <div
              v-if="company.id == getSelectedCompany.id"
              class="caption ml-2 mr-1 default"
              style="color: indigo"
            >
              Default
            </div>
          </v-list-item>

          <div v-if="search && !searchedCompanies.length">
            <p class="no-results-found my-1">No results found.</p>
          </div>
        </v-list>
      </v-menu>

      <v-toolbar-title
        class="font-weight-bold"
        :class="isMobile ? 'text-h5' : 'text-h4'"
        >{{ title }}</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-btn
        v-if="!isMobile"
        v-show="loggedIn"
        class="create-btn-width mr-2"
        color="white"
        @click="openDialog()"
        >Create {{ buttonTitle }}</v-btn
      >
      <v-btn v-if="isMobile" @click="openDialog()"
        ><v-icon color="#00109b" dense>mdi-plus</v-icon></v-btn
      >
      <v-btn
        v-if="!isMobile"
        v-show="loggedIn"
        class="btn-width"
        color="white"
        @click="logout()"
        >Logout</v-btn
      >
      <v-btn class="ml-2" v-if="isMobile" v-show="loggedIn" @click="logout()"
        ><v-icon color="#00109b" dense>mdi-logout</v-icon></v-btn
      >
    </v-app-bar>
    <v-main style="height: calc(100vh - 70px)">
      <Nuxt class="d-flex justify-center align-center w-100" />
    </v-main>
    <ProjectDialog
      v-if="openProjectDialog"
      :openProjectDialog.sync="openProjectDialog"
      :titleFlag.sync="titleFlag"
    />
    <PhaseDialog
      v-if="openPhaseDialog"
      :openPhaseDialog.sync="openPhaseDialog"
      :phaseTitleFlag.sync="phaseTitleFlag"
      :projectId.sync="$route.params.projectIds"
    />
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'DefaultLayout',
  components: {
    ProjectDialog: () => import('../components/Projects/ProjectDialog.vue'),
    PhaseDialog: () => import('../components/Phases/PhaseDialog.vue'),
  },
  data() {
    return {
      fixed: false,
      title: '',
      buttonTitle: '',
      openProjectDialog: false,
      openPhaseDialog: false,
      titleFlag: 'Create Project',
      phaseTitleFlag: 'Create Phase',
      snackbar: false,
      snackbarMessagecolor: false,
      snackbarMessage: null,
      search: null,
      currentPage: 1,
      companyMenu: false,
    }
  },
  computed: {
    ...mapGetters([
      'getLogin',
      'getToken',
      'getSelectedCompany',
      'getCompanies',
    ]),
    loggedIn() {
      return !!this.$auth.loggedIn || this.$route.path !== '/login'
    },
    searchedCompanies() {
      return this.search && this.getCompanies
        ? this.getCompanies.filter((item) => {
            return item.name
              ? item.name.toLowerCase().includes(this.search.toLowerCase())
              : false
          })
        : this.getCompanies
    },
    isMobile() {
      return this.$breakpoints.sm || this.$breakpoints.sSm
    },
  },
  methods: {
    ...mapMutations([
      'setToken',
      'setSelectedCompany',
      'setCompanies',
      'setSelectedProject',
      'setEmptyProjects',
    ]),
    ...mapActions(['fetchProjects']),
    logout() {
      this.$auth.logout().then(() => {
        this.$store.commit('setToken', null)
        localStorage.removeItem('setCompanies')
        localStorage.removeItem('setSelectedCompany')
        localStorage.removeItem('setSelectedProject')
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
    selectCompany(company) {
      if (this.getSelectedCompany.id !== company.id) {
        this.setSelectedCompany(company)
        localStorage.setItem('setSelectedCompany', JSON.stringify(company))
        if (this.$route.name !== 'ProjectsList')
          this.$router.push({ path: '/projects' })
        else {
          this.setEmptyProjects([])
          this.fetchProjects(this.currentPage)
        }
        setTimeout(() => {
          this.companyMenu = false
        }, 1500)
        this.snackbar = true
        this.snackbarMessage = 'Company changed successfully!'
        this.snackbarMessagecolor = false
      }
    },
    openDialog() {
      if (this.buttonTitle === 'Project') this.openProjectDialog = true
      else if (this.buttonTitle === 'Phase') this.openPhaseDialog = true
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
      this.setCompanies(JSON.parse(localStorage.getItem('setCompanies')))
      this.setSelectedCompany(
        JSON.parse(localStorage.getItem('setSelectedCompany'))
      )
      this.setSelectedProject(
        JSON.parse(localStorage.getItem('setSelectedProject'))
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
.btn-width {
  width: 100px;
  color: #00109b;
}
.create-btn-width {
  width: 140px;
  color: #00109b;
}
.toolbar {
  color: white;
  background-color: #000c7a !important;
}
.bg-color {
  background-color: white !important;
}
.no-results-found {
  font-size: 13px;
  color: grey;
  text-align: center !important;
  align-content: center !important;
}
.pointer {
  cursor: pointer;
}
.selected-company {
  background-color: rgb(207, 245, 253);
}
</style>
<style>
::-webkit-scrollbar {
  width: 0px !important;
}
</style>
