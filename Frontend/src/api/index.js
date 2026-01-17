import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// export const login = (data) => API.post("/auth/login", data);
// export const register = (data) => API.post("/auth/register", data);
// export const getMe = () => API.get("/auth/me");
export default API;
