import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1976d2;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`;

const StyledButton = styled.button`
  width: 75%;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 5px;
  margin-top: 5px;
  &:hover {
    background-color: #135293;
  }
`;

const RegisterText = styled.span`
  margin-top: 10px;
  text-decoration: underline;
  color: #1976d2;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #135293;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 10px;
  color: #c62828;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { logIn } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(username, password);
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <StyledContainer>
      <h2>Login</h2>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <StyledInput
          type="password"
          placeholder="Password (at least 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          pattern=".{8,}" // Minimum 8 characters
          title="Password must be at least 8 characters long."
        />
        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
      <RegisterText onClick={handleRegisterClick}>
        Don't have an account? Sign up here
      </RegisterText>
      {error && (
        <ErrorMessage>
          Username or password is incorrect. Please try again.
        </ErrorMessage>
      )}
    </StyledContainer>
  );
}

export default Login;
