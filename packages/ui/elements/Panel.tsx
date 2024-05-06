import { css, keyframes, styled } from "styled-components";

const fadeIn = keyframes`
  from {
    background: black;
    color: black;
  }
  to {
    background: transparent;
    color: white;
  }
`;

const animationRule = css(
  ["", " 5s linear;"] as any as TemplateStringsArray,
  fadeIn
);
export const panelPadding = "3em";
const Container = styled.div<{ fadeIn?: boolean; backgroundCSSText?: string }>`
  position: absolute;
  padding: ${panelPadding};
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  font-family: "Technor";
  user-select: none;
  animation: ${({ fadeIn }) => (fadeIn ? animationRule : "none")};
  background: ${({ backgroundCSSText }) =>
    backgroundCSSText ? backgroundCSSText : "none"};
`;

// repeating-linear-gradient(
//   45deg,
//   #606dbc,
//   #606dbc 10px,
//   #465298 10px,
//   #465298 20px
// );
// ${glassProps}

export const Panel: React.FC<{ children: JSX.Element; fadeIn?: boolean }> = ({
  children,
  fadeIn,
}) => {
  return <Container fadeIn={fadeIn}>{children}</Container>;
};
