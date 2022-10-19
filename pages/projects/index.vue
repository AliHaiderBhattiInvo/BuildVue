<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center text-center mt-8">
        <div class="text-h3">
          <span> Dashboard - Projects </span>
        </div>
      </v-col>
    </v-row>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col
            v-for="(project, index) in projectsData"
            :key="index"
            class="d-flex flex-wrap"
          
            @click="openProject(index)"
          >
            <v-card max-width="344">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
              ></v-img>

              <v-card-title> {{ project.title }} </v-card-title>

              <v-card-subtitle> {{ project.subtitle }} </v-card-subtitle>

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
                    {{ project.description }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
            <!-- <ListProjects projects="projectsData" /> -->
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>
<script>
// import ListProjects from '../../components/projects/ListProjects.vue'
export default {
  name: 'ProjectsPage',
  // components: { ListProjects },
  data() {
    return {
      show: false,
      projectsData: [
        {
          id: 1,
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips ',
          subtitle: '1,000 miles of wonder ',
          description: `I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.`,
        },
        {
          id: 2,
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips ',
          subtitle: '1,000 miles of wonder ',
          description: `I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.`,
        },
        {
          id: 3,
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips ',
          subtitle: '1,000 miles of wonder ',
          description: `I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.`,
        },
        {
          id: 4,
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips ',
          subtitle: '1,000 miles of wonder ',
          description: `I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.`,
        },
        {
          id: 5,
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips ',
          subtitle: '1,000 miles of wonder ',
          description: `I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.`,
        },
        {
          id: 6,
          img: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
          title: 'Top western road trips ',
          subtitle: '1,000 miles of wonder ',
          description: `I'm a thing. But, like most politicians, he promised more than he
          could deliver. You won't have time for sleeping, soldier, not with all
          the bed making you'll be doing. Then we'll go with that data file!
          Hey, you add a one and two zeros to that or we walk! You're going to
          do his laundry? I've got to find a way to escape.`,
        },
      ],
    }
  },
  methods: {
    openProject(index) {
      this.$router.push({path: `/projects/${index}/phases`})
    }
  }
}
</script>
