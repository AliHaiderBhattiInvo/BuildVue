<template>
  <div>
    This is task List
    <v-dialog v-model="taskDialogFlag" width="500"
      ><v-card height="400">
        <v-card-title class="px-1 text-truncate dialog-title-border">
          <div class="d-flex justify-center float-left" style="width: 90%">
            <span
              class="d-inline-block text-truncate"
              style="max-width: 300px"
              :style="$vuetify.breakpoint.xs ? 'max-width: 100px;' : ''"
            >
              <b class="ui-theme-color modals-title-size"> Tasks List </b>
            </span>
          </div>
          <div
            class="d-flex justify-end align-center float-right"
            style="width: 10%; height: 32px"
          >
            <v-icon
              small
              color="#757096"
              @click="taskDialogFlag = false"
              class="d-flex mr-2"
            >
              mdi-close
            </v-icon>
          </div>
        </v-card-title>
        <hr />
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          min-width="auto"
          left
        >
          <template v-slot:activator="{ on }">
            <div v-on="on" class="d-flex justify-center mt-2">
              <div>
                <v-btn outlined color="black"
                  >Select date
                  <!-- calendar icon -->
                  <v-icon v-on="on" class="ml-1" color="black" light icon
                    >mdi-calendar-outline</v-icon
                  >
                </v-btn>
              </div>
            </div>
          </template>
          <!-- date picker -->
          <v-date-picker
            no-title
            v-model="dates"
            range
            color="#2a206a"
          ></v-date-picker>
        </v-menu>
        <div class="d-flex" v-for="item in checkLists" :key="item.id">
          <v-checkbox
            v-model="item.value"
            :label="item.label"
            hide-details
            color="#2a206a"
            class="my-1"
            style="margin-left: 20px"
            dense
            @change="checkboxFun()"
          ></v-checkbox>
        </div>
        <v-card-actions class="d-flex justify-space-around mt-110">
          <v-btn color="primary lighten-2" outlined>Save</v-btn>
          <v-btn
            color="primary lighten-2"
            outlined
            @click="taskDialogFlag = false"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['openTaskDialog'],
  data() {
    return {
      taskDialogFlag: true,
      checkbox: true,
      dates: [],
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
  methods: {
    checkboxFun() {
      // console.log('value')
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
.mt-110 {
  margin-top: 80px;
}
</style>
