import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import userApis from "../apis/UserApis";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("userId") ? true : false
  );
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser,isAuthenticated, setIsAuthenticated, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
