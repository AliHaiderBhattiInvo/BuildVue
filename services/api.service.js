const axios = require("axios").default;

const baseUrl = "https://stoplight.io/mocks/buildvue/api/1170503/";

const ApiService = {
  post: (endpoint, token, body) => {
    if (!token) {
      return axios.post(`${baseUrl}${endpoint}`, body);
    }
    const customAxios = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return customAxios.post(`${baseUrl}${endpoint}`, body);
  },
};

export default ApiService;