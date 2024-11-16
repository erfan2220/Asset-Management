import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://10.15.90.72:9098", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      window.location.href = "http://10.15.90.87:8081";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
