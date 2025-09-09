import axios from "axios";
import { BASE_URL } from "./apiPath";

const downloadAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Longer timeout for downloads
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
downloadAxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - NO AUTO LOGOUT for downloads
downloadAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log errors but don't auto-redirect for downloads
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Download authentication failed - token may be expired");
      } else if (error.response.status === 500) {
        console.error("Server error during download. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Download timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default downloadAxiosInstance;
