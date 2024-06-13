import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const AuthContext = createContext();

const SIGN_OUT_MUTATION = gql`
  mutation SignOut {
    signOut {
      success
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;
const REGISTER_MUTATION = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;
const REFRESH_TOKEN_MUTATION = gql`
  mutation refresh_token($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedRefreshToken = localStorage.getItem("refreshToken");
  const [token, setToken] = useState(storedToken || "");
  const navigate = useNavigate();
  const [signOut] = useMutation(SIGN_OUT_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);

  const refreshingToken = async () => {
    if (storedRefreshToken) {
      try {
        const { data } = await refreshToken({
          variables: { refreshToken: storedRefreshToken },
        });
        localStorage.setItem("token", data.refreshToken.token);
        setToken(data.refreshToken.token);
      } catch (error) {
        console.error("Error refreshing token:", error);
        logOut();
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshingToken(), 8 * 60 * 1000);
    return () => clearInterval(interval);
  }, [storedRefreshToken]);

  const signUp = async (username, password) => {
    try {
      const { data } = await register({ variables: { username, password } });
      localStorage.setItem("token", data.register.token);
      localStorage.setItem("refreshToken", data.register.refreshToken);
      setToken(data.register.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const logIn = async (username, password) => {
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("refreshToken", data.login.refreshToken);
      setToken(data.login.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setToken("");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, logIn, logOut, signUp, refreshingToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
