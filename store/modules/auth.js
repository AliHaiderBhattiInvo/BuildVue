import authAxios from '@/services/api.service.js'

const state = {
  dashboard: 'dashbboard',
  authenticated: null,
}
const getters = {
  getDashboard: (state) => state.dashboard,

  isLoggedIn: (state) => state.authenticated,
}
const mutations = {
  setToken: (state, token) => {
    state.authenticated = token
  },
}
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      authAxios
        .post('oauth/token', null, data)
        .then((response) => {
          const token = response.data.access_token
          localStorage.setItem('token', token)
          commit('setToken', token)
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
export default {
  state,
  getters,
  mutations,
  actions,
}
