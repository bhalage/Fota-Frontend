import axios from "axios";

// git fetch testing
const fleetUrl = axios.create({
  baseURL: "http://localhost:8087",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("idToken")}`,
  },
});

fleetUrl.interceptors.request.use((config) => {
  const token = localStorage.getItem("idToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default fleetUrl;
