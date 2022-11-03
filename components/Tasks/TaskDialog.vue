<template>
  <div>
    <v-dialog v-model="taskDialogFlag" width="500"
      ><v-card min-height="380">
        <v-card-title
          class="px-1 text-truncate dialog-title-border"
          style="background-color: #000c7a; color: white"
        >
          <div class="d-flex justify-center float-left" style="width: 90%">
            <span class="d-inline-block text-truncate" style="max-width: 300px">
              <b class="ui-theme-color modals-title-size">
                {{ taskTitleFlag }}
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
              @click="taskDialogFlag = false"
              class="d-flex mr-2"
            >
              mdi-close
            </v-icon>
          </div>
        </v-card-title>
        <hr />
        <div class="mx-6 my-2">
          <label for="Email" style="color: #000c7a">Add Title *</label>
        </div>
        <div style="max-width: 455px" class="mx-6">
          <v-text-field
            v-model="taskTitle"
            color="purple darken-2"
            outlined
            autofocus
          ></v-text-field>
        </div>
        <div class="d-flex mx-6">
          <div for="start-date" class="mt-6" style="color: #000c7a">
            Start Date *
          </div>
          <v-spacer></v-spacer>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="mr-4">
                <v-text-field
                  v-model="startDate"
                  prepend-icon="mdi-calendar"
                  readonly
                >
                  <v-icon slot="prepend" color="#000c7a">
                    mdi-calendar</v-icon
                  ></v-text-field
                >
              </div>
            </template>
            <v-date-picker
              v-model="startDate"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </div>
        <div class="d-flex mx-6">
          <label for="end-date" class="mt-6" style="color: #000c7a"
            >End Date *</label
          >
          <v-spacer></v-spacer>
          <v-menu
            ref="menu"
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs" v-on="on" class="mr-4">
                <v-text-field
                  v-model="endDate"
                  prepend-icon="mdi-calendar"
                  readonly
                >
                  <v-icon slot="prepend" color="#000c7a">
                    mdi-calendar</v-icon
                  ></v-text-field
                >
              </div>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="dateCheck()"
            ></v-date-picker>
          </v-menu>
        </div>
        <v-card-actions class="d-flex mx-3">
          <v-btn @click="taskDialogFlag = false" style="width: 100px"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            @click="onSubmit()"
            class="ma-4 btn"
            color="#000c7a"
            style="width: 100px"
            >Save
            <v-progress-circular
              v-if="loader"
              indeterminate
              class="ml-2"
            ></v-progress-circular
          ></v-btn>
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
    'taskTitleFlag',
    'taskId',
    'taskName',
    'taskStartDate',
    'taskEndDate',
  ],
  data() {
    return {
      taskDialogFlag: true,
      taskTitle: this.taskName,
      file: '',
      startDate: this.taskStartDate,
      endDate: this.taskEndDate,
      menu: false,
      menu2: false,
      loader: false,
    }
  },
  computed: {
    ...mapGetters(['getSelectedCompany', 'getSelectedProject']),
  },
  methods: {
    ...mapActions(['createTask', 'updateTask']),
    dateCheck() {
      const validate = Date.parse(this.startDate) <= Date.parse(this.endDate)
      if (!validate) {
        this.endDate = null
        this.$nuxt.$emit('show-snackbar', {
          snackbarMessagecolor: true,
          snackbarMessage:
            'End date must be greater than or equal to start date!',
          snackbar: true,
        })
      } else this.menu2 = false
    },
    onSubmit() {
      const formData = new FormData()
      formData.append('name', this.taskTitle)
      formData.append(
        'start_date',
        this.startDate.split('-').reverse().join('-')
      )
      formData.append('end_date', this.endDate.split('-').reverse().join('-'))
      if (
        formData.get('name') &&
        formData.get('start_date') &&
        formData.get('end_date')
      ) {
        if (this.taskTitleFlag === 'Create Task') {
          this.loader = true
          this.createTask({
            formData,
            project_id: this.$route.params.projectId,
            phase_id: this.$route.params.phaseId,
          })
            .then(() => {
              this.loader = false
              this.taskDialogFlag = false
              this.$nuxt.$emit('show-snackbar', {
                snackbarMessagecolor: false,
                snackbarMessage: 'Task created successfully!',
                snackbar: true,
              })
            })
            .catch((err) => {
              if (err.status === 401) {
                this.loader = false
                this.taskDialogFlag = false
                this.$auth.logout()
              }
            })
        } else if (this.taskTitleFlag === 'Update Task') {
          formData.append('_method', 'PUT')
          this.loader = true
          this.updateTask({
            formData,
            company_id: this.getSelectedCompany.id,
            project_id: this.$route.params.projectId,
            phase_id: this.$route.params.phaseId,
            task_id: this.taskId,
          })
            .then(() => {
              this.loader = false
              this.taskDialogFlag = false
              this.$nuxt.$emit('show-snackbar', {
                snackbarMessagecolor: false,
                snackbarMessage: 'Task updated successfully!',
                snackbar: true,
              })
            })
            .catch((err) => {
              if (err.status === 401) {
                this.loader = false
                this.taskDialogFlag = false
                this.$auth.logout()
              }
            })
        }
      } else
        this.$nuxt.$emit('show-snackbar', {
          snackbarMessagecolor: true,
          snackbarMessage: 'Please select / enter all values!',
          snackbar: true,
        })
    },
  },
  watch: {
    taskDialogFlag(value) {
      if (!value) this.$emit('update:openTaskDialog', false)
    },
  },
}
</script>

<style scoped>
.btn {
  color: white;
}
</style>
