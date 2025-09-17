import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>{
        const message = error.response?.data?.message || "Something went wrong. Try again!";
        return Promise.reject(new Error(message));
  } 
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optional: auto-logout or redirect to login
      console.log("Unauthorized! Redirect to login.");
    }
    return Promise.reject(error);
  }
);
