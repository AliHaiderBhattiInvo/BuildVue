import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import project from './modules/project'

Vue.use(Vuex)

const state = {
  login: 'ali haider',
}
const getters = {
  getLogin(state) {
    return state.login
  },
}
const mutations = {}
const actions = {}

export default {
  state,
  mutations,
  getters,
  actions,
  modules: {
    auth,
    project,
  },
}
