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
    (serverApi.defaults.headers as any).common["authorization"] = `bearer ${token}`;
  } else {
    // handle the case when token is falsy
  }
};

serverApi.interceptors.response.use(
  config => {
    console.log("config", config);
    const expireDate = config.data.Message === "ExpireToken";
    console.log("expireDate", config.data.Message);

    if (expireDate) {
 
    }
    const token = localStorage.getItem("tickment_token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      (serverApi.defaults.headers as any).common["api-token"] = `${token}`;

      console.log("configconfig", config);
    }
    return config;
  },
  error => {
    const expectedErrors = error.response && error.response.ActionCode == -1;
    if (!expectedErrors) {
      toast.error("مشکلی از سمت سرور رخ داده است!", {
        position: "top-right",
      });
    }
    return Promise.reject(error);
  }
);

export default serverApi;
