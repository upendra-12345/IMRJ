import { createContext, useContext, useState } from "react";
import axios from "axios";

const AdminAuthContext = createContext();

const API_URL = "http://localhost:5001/api/auth";

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("imrj_admin") || "null")
  );

  const [token, setToken] = useState(
    localStorage.getItem("imrj_admin_token") || ""
  );

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    const { token, admin } = response.data;

    localStorage.setItem("imrj_admin_token", token);
    localStorage.setItem("imrj_admin", JSON.stringify(admin));

    setToken(token);
    setAdmin(admin);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("imrj_admin_token");
    localStorage.removeItem("imrj_admin");

    setToken("");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);