<template>
  <div class="mt-1 w-100">
    <div class="pointer d-flex flex-wrap justify-center align-center">
      <v-card
        v-for="(phase, index) in getPhases"
        :key="index"
        max-width="344"
        min-height="400"
        class="mx-2 my-2"
      >
        <div class="d-flex">
          <v-card-title style="color: #000c7a">
            {{ phase.name.toUpperCase() }}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            min-width="auto"
            left
          >
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn class="mt-3" text small fab>
                  <v-icon v-on="on" dense color="#000c7a"
                    >mdi-dots-vertical</v-icon
                  ></v-btn
                >
              </div>
            </template>
            <!-- date picker -->
            <v-list color="white">
              <v-list-item
                class="pointer"
                style="color: #000c7a"
                @click.stop="editPhase(phase)"
                >Edit Phase</v-list-item
              >
              <hr />
              <v-list-item
                class="pointer"
                style="color: #000c7a"
                @click.stop="removePhase(phase)"
                >Delete Phase</v-list-item
              >
            </v-list>
          </v-menu>
        </div>

        <v-img
          v-if="phase.image"
          :src="baseUrl.slice(0, -8) + phase.image"
          height="250"
          width="350px"
        ></v-img>
        <!-- <v-img
            v-if="phase.image"
            :src="phase.image"
            width="350px"
          ></v-img> -->
        <div
          v-else
          class="d-flex justify-center align-center"
          style="height: 345px; width: 350px"
        >
          <h4>No image found</h4>
        </div>

        <!-- <v-card-subtitle> {{ phase.subtitle }} </v-card-subtitle> -->

        <v-card-actions>
          <v-btn color="orange lighten-2" text> Explore </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              <!-- {{ project.description }} -->
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>
    <v-card
      v-if="!pageLoading && getPhases?.length >= 9"
      height="1"
      v-intersect.quiet="getNextPage"
    />
    <div
      v-if="pageLoading"
      class="w-100 my-2 d-flex align-center justify-center"
    >
      <v-progress-circular
        size="30"
        width="3"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div
      v-if="!getPhases.length"
      class="d-flex justify-center align-center w-100"
      style="height: 100vh"
    >
      <h2 style="color: #000c7a">No Phases Found.</h2>
    </div>
    <PhaseDialog
      v-if="openPhaseDialog"
      :openPhaseDialog.sync="openPhaseDialog"
      :phaseTitleFlag.sync="phaseTitleFlag"
      :phaseName.sync="phaseName"
      :imagePath.sync="imagePath"
      :phaseId.sync="phaseId"
    ></PhaseDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'PhasesList',
  middleware: 'auth',
  components: {
    PhaseDialog: () => import('./PhaseDialog.vue'),
  },
  data() {
    return {
      show: false,
      flag: false,
      pageLoading: false,
      baseUrl: process.env.baseURL,
      currentPage: 1,
      openPhaseDialog: false,
      phaseTitleFlag: 'Update Phase',
      phaseName: null,
      imagePath: null,
      projectId: null,
    }
  },
  computed: {
    ...mapGetters(['getPhases', 'getPhasesLastPage', 'getSelectedCompany']),
  },
  methods: {
    ...mapActions(['fetchPhases', 'deletePhase']),
    ...mapMutations(['setEmptyPhases']),
    openPhase(index, project) {
      this.$router.push({
        path: `${this.$route.path + '/' + index}`,
        params: { id: 'test title' },
      })
    },
    removePhase(phase) {
      this.deletePhase({
        company_id: this.getSelectedCompany.id,
        project_id: this.$route.params.projectId,
        phase_id: phase.id,
      })
        .then((res) => {
          if (res.status === 204) {
            this.$nuxt.$emit('show-snackbar', {
              snackbarMessagecolor: false,
              snackbarMessage: 'Project deleted successfully!',
              snackbar: true,
            })
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            this.projectDialogFlag = false
            this.$auth.logout()
          }
        })
    },
    getNextPage(_, __, isIntersecting) {
      if (isIntersecting) {
        this.currentPage = this.currentPage + 1
        if (this.currentPage <= this.getPhasesLastPage) {
          this.pageLoading = true
          this.fetchPhases({
            projectId: this.$route.params.projectId,
            currentPage: this.currentPage,
          }).then(() => {
            this.pageLoading = false
          })
        }
      }
    },
    editPhase(phase) {
      this.openPhaseDialog = true
      this.phaseName = phase.name
      this.phaseId = phase.id
      this.imagePath = this.baseUrl.slice(0, -8) + phase.image
    },
  },
  mounted() {
    this.setEmptyPhases([])
    this.fetchPhases({
      projectId: this.$route.params.projectId,
      currentPage: this.currentPage,
    }).catch((err) => {
      if (err.response.data) {
        this.$nuxt.$emit('show-snackbar', {
          snackbarMessagecolor: true,
          snackbarMessage: `Project with ${this.$route.params.projectId} not exist!`,
          snackbar: true,
        })
        setTimeout(() => {
          this.$router.back()
        }, 1000)
      }
    })
  },
}
</script>
<style scoped>
.overflow-scroll {
  overflow: scroll !important;
}
.pointer {
  cursor: pointer;
}
</style>
