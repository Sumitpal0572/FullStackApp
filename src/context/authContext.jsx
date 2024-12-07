import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  });

  // Check for tokens in localStorage when the app mounts
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      setAuth({ isAuthenticated: true, accessToken, refreshToken });
    }
  }, []);

  // Login function to save tokens to localStorage and context state
  const login = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setAuth({ isAuthenticated: true, accessToken, refreshToken });
  };

  // Logout function to clear tokens and update context state
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth({ isAuthenticated: false, accessToken: null, refreshToken: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
