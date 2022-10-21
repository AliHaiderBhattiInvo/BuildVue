import authAxios from '@/services/api.service.js'

const state = {
  dashboard: 'dashbboard',
}
const getters = {
  getDashboard: (state) => state.dashboard,
}
const mutations = {}
const actions = {
  login(content, data) {
    return new Promise((resolve, reject) => {
      authAxios.post('oauth/token', null, data).then((response) => {
        console.log("reesponse get", response)
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
    })
  },
}
export default {
  state,
  getters,
  mutations,
  actions,
}
