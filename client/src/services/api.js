import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "http://localhost:5000/api",
});

// Attach JWT to every request
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },
  (error) => Promise.reject(error)
);

// Handle expired/invalid token
api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401 &&
      error.response?.data?.message === "Token Failed") {

      localStorage.removeItem("token");

      // Avoid redirect loop if already on login page
      if (window.location.pathname !== "/admin/login") {

        alert("Your session has expired. Please login again.");

        window.location.href = "/admin/login";

      }

    }

    return Promise.reject(error);

  }

);

export default api;