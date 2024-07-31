import React, { createContext, useEffect, useState } from "react";
import adminApis from "../apis/AdminApis";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("adminId") ? true : false
  );
  const [isSuperUser, setIsSuperUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const adminId = sessionStorage.getItem("adminId");
        const response = await adminApis.adminDetails(adminId);
        setAdmin(response.data.admin);
        setIsSuperUser(response.data.admin.isSuperUser);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching admin details.");
        setTimeout(() => {
          setError("");
        }, 1500);
        console.error("Fetch admin details error:", error);
      }
    };

    if (isAuthenticated) {
      fetchAdminDetails();
    }
  }, [isAuthenticated]);

  const login = async (email, password) => {
    try {
      const response = await adminApis.login(email, password);

      if (response.status === 200) {
        sessionStorage.setItem("adminId", response.data.admin._id);
        const adminId = sessionStorage.getItem("adminId");
        setAdmin({ id: response.data.admin._id });
        setIsAuthenticated(true);
        navigate(`/admin/${adminId}/dashboard`);
        setError(null);
      } else {
        setIsAuthenticated(false);
        setError(response.data.error);
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
    setAdmin(null);
    sessionStorage.removeItem("adminId");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  return (
    <AdminContext.Provider
      value={{ admin, isAuthenticated, isSuperUser, login, logout, error }}
    >
      {children}
    </AdminContext.Provider>
  );
};
