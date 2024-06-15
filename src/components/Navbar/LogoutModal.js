import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 80%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 70%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 70%;
    padding: 1rem;
  }
`;

const ModalTitle = styled.h2`
  margin-bottom: 1.25rem;
  font-size: 1.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  background-color: ${(props) => (props.primary ? "#d32f2f" : "#ccc")};
  color: ${(props) => (props.primary ? "white" : "#333")};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 1rem;
  font-weight: bold;
  flex: 1;

  &:hover {
    background-color: ${(props) => (props.primary ? "#9a0007" : "#999")};
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
`;

const ModalParagraph = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-evenly;

 
`;

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Confirm Logout</ModalTitle>
        <ModalParagraph>Are you sure you want to logout?</ModalParagraph>
        <ButtonContainer>
          <ModalButton onClick={onConfirm} primary>
            Yes
          </ModalButton>
          <ModalButton onClick={onClose}>No</ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
