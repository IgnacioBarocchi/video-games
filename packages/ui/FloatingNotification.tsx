import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const positionStyles = {
  "top-left": css`
    top: 0;
    left: 0;
    padding
  `,
  "top-center": css`
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  `,
  "top-right": css`
    top: 0;
    right: 0;
  `,
  "bottom-left": css`
    bottom: 0;
    left: 0;
  `,
  "bottom-center": css`
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  `,
  "bottom-right": css`
    bottom: 0;
    right: 0;
  `,
};

const NotificationWrapper = styled.div<{
  fullHeight?: boolean;
  fullWidth?: boolean;
}>`
  position: absolute;
  width: ${({ fullWidth }) => (fullWidth ? "100vw" : "300px")};
  height: ${({ fullHeight }) => (fullHeight ? "100vh" : "auto")};
  overflow: hidden;
  ${({ position }) => positionStyles[position] || positionStyles["top-right"]};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.5s;
  transition: opacity 0.5s;
  padding: 1em;
`;

export const FloatingNotification = ({
  children,
  dismiss,
  position,

  fullHeight,
  fullWidth,
}) => {
  const [isVisible, setIsVisible] = useState(!dismiss);

  useEffect(() => {
    if (dismiss) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [children, dismiss]);

  return (
    <NotificationWrapper
      position={position}
      isVisible={isVisible}
      fullHeight={fullHeight}
      fullWidth={fullWidth}
    >
      {children}
    </NotificationWrapper>
  );
};
