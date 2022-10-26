const axios = require('axios').default

const baseUrl = process.env.BASE_URL

const ApiService = {
  post: (endpoint, token, body) => {
    if (!token) {
      return axios.post(`${baseUrl}${endpoint}`, body)
    }
    const customAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return customAxios.post(`${baseUrl}${endpoint}`, body)
  },
}

export default ApiService
