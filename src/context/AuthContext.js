import React, { createContext, useContext, useState } from "react";
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
    }
  }
`;
const REGISTER_MUTATION = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken || "");
  const navigate = useNavigate();
  const [signOut] = useMutation(SIGN_OUT_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);

  const signUp = async (username, password) => {
    try {
      const { data } = await register({ variables: { username, password } });
      localStorage.setItem("token", data.register.token);
      setToken(data.register.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error Logging in:", error);
      throw error;
    }
  };

  const logIn = async (username, password) => {
    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem("token", data.login.token);
      setToken(data.login.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error Logging in:", error);
      throw error;
    }
  };

  const logOut = async () => {
    console.log(token)
    try {
      await signOut();
      localStorage.removeItem("token");
      setToken("");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, logIn, logOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
