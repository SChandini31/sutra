import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// Axios instance pointing to your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api" // remove /api
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [role]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password }); // ✅ corrected route
      setToken(data?.access || "");
      setRole(data?.role || "");
      setUser(data?.user || null);
      return data;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  };

  // Signup function
  const signup = async (payload) => {
    try {
      const { data } = await api.post("/auth/signup", payload);
      return data;
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken("");
    setRole("");
    setUser(null);
  };

  const updateProfile = async (payload) => {
    try {
      const { data } = await api.put("/profile/update", payload);
      return data;
    } catch (err) {
      console.error("Profile update failed:", err.response?.data || err.message);
      throw err;
    }
  };
  

  const value = useMemo(() => ({ token, role, user, login, signup, logout, updateProfile, api }), [
    token,
    role,
    user
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
