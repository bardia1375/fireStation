import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import serverApi from "Services/httpService";

// تعریف نوع داده‌های دسترسی
interface PermissionsContextType {
  userPermissions: string[] | null;
  isLoading: boolean;
  error: string | null;
  fetchPermissions: () => void;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

// تابع برای گرفتن دسترسی‌های کاربر جاری
const fetchCurrentUserPermissions = async (): Promise<string[]> => {
  const response = await serverApi.get(`/Permission/GetCurrentUserPermissions`);
  return response.data; // فرض بر اینکه پاسخ، آرایه‌ای از مسیرها باشد
};

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    data: userPermissions,
    isLoading,
    error,
    refetch,
  } = useQuery(["userPermissions"], fetchCurrentUserPermissions, {
    enabled: false, // از فراخوانی خودکار جلوگیری می‌کنیم
  });

  useEffect(() => {
    refetch(); // هنگام بارگذاری کامپوننت، اطلاعات دسترسی را بگیریم
  }, [refetch]);

  const contextValue = {
    userPermissions: userPermissions || null,
    isLoading,
    error: error?.message || null,
    fetchPermissions: refetch,
  };

  return <PermissionsContext.Provider value={contextValue}>{children}</PermissionsContext.Provider>;
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};
