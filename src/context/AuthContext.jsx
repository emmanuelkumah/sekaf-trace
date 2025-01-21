import React, { createContext, useState, useEffect, useContext } from "react";
import { apiCalls } from "../api/axios";
import { setupInterceptors } from "../api/axios";

const AuthContext = createContext(null);
const USER_KEY = "user";
const TOKEN_KEY = "auth_token";
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  //login function
  const loginUser = async (email, password) => {
    const loginDetails = {
      email,
      password,
    };
    try {
      setLoading(true);
      const response = await apiCalls.login(loginDetails);
      if (response.status === 200) {
        setToken(response.data.token);
        setUser(loginDetails.email);
        setupInterceptors(response.data.token);

        return true;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during login. Please try again.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setupInterceptors(null);
    return true;
  };
  return (
    <AuthContext.Provider
      value={{ token, user, error, loading, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
