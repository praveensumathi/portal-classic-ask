import React, { useContext } from "react";
import { useState, createContext, useEffect } from "react";
import { IAuthContext, IUser } from "../interface/types";

const AuthContext = createContext<IAuthContext>({
  user: {
    userId: null,
    phoneNumber: null,
    name: null,
    isReseller: false,
    role : null
  },
  updateUserData: () => {},
});

function AuthProvider({ children }) {
  const [user, setuser] = useState<IUser | null>(null);

  const updateUserData = (user: IUser | null) => {
    if (user) {
      setuser({
        ...user,
      });
    } else {
      setuser(null);
    }
  };

  const contextValue: IAuthContext = {
    user,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext<IAuthContext>(AuthContext);
  return context;
}

export default AuthProvider;
