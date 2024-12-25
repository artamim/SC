import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PROD_BASE_URL || "http://localhost:5000",
  withCredentials: true,
});
console.log("Base URL:", import.meta.env.VITE_PROD_BASE_URL);

export default axiosInstance;
