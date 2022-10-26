<template>
  <div class="container">
    <v-row>
      <v-col class="d-flex justify-center text-center mt-8">
        <div class="text-h4">
          <span> Project 1 - Phase 1 </span>
        </div>
      </v-col>
    </v-row>
    <div class="text-xs-center">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="mb-4" max-width="344">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
              ></v-img>
            </v-card>

            <!--  -->
            <v-spacer />
            <div class="text-h4 green--text">
              <span>Tasks</span>
            </div>
            <div class="d-flex">
              <v-text-field
                v-model.trim="texto"
                type="text"
                placeholder="Create a new todo..."
                class="form-control my-3"
                @keydown.enter="addTask()"
              />
              <v-btn
                class="mt-4 ml-1"
                color="primary lighten-2"
                small
                outlined
                @click="addTask()"
              >
                <v-icon>mdi-plus-thick</v-icon>
                Add
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <!--  -->
        <div v-for="(item, i) in arrayTasks" :key="i">
          <div class="d-flex" style="width: 350px; cursor: pointer">
            <v-text-field
              readonly
              :value="item.title"
              type="text"
              placeholder="Create a new todo..."
              outlined
              @click="openTaskList()"
            />
            <v-progress-circular
              class="mt-2 ml-1"
              :rotate="360"
              :size="35"
              :value="item.status"
              :color="checkStatus(item.status)"
            >
              <div class="font-10">
                {{ item.status + '%' }}
              </div>
            </v-progress-circular>
          </div>
        </div>
      </v-container>
    </div>
    <TaskList v-if="openTaskDialog" :openTaskDialog.sync="openTaskDialog" />
  </div>
</template>

<script>
export default {
  name: 'PhaseDetail',
  middleware: 'auth',
  components: {
    TaskList: () => import('../../components/TaskList/TaskList.vue'),
  },
  data() {
    return {
      show: false,
      openTaskDialog: false,
      texto: '',
      arrayTasks: [
        {
          id: 1,
          index: 'Task1',
          title: 'Rip out',
          status: 100,
        },
        {
          id: 2,
          index: 'Task2',
          title: 'First fittings',
          status: 40,
        },
        {
          id: 3,
          index: 'Task3',
          title: 'Install',
          status: 0,
        },
      ],
    }
  },
  methods: {
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
  },
}
</script>
<style scoped>
.font-10 {
  font-size: 10px;
}
</style>
