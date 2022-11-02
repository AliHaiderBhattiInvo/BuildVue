<template>
  <div class="mt-1 w-100">
    <div class="pointer d-flex flex-wrap justify-center align-center">
      <v-card
        v-for="(project, index) in getProjects"
        @click="openProject(project)"
        :key="index"
        max-width="344"
        min-height="400"
        class="mx-2 my-2"
      >
        <div class="d-flex">
          <v-card-title
            class="d-inline-block text-truncate pointer"
            style="color: #000c7a"
          >
            {{ project.name.toUpperCase() }}
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
                @click.stop="editProject(project)"
                >Edit Project</v-list-item
              >
              <hr />
              <v-list-item
                class="pointer"
                style="color: #000c7a"
                @click.stop="removeProject(project)"
                >Delete Project</v-list-item
              >
            </v-list>
          </v-menu>
        </div>

        <v-img
          v-if="project.image"
          :src="
            project.image.includes('https://')
              ? project.image
              : baseUrl.slice(0, -8) + project.image
          "
          height="250"
          width="350px"
        ></v-img>
        <div
          v-else
          class="d-flex justify-center align-center"
          style="height: 250px; width: 350px"
        >
          <h4>No image found</h4>
        </div>

        <!-- <v-card-subtitle> {{ project.subtitle }} </v-card-subtitle> -->

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
      v-if="!pageLoading && getProjects?.length >= 9"
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
      v-if="!getProjects.length"
      class="d-flex justify-center align-center w-100"
      style="height: 100vh"
    >
      <h2 style="color: #000c7a">No Projects Found.</h2>
    </div>
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
    ...mapActions(['fetchProjects', 'deleteProject']),
    ...mapMutations(['setEmptyProjects', 'setSelectedProject']),
    openProject(project) {
      this.setSelectedProject(project)
      localStorage.setItem('setSelectedProject', JSON.stringify(project))
      this.$router.push({ path: `/projects/${project.id}/phases` })
    },
    editProject(project) {
      this.openProjectDialog = true
      this.projectName = project.name
      this.projectId = project.id
      this.imagePath = this.baseUrl.slice(0, -8) + project.image
    },
    removeProject(project) {
      this.deleteProject({
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
    this.setEmptyProjects([])
    this.fetchProjects(this.currentPage)
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
