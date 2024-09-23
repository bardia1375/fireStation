import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import api from "./config.json";

// ساخت اینستنس Axios
const serverApi: AxiosInstance = axios.create({
  baseURL: api.api,
  headers: {
    "Access-Control-Allow-Headers": "http://localhost:3000/",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  },
});

serverApi.defaults.headers.post["Content-Type"] = "application/json";

serverApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tickment_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await axios.post(`${api.api}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    localStorage.setItem("tickment_token", accessToken);
    localStorage.setItem("refresh_token", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

serverApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const newToken = await refreshToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return serverApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed, logging out:", refreshError);
        localStorage.removeItem("tickment_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; 
      }
    }

    // نمایش پیام خطا در صورت بروز مشکل در سرور
    if (!error.response) {
      toast.error("مشکلی از سمت سرور رخ داده است!", {
        position: "top-right",
      });
    }

    return Promise.reject(error);
  }
);

export default serverApi;
