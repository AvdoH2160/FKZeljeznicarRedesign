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

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       console.warn("JWT expired or unauthorized – logging out");

//       localStorage.removeItem("auth");

//       window.location.href = "/prijava";
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const originalRequest = error.config?.url;

    if (
      status === 401 &&
      !originalRequest?.includes("/Auth/login") &&
      !originalRequest?.includes("/Auth/register")
    ) {
      console.warn("Token expired – logging out");
      localStorage.removeItem("auth");
    }

    return Promise.reject(error);
  }
);

export default api;