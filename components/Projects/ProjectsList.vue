<template>
  <div class="mt-1">
    <!-- <div class="d-flex justify-center text-center text-h4">
      <span> Dashboard - Projects </span>
    </div> -->
    <div
      v-if="startPageLoading"
      class="my-2 d-flex align-center justify-center"
    >
      <v-progress-circular
        size="200"
        width="10"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <v-item-group v-else>
      <v-list
        id="v-list-id"
        class="pointer overflow-scroll d-flex flex-wrap justify-center align-center"
        scrollable
        max-height="770"
        max-width="1200"
      >
        <v-card
          v-for="(project, index) in getProjects"
          :key="index"
          @click="openProject(index)"
          max-width="344"
          class="mx-2 my-2"
        >
          <div class="d-flex">
            <v-card-title> {{ project.name.toUpperCase() }} </v-card-title>
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
                  <v-btn text small fab>
                    <v-icon v-on="on" dense>mdi-dots-vertical</v-icon></v-btn
                  >
                </div>
              </template>
              <!-- date picker -->
              <v-list color="white">
                <v-list-item class="pointer" @click.stop="editProject(project)"
                  >Edit Project</v-list-item
                >
                <hr />
                <v-list-item
                  class="pointer"
                  @click.stop="deleteProject(project)"
                  >Delete Project</v-list-item
                >
              </v-list>
            </v-menu>
          </div>

          <v-img
            :src="baseUrl.slice(0, -8) + project.image"
            height="250"
            width="350px"
          ></v-img>

          <!-- <v-card-subtitle> {{ project.subtitle }} </v-card-subtitle> -->

          <v-card-actions>
            <v-btn color="orange lighten-2" text> Explore </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
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
        <v-card
          v-if="!pageLoading"
          height="1"
          v-intersect.quiet="getNextPage"
        />
        <div
          v-if="pageLoading"
          class="w-100 my-2 d-flex align-center justify-center"
        >
          <v-progress-circular
            size="100"
            width="5"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-list>
    </v-item-group>
    <ProjectDialog
      v-if="openProjectDialog"
      :openProjectDialog.sync="openProjectDialog"
      :titleFlag.sync="titleFlag"
      :projectName.sync="projectName"
      :imagePath.sync="imagePath"
      :projectId.sync="projectId"
    ></ProjectDialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ProjectsPage',
  middleware: 'auth',
  components: {
    ProjectDialog: () => import('./ProjectDialog.vue'),
  },
  data() {
    return {
      show: false,
      baseUrl: process.env.baseURL,
      pageLoading: false,
      startPageLoading: false,
      currentPage: 1,
      openProjectDialog: false,
      titleFlag: 'Update Project',
      projectName: null,
      imagePath: null,
      projectId: null,
    }
  },
  computed: {
    ...mapGetters(['getProjects', 'getLastPage', 'getSelectedCompany']),
  },
  methods: {
    ...mapActions(['fetchProjects', 'removeProject']),
    ...mapMutations(['setEmptyProjects']),
    openProject(index) {
      this.$router.push({ path: `/projects/${index}/phases` })
    },
    editProject(project) {
      this.openProjectDialog = true
      this.projectName = project.name
      this.projectId = project.id
      this.imagePath = this.baseUrl.slice(0, -8) + project.image
    },
    deleteProject(project) {
      this.removeProject({
        company_id: this.getSelectedCompany.id,
        project_id: project.id,
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
        if (this.currentPage <= this.getLastPage) {
          this.pageLoading = true
          this.fetchProjects(this.currentPage).then(() => {
            this.pageLoading = false
          })
        }
      }
    },
  },
  mounted() {
    this.startPageLoading = true
    this.setEmptyProjects([])
    this.fetchProjects(this.currentPage).then(() => {
      this.startPageLoading = false
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
