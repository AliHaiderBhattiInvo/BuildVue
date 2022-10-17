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

            <v-form @submit.prevent="agregarTodo">
              <v-text-field
                v-model.trim="texto"
                type="text"
                placeholder="Create a new todo..."
                class="form-control my-3"
              />
            </v-form>
            <v-card-actions>
              <v-btn color="primary lighten-2" outlined>
                <v-icon>mdi-plus-thick</v-icon>
                Add
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <!--  -->
        <div>
          <div v-for="(item, i) in arrayTasks" :key="i">
            <div class="mb-4 d-flex justify-around">
              <v-card class="pa-2" outlined min-width="354">
                {{ item.title }}
              </v-card>
              <div class="pa-2 ml-4" outlined>
                {{ item.status }}
              </div>
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhaseDetail',
  data() {
    return {
      show: false,
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
          status: 50,
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
  computed: {
    classTaskStatus(status) {
      return {
      }
    },
  },
}
</script>
