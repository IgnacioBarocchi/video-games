import { css, keyframes, styled } from "styled-components";

const fadeIn = keyframes`
  from {
    background: transparent;
  }
  to {
    background: black;
  }
`;

const animationRule = css(
  ["", " 2s linear;"] as any as TemplateStringsArray,
  fadeIn
);

const childrenFadeIn = keyframes`
from {
  opacity: 1;
}
to {
  opacity: 0;
}
`;

const childrenAnimationRule = css(
  ["", " 2s linear;"] as any as TemplateStringsArray,
  childrenFadeIn
);

export const panelPadding = "5%";
const Container = styled.div<{
  fadeIn?: boolean;
  backgroundValueCSSText?: string;
  top?: string;
  left?: string;
  cssText?: string;
  padBox?: boolean;
  width?: string;
  height?: string;
  clickable?: boolean;
}>`
  position: absolute;
  padding: ${({ padBox }) => (padBox ? panelPadding : "none")};
  margin: 0;
  top: ${({ top }) => (top ? top : "0")};
  left: ${({ left }) => (left ? left : "0")};
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  pointer-events: ${({ clickable }) => (clickable ? "all" : "none")};
  font-family: "Technor";
  user-select: none;
  animation: ${({ fadeIn }) => (fadeIn ? animationRule : "none")};
  background: ${({ backgroundValueCSSText }) =>
    backgroundValueCSSText ? backgroundValueCSSText : "none"};
  ${({ cssText }) => (cssText ? cssText : "")};
  & > * {
    animation: ${({ fadeIn }) => (fadeIn ? childrenAnimationRule : "none")};
  }
`;
// & > * {
//   opacity: ${({ fadeIn }) => (fadeIn ? "0" : "1")};
//   color: ${({ fadeIn }) => (fadeIn ? "red" : "white")};
// }
export const Panel: React.FC<{
  children: JSX.Element | JSX.Element[];
  fadeIn?: boolean;
  backgroundValueCSSText?: string;
  top?: string;
  left?: string;
  cssText?: string;
  padBox?: boolean;
  width?: string;
  height?: string;
  clickable?: boolean;
}> = ({
  children,
  fadeIn,
  backgroundValueCSSText,
  top,
  left,
  cssText,
  padBox = true,
  width,
  height,
  clickable = false,
}) => {
  return (
    <Container
      fadeIn={fadeIn}
      backgroundValueCSSText={backgroundValueCSSText}
      top={top}
      left={left}
      cssText={cssText}
      padBox={padBox}
      width={width}
      height={height}
      clickable={clickable}
    >
      {children}
    </Container>
  );
};

export const CenteredPanel = (props) => {
  const { x, y } = props;
  const top = y ? "50%" : "0";
  const left = x ? "50%" : "0";
  const transform = `transform: translateX(${x ? "-50%" : "0"}) translateY(${
    y ? "-50%" : "0"
  });`;

  return (
    <Panel
      top={top}
      left={left}
      cssText={transform}
      width="fit-content"
      height="fit-content"
      padBox={false}
      {...props}
    >
      {props.children}
    </Panel>
  );
};
