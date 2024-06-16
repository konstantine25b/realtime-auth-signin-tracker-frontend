import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styled from "@emotion/styled";
import { UserIcon } from "@heroicons/react/24/solid";
import { Outlet, useNavigate } from "react-router-dom";
import Modal from "./LogoutModal";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 3.125rem;
  background-color: #1976d2;
  color: white;

  @media (max-width: 1200px) {
    padding: 0.3rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 0.3rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.5rem;
  }
`;

const StyledTitle = styled.h1`
  font-size: 1.8rem;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    font-size: 1.6rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const StyledButton = styled.button`
  padding: 0.625rem 1.25rem;
  background-color: ${(props) => (props.primary ? "#1976d2" : "#ffffff")};
  color: ${(props) => (props.primary ? "white" : "#1976d2")};
  border: 0.125rem solid ${(props) => (props.primary ? "#1976d2" : "#ffffff")};
  border-radius: 0.3125rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  outline: none;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => (props.primary ? "#135293" : "red")};
    color: white;
    border-color: ${(props) => (props.primary ? "#135293" : "red")};
  }

  @media (max-width: 1200px) {
    padding: 0.5rem 1rem;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
`;

const FancyUserIcon = styled(UserIcon)`
  width: 1.5rem; /* Adjust the size of the icon */

  @media (max-width: 1200px) {
    width: 1.3rem;
  }

  @media (max-width: 768px) {
    width: 1.2rem;
  }

  @media (max-width: 480px) {
    width: 1rem;
  }
`;

const Nav = () => {
  const { logOut, token, refreshingToken, user } = useAuth();
  const [isLogged, setIsLogged] = useState(!!token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    refreshingToken();
  }, []);

  useEffect(() => {
    setIsLogged(!!token);
  }, [token]);

  const handleUserClick = () => {
    navigate("/user");
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    logOut();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledContainer>
        <StyledTitle onClick={() => navigate("/dashboard")}>
          Realtime Sign in Counter
        </StyledTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          {isLogged && (
            <StyledButton onClick={handleUserClick} primary>
              <FancyUserIcon /> {/* FancyUserIcon with custom styles */}@{user}
            </StyledButton>
          )}
          {isLogged && (
            <StyledButton onClick={handleLogoutClick}>Logout</StyledButton>
          )}
        </div>
      </StyledContainer>
      <Outlet />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Nav;
