import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {}; // Create headers object if absent
    const token = Cookies.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/auth/login";
    }
    process.env.NODE_ENV === "development" &&
      console.log("Error at interceptor  :", { ...error });
    return Promise.reject(error);
  }
);

export default axiosInstance;
