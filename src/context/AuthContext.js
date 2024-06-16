import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword(
    $username: String!
    $password: String!
    $newPassword: String!
  ) {
    changePassword(
      username: $username
      password: $password
      newPassword: $newPassword
    ) {
      success
      token
      refreshToken
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
  const storedUser = localStorage.getItem("userReal");
  const [token, setToken] = useState(storedToken || "");
  const [user, setUser] = useState(storedUser || "");
  const navigate = useNavigate();
  const [signOut] = useMutation(SIGN_OUT_MUTATION);
  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const [refreshToken] = useMutation(REFRESH_TOKEN_MUTATION);
  const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION);

  const refreshingToken = useCallback(async () => {
    if (storedRefreshToken) {
      try {
        const { data } = await refreshToken({
          variables: { refreshToken: storedRefreshToken },
        });
        localStorage.setItem("token", data.refreshToken.token);
        setToken(data.refreshToken.token);
      } catch (error) {
        console.log("there was no refreshing token:", error);
        try {
          await signOut();
        } catch (error) {
          console.log("there was no refreshing token so user cann't sign out:", error);
        } finally {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userReal");
          setToken("");
          navigate("/login");
          setUser("");
        }
      }
    }
  }, [refreshToken, storedRefreshToken, navigate, signOut]);

  useEffect(() => {
    const interval = setInterval(refreshingToken, 8* 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshingToken]);

  const signUp = async (username, password) => {
    try {
      const { data } = await register({ variables: { username, password } });
      localStorage.setItem("token", data.register.token);
      localStorage.setItem("refreshToken", data.register.refreshToken);
      localStorage.setItem("userReal", username);
      setToken(data.register.token);
      setUser(username);
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
      localStorage.setItem("userReal", username);
      setToken(data.login.token);
      setUser(username);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const changingPassword = async (password, newPassword) => {
    let token = localStorage.getItem("token");
    let refreshToken = localStorage.getItem("refreshToken");

    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      let username = user;
      const { data } = await changePassword({
        variables: { username, password, newPassword },
      });

      if (data.changePassword.success) {
        localStorage.setItem("token", data.changePassword.token);
        localStorage.setItem("refreshToken", data.changePassword.refreshToken);
        setToken(data.changePassword.token);
        return true;
      } else {
        console.error("Error changing password:", data.changePassword.errors);
        return false;
      }
    } catch (error) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      console.error("Error changing password:", error);
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
      localStorage.removeItem("userReal");
      setToken("");
      navigate("/login");
      setUser("");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        logIn,
        logOut,
        signUp,
        refreshingToken,
        changingPassword,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
