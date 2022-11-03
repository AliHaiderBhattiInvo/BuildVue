import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import project from './modules/project'
import phase from './modules/phase'
import task from './modules/task'

Vue.use(Vuex)

const state = {}
const getters = {}
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
    phase,
    task,
  },
}
