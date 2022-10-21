import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

const state = {
  login: 'ali haider',
}
const getters = {
  // getLogin: (state) =>  state.login,
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
    auth
  },
}

// const store = {
//     state: {
//         login: 'ali haider'
//     },
//     getters: {
//         getLogin: (state) => state.login
//     },
//     mutations: {},
//     actioons: {}

// }

// const mutationNames = [];
// for (const mutation in store.mutations) {
//   mutationNames.push(mutation);
// }

// store.plugins = [

// ];

// export default new Vuex.Store(store);
