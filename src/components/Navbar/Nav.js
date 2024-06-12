import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 50px;
  background-color: #1976d2;
  color: white;
`;

const StyledTitle = styled.h1`
  font-size: 1.8rem;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  color: #1976d2;
  border: 2px solid #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  outline: none;

  &:hover {
    background-color: red;
    color: white;
    border-color: red;
  }
`;

const Nav = () => {
  const { logOut, token } = useAuth();
  const [isLogged, setIsLogged] = useState(!!token);

  useEffect(() => {
    setIsLogged(!!token);
  }, [token]);

  return (
    <StyledContainer>
      <StyledTitle>Realtime Sign in Counter</StyledTitle>
      {isLogged && (
        <StyledButton onClick={logOut}>Logout</StyledButton>
      )}
    </StyledContainer>
  );
}

export default Nav;
