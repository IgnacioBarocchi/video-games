import { styled } from "styled-components";

export interface BoxProps {
  children: JSX.Element | JSX.Element[];
  visible?: boolean;
  direction?: "vertical" | "horizontal";
  fullWidth?: boolean;
  fullHeight?: boolean;
  justification?: "space-between" | "space-evenly" | "center";
  alignment?: "center" | "flex-start";
  clickable?: boolean;
}

const Container = styled.div<BoxProps>`
  display: flex;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  height: ${({ fullHeight }) => (fullHeight ? "100%" : "auto")};
  flex-direction: ${({ direction }) =>
    !direction || direction === "horizontal" ? "row" : "column"};
  visibility: ${({ visible }) => (visible ? "auto" : "hidden")};
  justify-content: ${({ justification }) =>
    justification ? justification : "auto"};
  align-items: ${({ alignment }) => (alignment ? alignment : "flex-start")};
  pointer-events: ${({ clickable }) => (clickable ? "all" : "none")};
`;

export const Box: React.FC<BoxProps> = ({
  children,
  visible,
  direction,
  fullWidth,
  fullHeight,
  justification,
  alignment,
  clickable = false,
}) => {
  return (
    <Container
      visible={visible}
      direction={direction}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      justification={justification}
      alignment={alignment}
      clickable={clickable}
    >
      {children}
    </Container>
  );
};
