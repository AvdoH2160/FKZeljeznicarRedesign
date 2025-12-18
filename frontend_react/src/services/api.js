import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7010/api"
});

api.interceptors.request.use(config => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth?.jwtToken) {
    config.headers.Authorization = `Bearer ${auth.jwtToken}`;
  }
  return config;
});

export default api;