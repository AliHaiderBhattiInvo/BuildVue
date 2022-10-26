// import authAxios from '@/services/api.service.js'

const state = {
  authenticated: null,
  companies: [],
}
const getters = {
  isLoggedIn: (state) => state.authenticated,
  getCompanies: (state) => state.companies,
  getCompany: (state) => (id) =>
    state.companies.find((item) => {
      return item.id === id
    }),
}
const mutations = {
  setToken: (state, token) => {
    state.authenticated = token
  },
  setCompanies: (state, data) => (state.companies = data),
}
const actions = {
  loginUser({ commit }, loginCreds) {
    return new Promise((resolve, reject) => {
      this.$auth
        .loginWith('local', {
          data: loginCreds,
        })
        .then((response) => {
          resolve(response)
          commit('setCompanies', this.$auth.user.companies)
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
