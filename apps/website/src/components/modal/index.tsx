import { FC, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { Colors } from "../../constants";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(25px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.dialog`
  background-color: ${Colors.richBlack};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 25%;
  border: 1px solid ${Colors.darkGrey};
`;

const CloseButton = styled.button`
  font-size: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border: 1px solid ${Colors.darkGrey};
  background: transparent;
`;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

// Contenedor principal del modal
export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <ModalContainer>
          <ModalContent open={isOpen}>
            <CloseButton onClick={handleClose}>&times;</CloseButton>
            {children}
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};
