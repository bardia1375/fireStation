// utils/permissionUtils.ts

import { useHistory } from "react-router-dom"; // تغییر useHistory به useNavigate
import { usePermissions } from "../Context/PermissionContext";
import { useEffect } from "react";

// تابع بررسی مجوز با استفاده از کانتکست
export const useIsEndpointCrud = (endpoint: string): boolean => {
  const history = useHistory(); // تغییر به useNavigate
  const { userPermissions } = usePermissions();
  const role = localStorage.getItem("role");

  return userPermissions?.data?.includes(endpoint) || role === "Admin" ? true : false;
};
export const useIsEndpointNavbar = (endpoint: string): boolean => {
  const history = useHistory(); // تغییر به useNavigate
  const { userPermissions } = usePermissions();
  const role = localStorage.getItem("role");

  // useEffect(() => {
  //   if (userPermissions && !userPermissions?.data?.includes(endpoint) && !!role) {
  //     history.push("/notpermission"); // انتقال به صفحه بدون مجوز
  //   }
  // }, [endpoint, userPermissions, role, history]);

  return userPermissions?.data?.includes(endpoint) || role === "Admin" ? true : false;
};

// تابع بررسی مجوز برای ادمین
export const isAdmin = (): boolean => {
  return localStorage.getItem("role") === "Admin" ? true : false;
};
