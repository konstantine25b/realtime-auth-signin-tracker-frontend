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
  padding: 30px;
  border-radius: 15px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
`;

const ModalButton = styled.button`
  padding: 12px 25px;
  margin: 10px;
  background-color: ${(props) => (props.primary ? "#d32f2f" : "#ccc")};
  color: ${(props) => (props.primary ? "white" : "#333")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => (props.primary ? "#9a0007" : "#999")};
    color: white;
  }
`;

const ModalParagraph = styled.p`
  margin-bottom: 25px;
  font-size: 1.1rem;
  color: #666;
`;

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Confirm Logout</ModalTitle>
        <ModalParagraph>Are you sure you want to logout?</ModalParagraph>
        <div style={{ display: "flex" }}>
          <ModalButton onClick={onConfirm} primary>
            Yes
          </ModalButton>
          <ModalButton onClick={onClose}>No</ModalButton>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
