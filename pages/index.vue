<template>
  <div>
    <v-row justify="center" align="center">
      <NuxtLogo />
      <v-col cols="12" sm="8" md="6">
        <div class="logo py-4 d-flex justify-center">
          <v-icon x-large color="green darken-2"> mdi-domain </v-icon>
          <v-card-title class="text-h3">
            Build<span class="green darken-2 rounded-lg px-2">Vue</span>
          </v-card-title>
        </div>
        <v-card>
          <v-card-title class="text-body-1">
            <p>Sign in with your username and password</p>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="username"
                outline
                label="Username"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="password"
                outline
                hide-details
                type="password"
                label="Password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" elevation="2" outlined text>
              Forgot password?
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login()">
              <v-icon left>mdi-lock</v-icon>
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      const loginCreds = {
        client_id: 2,
        client_secret: 'bTcr2h9iE2mRrv658qMvqmmeC8cHztp3lZlSBmhS',
        username: this.username,
        password: this.password,
        grant_type: this.password,
      }
      this.$store.dispatch('login', loginCreds)
      this.$router.push({ path: '/projects' })
    },
  },
}
</script>
<style>
.logo {
  opacity: 0.9;
}
</style>
