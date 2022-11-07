// import authAxios from '@/services/api.service.js'

const state = {
  token: null,
  companies: [],
  selectedCompany: null,
}
const getters = {
  getToken: (state) => state.token,
  getCompanies: (state) => state.companies,
  getCompany: (state) => (id) =>
    state.companies.find((item) => {
      return item.id === id
    }),
  getSelectedCompany: (state) => state.selectedCompany,
}
const mutations = {
  setToken: (state, data) => {
    state.token = data
  },
  setCompanies: (state, data) => (state.companies = data),
  setSelectedCompany: (state, data) => (state.selectedCompany = data),
}
const actions = {
  loginUser({ commit, getters }, loginCreds) {
    return new Promise((resolve, reject) => {
      this.$auth
        .loginWith('local', {
          data: loginCreds,
        })
        .then((response) => {
          commit('setCompanies', this.$auth.user.companies)
          localStorage.setItem(
            'setCompanies',
            JSON.stringify(this.$auth.user.companies)
          )
          commit('setSelectedCompany', this.$auth.user.companies[0])
          localStorage.setItem(
            'setSelectedCompany',
            JSON.stringify(this.$auth.user.companies[0])
          )
          commit('setToken', response.data.access_token)
          resolve({ response, companies: this.$auth.user.companies })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    this.$auth.logout().finally(() => {
      commit('setToken', null)
      localStorage.removeItem('setCompanies')
      localStorage.removeItem('setSelectedCompany')
      localStorage.removeItem('setSelectedProject')
      this.$router.push({ path: '/login' })
    })
  },
}
export default {
  state,
  getters,
  mutations,
  actions,
}
