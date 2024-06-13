import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
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

const StyledButton = styled.button`
  width: 75%;
  max-width: 200px; /* Set a maximum width to avoid button stretching */
  padding: 10px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;

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

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await signUp(username, password);
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <StyledContainer>
      <h2>Register </h2>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
