import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Dodaj token u svaki zahtjev
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
