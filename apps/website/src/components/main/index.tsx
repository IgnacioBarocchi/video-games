import { Colors } from "game-constants";
import { keyframes, styled } from "styled-components";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${Colors.richBlack};
  animation: ${fadeOut} 3s forwards;
  pointer-events: none;
  z-index: 10000;
`;

export const Main = styled.main`
  background: ${Colors.richBlack};
  color: ${Colors.white};
  overflow-x: hidden;
  & a {
    color: ${Colors.white};
  }
`;
