<template>
  <div>
    <v-dialog v-model="phaseDialogFlag" width="500"
      ><v-card min-height="380">
        <v-card-title
          class="px-1 text-truncate dialog-title-border"
          style="background-color: #00109b; color: white"
        >
          <div class="d-flex justify-center float-left" style="width: 90%">
            <span class="d-inline-block text-truncate" style="max-width: 300px">
              <b class="ui-theme-color modals-title-size">
                {{ phaseTitleFlag }}
              </b>
            </span>
          </div>
          <div
            class="d-flex justify-end align-center float-right"
            style="width: 10%; height: 32px"
          >
            <v-icon
              small
              color="white"
              @click="phaseDialogFlag = false"
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
            v-model="phaseTitle"
            color="purple darken-2"
            outlined
            autofocus
          ></v-text-field>
        </div>
        <div class="mx-6 my-2">
          <label for="image">Upload Image *</label>
        </div>
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
        <v-card-actions class="d-flex mx-3">
          <v-btn @click="phaseDialogFlag = false">Cancel</v-btn>
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
    'phaseTitleFlag',
    'phaseName',
    'imagePath',
    'phaseId',
  ],
  data() {
    return {
      phaseDialogFlag: true,
      phaseTitle: this.phaseName,
      file: '',
      imgSrc: this.imagePath,
    }
  },
  computed: {
    ...mapGetters(['getSelectedCompany', 'getSelectedProject']),
  },
  methods: {
    ...mapActions(['createPhase', 'updatePhase']),
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    onSubmit() {
      const formData = new FormData()

      formData.append('image', this.file)
      formData.append('name', this.phaseTitle)

      if (this.phaseTitleFlag === 'Create Phase') {
        if (formData.get('image') && formData.get('name')) {
          this.createPhase({
            formData,
            project_id: this.$route.params.projectId,
          })
            .then(() => {
              this.phaseDialogFlag = false
              this.$nuxt.$emit('show-snackbar', {
                snackbarMessagecolor: false,
                snackbarMessage: 'Phase created successfully!',
                snackbar: true,
              })
            })
            .catch((err) => {
              if (err.status === 401) {
                this.phaseDialogFlag = false
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
      } else if (this.phaseTitleFlag === 'Update Phase') {
        formData.append('_method', 'PUT')
        if (formData.get('image') && formData.get('name')) {
          this.updatePhase({
            formData,
            company_id: this.getSelectedCompany.id,
            project_id: this.$route.params.projectId,
            phase_id: this.phaseId,
          })
            .then(() => {
              this.phaseDialogFlag = false
              this.$nuxt.$emit('show-snackbar', {
                snackbarMessagecolor: false,
                snackbarMessage: 'Project updated successfully!',
                snackbar: true,
              })
            })
            .catch((err) => {
              if (err.status === 401) {
                this.phaseDialogFlag = false
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
  },
  watch: {
    phaseDialogFlag(value) {
      if (!value) this.$emit('update:openPhaseDialog', false)
    },
  },
}
</script>

<style scoped>
.mt-110 {
  margin-top: 80px;
}
</style>
