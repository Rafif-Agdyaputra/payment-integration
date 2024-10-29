import React, { createContext, useContext, useState } from 'react';

interface AppContextProps {
  registrationData: any;
  setRegistrationData: React.Dispatch<React.SetStateAction<any>>;
  userPin: string;
  setUserPin: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [userPin, setUserPin] = useState('');

  return (
    <AppContext.Provider value={{ registrationData, setRegistrationData, userPin, setUserPin }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};
