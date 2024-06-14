import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAuth } from "../../context/AuthContext";

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

const ErrorMessage = styled.p`
  margin-top: 10px;
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
