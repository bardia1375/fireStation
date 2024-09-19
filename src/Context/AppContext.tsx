import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the types for context state and functions
interface AppContextType {
  showModal: boolean;
  selectedUser: User | null;
  openModal: (user: User) => void;
  closeModal: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  imgUrl: string;
  missionNumber: number;
  clockMission: string;
  name: string;
  connect: boolean;
}

interface AppProviderProps {
  children: ReactNode; // To type the children prop
}

// Create the Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Create the Provider to wrap the entire app
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AppContext.Provider value={{ showModal, openModal, closeModal, selectedUser,setShowModal }}>
      {children}
    </AppContext.Provider>
  );
};
