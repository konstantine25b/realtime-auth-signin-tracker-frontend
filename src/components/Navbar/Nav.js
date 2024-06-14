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
  padding: 5px 50px;
  background-color: #1976d2;
  color: white;
`;

const StyledTitle = styled.h1`
  font-size: 1.8rem;
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.primary ? "#1976d2" : "#ffffff")};
  color: ${(props) => (props.primary ? "white" : "#1976d2")};
  border: 2px solid ${(props) => (props.primary ? "#1976d2" : "#ffffff")};
  border-radius: 5px;
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
`;

const FancyUserIcon = styled(UserIcon)`
  width: 1.5rem; /* Adjust the size of the icon */
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
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {isLogged && (
            <StyledButton onClick={handleUserClick} primary>
              <FancyUserIcon /> {/* FancyUserIcon with custom styles */}
              @{user}
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
