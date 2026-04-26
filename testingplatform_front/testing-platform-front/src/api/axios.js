import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

//token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export function parseJwt(token) {
  if (!token) return null;
  return JSON.parse(atob(token.split(".")[1]));
}
export default API;