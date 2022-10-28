<template>
  <div>
    <v-dialog v-model="projectDialogFlag" width="500"
      ><v-card min-height="380">
        <v-card-title class="px-1 text-truncate dialog-title-border">
          <div class="d-flex justify-center float-left" style="width: 90%">
            <span
              class="d-inline-block text-truncate"
              style="max-width: 300px"
              :style="$vuetify.breakpoint.xs ? 'max-width: 100px;' : ''"
            >
              <b class="ui-theme-color modals-title-size">
                {{ titleFlag }}
              </b>
            </span>
          </div>
          <div
            class="d-flex justify-end align-center float-right"
            style="width: 10%; height: 32px"
          >
            <v-icon
              small
              color="#757096"
              @click="projectDialogFlag = false"
              class="d-flex mr-2"
            >
              mdi-close
            </v-icon>
          </div>
        </v-card-title>
        <hr />
        <div class="mx-6 my-2">
          <label for="Email">Add Title *</label>
        </div>
        <div style="max-width: 455px" class="mx-6">
          <v-text-field
            v-model="projectTitle"
            color="purple darken-2"
            outlined
            autofocus
          ></v-text-field>
        </div>
        <div class="mx-6 my-2">
          <label for="image">Upload Image *</label>
        </div>
        <!-- <div>
          <input
            type="file"
            id="file"
            ref="file"
            v-on:change="handleFileUpload()"
          />
        </div> -->
        <div class="d-flex ml-6 mr-2 align-center">
          <input type="file" id="file" ref="file" v-on:change="preview" />

          <v-img style="border-radius: 50%" :src="imgSrc" width="45px"></v-img>
        </div>
        <div class="d-flex">
          <div></div>
          <v-spacer></v-spacer
          ><v-btn
            v-if="imgSrc"
            text
            small
            fab
            @click="imgSrc = null"
            style="margin-right: 60px"
            ><v-icon color="red" dense>mdi-delete-outline</v-icon></v-btn
          >
        </div>

        <!-- <div>
            <button @click="upload()">Upload</button>
          </div>
          <div>{{ uploaded }}</div> -->

        <v-card-actions class="d-flex mx-3">
          <v-btn @click="projectDialogFlag = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="onSubmit()" class="ma-4" color="primary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: [
    'openTaskDialog',
    'titleFlag',
    'projectName',
    'imagePath',
    'projectId',
  ],
  data() {
    return {
      projectDialogFlag: true,
      projectTitle: this.projectName,
      file: '',
      imgSrc: this.imagePath,
      uploaded: '',
      projectID: this.projectId,
    }
  },
  computed: {
    ...mapGetters(['getSelectedCompany']),
  },
  methods: {
    ...mapActions(['createProject', 'updateProject']),
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    onSubmit() {
      const formData = new FormData()

      formData.append('image', this.file)
      formData.append('name', this.projectTitle)

      if (this.titleFlag === 'Create Project') {
        if (formData.get('image') && formData.get('name')) {
          this.createProject(formData)
            .then(() => {
              this.projectDialogFlag = false
              this.$nuxt.$emit('show-snackbar', {
                snackbarMessagecolor: false,
                snackbarMessage: 'Project created successfully!',
                snackbar: true,
              })
            })
            .catch((err) => {
              if (err.status === 401) {
                this.projectDialogFlag = false
                this.$auth.logout()
              }
            })
        } else {
          this.$nuxt.$emit('show-snackbar', {
            snackbarMessagecolor: true,
            snackbarMessage: 'Please select / enter all values!',
            snackbar: true,
          })
        }
      } else if (this.titleFlag === 'Update Project') {
        formData.append('_method', 'PUT')
        if (formData.get('image') && formData.get('name')) {
          this.updateProject({
            formData,
            company_id: this.getSelectedCompany.id,
            project_id: this.projectId,
          })
            .then(() => {
              this.projectDialogFlag = false
              this.$nuxt.$emit('show-snackbar', {
                snackbarMessagecolor: false,
                snackbarMessage: 'Project updated successfully!',
                snackbar: true,
              })
            })
            .catch((err) => {
              if (err.status === 401) {
                this.projectDialogFlag = false
                this.$auth.logout()
              }
            })
        } else {
          this.$nuxt.$emit('show-snackbar', {
            snackbarMessagecolor: true,
            snackbarMessage: 'Please select / enter all values!',
            snackbar: true,
          })
        }
      }
    },
    preview(e) {
      //   const pic = document.getElementById('image')
      this.file = this.$refs.file.files[0]
      const imgSrc = window.URL.createObjectURL(e.target.files[0])
      this.imgSrc = imgSrc
    },
    upload() {
      this.uploaded = this.imgSrc
    },
  },
  watch: {
    projectDialogFlag(value) {
      if (!value) this.$emit('update:openProjectDialog', false)
    },
  },
}
</script>

<style scoped>
.mt-110 {
  margin-top: 80px;
}
</style>
