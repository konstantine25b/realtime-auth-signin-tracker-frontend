import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    margin-top: 1rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;

  @media (max-width: 1200px) {
    width: 30%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 75%;
  }
  max-width: 300px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.625rem;
  margin-bottom: 0.625rem;
  border: 1px solid #ccc;
  border-radius: 0.3125rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #1976d2;
  }
`;

const StyledButton = styled.button`
  width: 75%;
  max-width: 200px;
  padding: 0.625rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 0.3125rem;
  margin-bottom: 0.3125rem;
  margin-top: 0.3125rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #135293;
  }
`;

const RegisterText = styled.span`
  margin-top: 0.625rem;
  text-decoration: underline;
  color: #1976d2;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #135293;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.625rem;
  color: #c62828;
`;

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    try {
      await signUp(username, password);
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <StyledContainer>
      <h2>Register</h2>
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
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(""); // Clear any previous error message
          }}
          required
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        <StyledButton type="submit">Register</StyledButton>
      </StyledForm>

      <RegisterText onClick={handleLoginClick}>
        Already have an account? Login here
      </RegisterText>
      {error && (
        <ErrorMessage>Registration failed. Please try again.</ErrorMessage>
      )}
    </StyledContainer>
  );
}

export default Register;
