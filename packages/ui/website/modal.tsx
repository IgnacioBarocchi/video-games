import styled from "styled-components";
import { FC, ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { Colors } from "game-constants";
import { IoMdCloseCircle } from "react-icons/io";
import { createPortal } from "react-dom";
// todo aria modal
// import { Dialog as AriaDialog } from "react-aria-components";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
  background: rgba(${Colors.richBlack}, 0.25);
  box-shadow: 0 8px 32px 0 rgba(80, 72, 93, 0.37);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

// const Dialog = styled(AriaDialog)`
const Dialog = styled.dialog`
  background-color: ${Colors.richBlack};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid ${Colors.darkGrey};
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 50px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
`;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

const Container: FC<ModalProps> = ({ isOpen, onClose, children }) => {
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

  useLayoutEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      {showModal && (
        <Dialog open={isOpen}>
          <ModalContainer>
            <CloseButton onClick={handleClose}>
              <IoMdCloseCircle />
            </CloseButton>
            {children}
          </ModalContainer>
        </Dialog>
      )}
    </>
  );
};

export const Modal: FC<ModalProps & { portalElement?: HTMLElement }> = ({
  isOpen,
  onClose,
  children,
  portalElement,
}) => {
  return (
    <>
      {createPortal(
        <Container isOpen={isOpen} onClose={onClose}>
          {children}
        </Container>,
        portalElement ?? document.body
      )}
    </>
  );
};
