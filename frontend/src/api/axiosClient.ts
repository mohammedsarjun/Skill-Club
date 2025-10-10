import axios from "axios";


export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true, 
});


axiosClient.interceptors.request.use(
  (config) => config,
  (error) => {

    const message = error.response?.data?.message || "Something went wrong. Try again!";
    return Promise.reject(new Error(message));
  }
);


let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};


const guestEndpoints = [
  "/login",
  "/signup",
  "/admin/login",
  "/otp",
  "/forgot-password",
  "/reset-password",
  "/",
];


axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;


    if (
      originalRequest.url?.includes("auth/refresh-token") ||
      originalRequest.url?.includes("auth/logout")
    ) {
      return Promise.reject(error);
    }


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;


      if (guestEndpoints.some((ep) => originalRequest.url?.includes(ep))) {
        return Promise.reject(error);
      }


      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await axiosClient.post("/auth/refresh-token"); 
          isRefreshing = false;
          processQueue(); 
          resolve(axiosClient(originalRequest));
        } catch (err) {
          isRefreshing = false;
          processQueue(err);
          window.location.href = "/login"; 
          reject(err);
        }
      });
    }


    return Promise.reject(error);
  }
);
