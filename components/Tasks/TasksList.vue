<template>
  <div class="mt-2 w-100">
    <div class="pointer d-flex flex-wrap justify-center align-center">
      <v-card
        v-for="(task, index) in getTasks"
        :key="index"
        min-width="345"
        min-height="345"
        class="mx-2 my-2"
      >
        <div class="d-flex">
          <v-card-title
            class="d-inline-block text-truncate pointer"
            style="color: #000c7a"
          >
            {{ task.name.toUpperCase() }}
          </v-card-title>
          <v-spacer></v-spacer>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            min-width="auto"
            left
          >
            <template v-slot:activator="{ on, attrs }">
              <div v-on="on" v-bind="attrs">
                <v-btn class="mt-3" text small fab>
                  <v-icon dense color="#000c7a"
                    >mdi-dots-vertical</v-icon
                  ></v-btn
                >
              </div>
            </template>
            <v-list color="white">
              <v-list-item
                class="pointer"
                style="color: #000c7a"
                @click.stop="editTask(task)"
                >Edit Task</v-list-item
              >
              <hr />
              <v-list-item
                class="pointer"
                style="color: #000c7a"
                @click.stop="removeTask(task)"
                >Delete Task</v-list-item
              >
            </v-list>
          </v-menu>
        </div>
        <div class="d-flex mr-6">
          <v-card-text style="font-size: 18px; color: #000c7a">
            Start Date:
          </v-card-text>
          <v-text-field
            :value="task.start_date.slice(0, 10)"
            prepend-icon="mdi-calendar"
            readonly
            color="#2a206a"
          >
            <v-icon slot="prepend" color="#000c7a">
              mdi-calendar</v-icon
            ></v-text-field
          >
        </div>
        <div class="d-flex mr-6">
          <v-card-text style="font-size: 18px; color: #000c7a">
            End Date:
          </v-card-text>
          <v-text-field
            :value="task.end_date.slice(0, 10)"
            prepend-icon="mdi-calendar"
            readonly
          >
            <v-icon slot="prepend" color="#000c7a">
              mdi-calendar</v-icon
            ></v-text-field
          >
        </div>

        <div class="d-flex justify-center">
          <v-progress-circular
            class="mt-2 ml-1"
            :rotate="360"
            :size="55"
            :width="5"
            :value="task.completion"
            :color="checkStatus(task.completion)"
          >
            <div class="font-13">
              {{ task.completion + '%' }}
            </div>
          </v-progress-circular>
        </div>
      </v-card>
    </div>
    <v-card
      v-if="!pageLoading && getTasks?.length >= 9"
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
      v-if="!getTasks.length"
      class="d-flex justify-center align-center w-100"
      style="height: 100vh"
    >
      <h2 style="color: #000c7a">No Tasks Found.</h2>
    </div>
    <!-- <div class="d-flex" v-for="item in checkLists" :key="item.id">
      <v-checkbox
        v-model="item.value"
        :label="item.label"
        hide-details
        color="#2a206a"
        class="my-1"
        style="margin-left: 20px"
        dense
        @change="checkboxFun(item, $event)"
      ></v-checkbox>
    </div> -->
    <TaskDialog
      v-if="openTaskDialog"
      :openTaskDialog.sync="openTaskDialog"
      :taskTitleFlag.sync="taskTitleFlag"
      :taskId.sync="taskId"
      :taskName.sync="taskName"
      :taskStartDate.sync="taskStartDate"
      :taskEndDate.sync="taskEndDate"
    ></TaskDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'TasksList',
  middleware: 'auth',
  components: {
    TaskDialog: () => import('../../components/Tasks/TaskDialog.vue'),
  },
  data() {
    return {
      currentPage: 1,
      openTaskDialog: false,
      taskTitleFlag: 'Update Task',
      taskId: null,
      taskName: null,
      taskStartDate: null,
      taskEndDate: null,
      date: null,
      menu: false,
      menu2: false,
      show: false,
      pageLoading: false,
      texto: '',
      getPhases: [
        {
          id: 1,
          index: 'Task1',
          name: 'Rip out',
          status: 100,
          date: '2022-12-02',
        },
        {
          id: 2,
          index: 'Task2',
          name: 'First fittings',
          status: 40,
          date: '2022-12-02',
        },
        {
          id: 3,
          index: 'Task3',
          name: 'Install',
          status: 0,
          date: '2022-12-02',
        },
        {
          id: 4,
          index: 'Task4',
          name: 'Install',
          status: 0,
          date: '2022-12-02',
        },
      ],
      checkLists: [
        {
          id: 1,
          label: 'Checkbox 1',
          value: true,
        },
        {
          id: 2,
          label: 'Checkbox 2',
          value: true,
        },
        {
          id: 3,
          label: 'Checkbox 3',
          value: true,
        },
        {
          id: 4,
          label: 'Checkbox 4',
          value: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getTasks', 'getTasksLastPage', 'getSelectedCompany']),
  },
  methods: {
    ...mapMutations(['setEmptyTasks']),
    ...mapActions(['fetchTasks', 'deleteTask']),
    addTask() {
      if (this.texto.length) {
        this.arrayTasks.push({
          id: 1,
          index: 'Task1',
          title: this.texto,
          status: 0,
        })
        this.texto = ''
      }
    },
    checkStatus(value) {
      if (value >= 50) return 'green'
      else if (value < 50 && value > 10) return 'yellow'
      else if (value === 0) return 'red'
    },
    openTaskList() {
      this.openTaskDialog = true
    },
    getNextPage(_, __, isIntersecting) {
      if (isIntersecting) {
        this.currentPage = this.currentPage + 1
        if (this.currentPage <= this.getTasksLastPage) {
          this.pageLoading = true
          this.fetchTasks({
            projectId: this.$route.params.projectId,
            phaseId: this.$route.params.phaseId,
            currentPage: this.currentPage,
          }).then(() => {
            this.pageLoading = false
          })
        }
      }
    },
    editTask(task) {
      this.openTaskDialog = true
      this.taskId = task.id
      this.taskName = task.name
      this.taskStartDate = task.start_date.slice(0, 10)
      this.taskEndDate = task.end_date.slice(0, 10)
    },
    checkboxFun(item, event) {
      console.log('value', item, event)
    },
    removeTask(task) {
      this.deleteTask({
        company_id: this.getSelectedCompany.id,
        project_id: this.$route.params.projectId,
        phase_id: this.$route.params.phaseId,
        task_id: task.id,
      })
        .then((res) => {
          if (res.status === 204) {
            this.$nuxt.$emit('show-snackbar', {
              snackbarMessagecolor: false,
              snackbarMessage: 'Task deleted successfully!',
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
  },
  mounted() {
    this.setEmptyTasks([])
    this.fetchTasks({
      projectId: this.$route.params.projectId,
      phaseId: this.$route.params.phaseId,
      currentPage: this.currentPage,
    }).catch((err) => {
      if (err.response.data) {
        this.$nuxt.$emit('show-snackbar', {
          snackbarMessagecolor: true,
          snackbarMessage: `Phase with ${this.$route.params.phaseId} not exist!`,
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
.font-13 {
  font-size: 13px;
  font-weight: bold;
}
</style>
