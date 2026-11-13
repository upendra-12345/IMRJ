import { createContext, useContext, useState } from "react";
import axios from "axios";

const AdminAuthContext = createContext(null);

// Backend API URL from frontend .env
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const API_URL = `${BASE_URL}/api/auth`;

export const AdminAuthProvider = ({ children }) => {

  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("imrj_admin") || "null");
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("imrj_admin_token") || ""
  );

  // Admin Login
  const login = async (email, password) => {

    if (!BASE_URL) {
      throw new Error("Backend API URL is not configured.");
    }

    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token: authToken, admin: adminData } = response.data;

      if (!authToken || !adminData) {
        throw new Error("Invalid login response from server.");
      }

      // Save authentication details
      localStorage.setItem("imrj_admin_token", authToken);
      localStorage.setItem("imrj_admin", JSON.stringify(adminData));

      setToken(authToken);
      setAdmin(adminData);

      return response.data;

    } catch (error) {
      console.error("Admin Login Error:", error);
      throw error;
    }
  };

  // Admin Logout
  const logout = () => {

    localStorage.removeItem("imrj_admin_token");
    localStorage.removeItem("imrj_admin");

    setToken("");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom Hook
export const useAdminAuth = () => {

  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      "useAdminAuth must be used inside AdminAuthProvider"
    );
  }

  return context;
};

export default AdminAuthContext;