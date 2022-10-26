<template>
  <div>
    <!-- snackbar -->
    <v-snackbar
      v-model="snackbar"
      class="mt-5"
      top
      right
      :color="updateTaskError ? 'red lighten-5' : 'green lighten-5'"
      light
    >
      <span :class="updateTaskError ? 'red--text' : 'green--text'">
        {{ snackbarMessage }}</span
      >
      <template #action="{ attrs }">
        <v-btn
          :color="updateTaskError ? 'red' : 'green'"
          text
          v-bind="attrs"
          small
          fab
          @click="snackbar = false"
        >
          <v-icon small> mdi-close-circle </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <!-- card -->
    <div class="logo py-4 d-flex justify-center">
      <v-icon x-large color="green darken-2"> mdi-domain </v-icon>
      <v-card-title class="text-h3">
        Build<span class="green darken-2 rounded-lg px-2">Vue</span>
      </v-card-title>
    </div>
    <v-card width="700">
      <v-card-text>
        <p
          v-if="validate"
          id="login-card-sub-heading"
          class="red--text red lighten-4 pa-4 rounded"
        >
          {{ validate }}
        </p>
        <div
          v-if="errorLogin"
          class="mt-2 mx-8 red lighten-4 rounded red--text pa-3"
        >
          <small>{{ errorLogin }}</small>
        </div>
        <!--card Heading -->
        <v-card-title>
          <p id="login-card-heading" class="font-weight-bold card-heading">
            Login
          </p>
          <!-- <p>to get started with Task Timer</p> -->
        </v-card-title>
        <v-form
          id="login-form"
          ref="form"
          v-model="valid"
          lazy-validation
          autocomplete="off"
        >
          <!-- email Input Field -->
          <label for="Email">Email Address *</label>
          <v-text-field
            v-model="username"
            color="purple darken-2"
            outlined
            :rules="emailValidation"
            @focus="focus"
          ></v-text-field>
          <!-- Password Input Field -->
          <label for="Password">Password *</label>
          <v-text-field
            v-model="password"
            color="purple darken-2"
            outlined
            :rules="passwordValidation"
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            class="mb-n7"
            @click:append="visible = !visible"
            @keydown.enter="login()"
            @focus="focus"
          ></v-text-field>
          <!-- CheckBox Field -->
          <v-row align="center" class="mx-1">
            <!-- Forgot Password Page Redirect Text -->
            <v-spacer></v-spacer>
            <router-link
              id="forget-password-link"
              to="/forget-password"
              class="text-decoration-none subtitle success-text"
              >Forgot Password?</router-link
            >
          </v-row>
          <!-- Login button -->
          <v-btn
            :disabled="!valid"
            width="60%"
            class="btn-success white--text mx-auto text-capitalize mt-5 white--text align-center d-flex"
            @click="login"
          >
            Login
            <v-progress-circular
              v-if="loader"
              indeterminate
              class="ml-2"
            ></v-progress-circular>
          </v-btn>

          <!--SignUp Page Redirect Text -->
          <p class="mt-1 subtitle ml-1 justify-center align-center d-flex">
            Don't have an account?
            <router-link
              id="signup-link"
              to=""
              class="text-decoration-none success-text ml-2"
              >Sign Up</router-link
            >
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { emailRules, passwordRules } from '../../validations/validations'
export default {
  name: 'LoginPage',
  middleware: 'auth',
  data() {
    return {
      username: null,
      validate: '',
      loader: false,
      errorLogin: '',
      visible: false,
      valid: true,
      password: null,
      emailValidation: emailRules,
      passwordValidation: passwordRules,
      updateTaskError: null,
      snackbar: false,
      snackbarMessage: null,
      autofilled: false,
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    login() {
      const loginCreds = {
        client_id: 2,
        client_secret: 'FuSgW8PkaxiD7VUhtGMDicQyinbJLDE6HziTPiel',
        username: this.username,
        password: this.password,
        grant_type: 'password',
      }
      this.loader = true
      this.loginUser(loginCreds)
        .then(() => {
          this.loader = false
        })
        .catch((err) => {
          this.loader = false
          this.snackbar = true
          this.updateTaskError = true
          this.snackbarMessage = err.response.data.message
        })
    },
    focus() {
      this.validate = ''
      this.errorLogin = ''
    },
  },
}
</script>
<style>
.logo {
  opacity: 0.9;
}
.btn-success {
  background-color: #1cc283 !important;
}
</style>
