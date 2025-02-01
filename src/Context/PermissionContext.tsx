import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import serverApi from "Services/httpService";

// Define the permissions context type
interface PermissionsContextType {
  userPermissions: string[] | null;
  isLoading: boolean;
  error: string | null;
  fetchPermissions: () => void;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

// Fetch permissions for the current user
const fetchCurrentUserPermissions = async (): Promise<string[]> => {
  const response = await serverApi.get(`/Permission/GetCurrentUserPermissions`);
  return response.data; // Assume response is an array of routesf
};

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simulate authentication status (replace with your real auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem("authToken"))
  );

  // Query to fetch permissions
  const {
    data: userPermissions,
    isLoading,
    error,
    refetch,
  } = useQuery(["userPermissions"], fetchCurrentUserPermissions, {
    enabled: false, // Prevent automatic fetch
  });

  // Fetch permissions when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      refetch(); // Fetch permissions after login
    }
  }, [isAuthenticated, refetch]);

  // Example: Simulate login detection (replace with your actual login logic)
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(Boolean(token));
    };

    window.addEventListener("storage", handleAuthChange); // Listen for login via token storage
    return () => window.removeEventListener("storage", handleAuthChange);
  }, []);

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
