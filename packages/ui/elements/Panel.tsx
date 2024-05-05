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

const Container = styled.div<{ fadeIn: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  pointer-events: none;
  font-family: "Technor";
  user-select: none;
  animation: ${({ fadeIn }) => (fadeIn ? animationRule : "none")};
`;
// ${glassProps}

export const Panel: React.FC<{ children: JSX.Element; fadeIn?: boolean }> = ({
  children,
  fadeIn,
}) => {
  return <Container fadeIn={fadeIn}>{children}</Container>;
};
// const glassProps = `
//   background: rgba(255, 255, 255, 0.25);
//   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
//   backdrop-filter: blur(10px);
//   -webkit-backdrop-filter: blur(10px);
//   border-radius: 10px;
//   border: 1px solid rgba(255, 255, 255, 0.18);
// `;
