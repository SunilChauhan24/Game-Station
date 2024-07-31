import React, { createContext, useState } from "react";
import hostApis from "../apis/HostApis";
import { useNavigate } from "react-router-dom";

export const HostContext = createContext();

export const HostProvider = ({ children }) => {
  const [host, setHost] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("hostId") ? true : false
  );
  const navigate = useNavigate();

  const login = async (emailOrPhone, password) => {
    try {
      const response = await hostApis.login(emailOrPhone, password);
      if (response.status === 200) {
        const hostId = response.data.host._id;
        localStorage.setItem("hostId", hostId);
        setHost(response.data.host);
        setIsAuthenticated(true);
        navigate("/host/gameStations");
        setError(null);
      } else {
        setIsAuthenticated(false);
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      setIsAuthenticated(false);
      setError("An error occurred while logging in. Please try again.");
      setTimeout(() => {
        setError("");
      }, 1500);
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setHost(null);
    localStorage.removeItem("hostId");
    setIsAuthenticated(false);
    navigate("/host/login");
  };

  return (
    <HostContext.Provider
      value={{ host, isAuthenticated, login, logout, error }}
    >
      {children}
    </HostContext.Provider>
  );
};
