import axios from "axios";

// Axios client
export const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true, // send cookies automatically
});

// Optional: Request interceptor
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong. Try again!";
    return Promise.reject(new Error(message));
  }
);

// Refresh token logic
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  failedQueue = [];
};

// Define guest/public endpoints that don't require auth
const guestEndpoints = [
  "/login",
  "/signup",
  "/admin/login",
  "/otp",
  "/forgot-password",
  "/reset-password",
  "/",
];

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Always reject if it's refresh token or logout request
    if (
      originalRequest.url?.includes("auth/refresh-token") ||
      originalRequest.url?.includes("auth/logout")
    ) {
      return Promise.reject(error);
    }

    // If error is 401 (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If endpoint is public/guest, don't force redirect
      if (guestEndpoints.some((ep) => originalRequest.url?.includes(ep))) {
        return Promise.reject(error);
      }

      // If another refresh is already running, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      // Start refresh
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await axiosClient.post("/auth/refresh-token"); // refresh token
          isRefreshing = false;
          processQueue(); // retry all queued requests
          resolve(axiosClient(originalRequest));
        } catch (err) {
          isRefreshing = false;
          processQueue(err);
          window.location.href = "/login"; // force logout only for protected requests
          reject(err);
        }
      });
    }

    // Any other errors
    return Promise.reject(error);
  }
);
