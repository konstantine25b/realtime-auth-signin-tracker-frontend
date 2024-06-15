import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAuth } from "../../context/AuthContext";

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
    width: 35%;
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
  max-width: 200px; /* Set a maximum width to avoid button stretching */
  padding: 0.625rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 0.3125rem;
  margin-bottom: 0.3125rem;
  margin-top: 0.3125rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.625rem;

  &:hover {
    background-color: #135293;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.625rem;
  color: #c62828;
`;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const { changingPassword, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    try {
      await changingPassword(currentPassword, newPassword);
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      alert("Error changing password: " + error.message);
    }
  };

  return (
    <StyledContainer>
      <h2>Change Password</h2>
      <h3>Username: {user}</h3>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <StyledInput
          type="password"
          placeholder="New Password (at least 8 characters)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          pattern=".{8,}" // Minimum 8 characters
          title="New password must be at least 8 characters long."
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <StyledButton type="submit">Change Password</StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default ChangePassword;
