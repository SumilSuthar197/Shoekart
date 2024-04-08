/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [admin, setAdmin] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth, admin, setAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
