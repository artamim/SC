import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Backend URL
  withCredentials: true, // Include cookies
});

export default axiosInstance;