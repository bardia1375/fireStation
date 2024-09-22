import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import api from "./config.json";

const serverApi: AxiosInstance = axios.create({
  baseURL: api.api,
  headers: {
    "Access-Control-Allow-Headers": "http://localhost:3000/",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  },
});

serverApi.defaults.headers.post["Content-Type"] = "application/json";

export const setAuthToken = () => {
  const token = localStorage.getItem("tickment_token");

  if (token) {
    (serverApi.defaults.headers as any).common["authorization"] = `Bearer ${token}`;
  }
};

// فانکشن رفرش توکن
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

// Interceptor برای مدیریت پاسخ‌ها
serverApi.interceptors.response.use(
  (response) => response, // در صورت موفقیت
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // جلوگیری از تکرار بی‌نهایت درخواست‌ها

      try {
        // دریافت توکن جدید
        const newToken = await refreshToken();
        setAuthToken(); // به‌روز کردن توکن در درخواست‌های بعدی

        // اضافه کردن توکن جدید به درخواست قبلی
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        
        // ارسال مجدد درخواست با توکن جدید
        return serverApi(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed, logging out:", refreshError);
        // حذف توکن‌ها و هدایت به صفحه لاگین
        localStorage.removeItem("tickment_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // هدایت به صفحه لاگین
      }
    }

    // نمایش پیام خطا
    if (!error.response ) {
      toast.error("مشکلی از سمت سرور رخ داده است!", {
        position: "top-right",
      });
    }

    return Promise.reject(error);
  }
);

export default serverApi;
