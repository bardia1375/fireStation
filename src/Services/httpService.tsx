import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import api from "./config.json";

// Create an Axios instance
const serverApi: AxiosInstance = axios.create({
  baseURL: api.api,
  headers: {
    // Removed CORS headers as they should be set by the server
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization header
serverApi.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("tickment_token"); // Use consistent key name
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: AxiosResponse<any>) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as AxiosResponse);
    }
  });
  failedQueue = [];
};

// Function to refresh the token
const refresh_token = async (): Promise<string> => {
  try {
    const storedrefresh_token = localStorage.getItem("refresh_token"); // Use consistent key name
    if (!storedrefresh_token) {
      throw new Error("No refresh token available.");
    }

    const response = await axios.post(
      `${api.api}Account/RefreshToken`,
      {}, // Empty request body or include necessary data
      {
        headers: {
          Authorization: `Bearer ${storedrefresh_token}`,
        },
      }
    );

    const { tickment_token, refresh_token: newrefresh_token } = response.data;

    // Store the new tokens
    localStorage.setItem("tickment_token", tickment_token);
    localStorage.setItem("refresh_token", newrefresh_token);

    return tickment_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Response interceptor to handle 401 errors
serverApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If refresh is already in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return serverApi(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const newtickment_token = await refresh_token();
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${newtickment_token}`;
          }
          processQueue(null, newtickment_token);
          console.log("newtickment_token",newtickment_token);
          
          resolve(serverApi(originalRequest));
        } catch (err) {
          processQueue(err, null);
          // Clear tokens and redirect to login
          localStorage.removeItem("tickment_token");
          // localStorage.removeItem("refresh_token");
          // window.location.href = "/login";
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    // Optionally handle other error statuses
    if (error.response?.status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (error.response?.status === 500) {
      toast.error("An unexpected error occurred on the server.");
    }

    return Promise.reject(error);
  }
);

export default serverApi;
