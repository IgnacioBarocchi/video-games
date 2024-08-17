import { CSSProperties, FC, ReactNode, memo } from "react";
import styled from "styled-components";
import { floatingPositions } from "../constants/floating-positions";

type JustifyContent = CSSProperties["justifyContent"];
type AlignItems = CSSProperties["alignItems"];
type Position = CSSProperties["position"];
type PointerEvents = CSSProperties["pointerEvents"];
type Width = CSSProperties["width"];
type SemanticSizes = "sm" | "md" | "lg" | "none";

const sizes = {
  none: "0px",
  sm: "8px",
  md: "16px",
  lg: "32px",
  auto: "auto",
};

const skins = {
  glass: `box-shadow: 0 8px 32px 0 rgba(80, 72, 93, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);`,
};

/**
 * @typedef {Object} BoxProps
 * @property {ReactNode} children - The content of the box.
 * @property {boolean} [visible] - Visibility of the box.
 * @property {"vertical" | "horizontal"} [direction] - Flex direction alias.
 * @property {JustifyContent} [justification] - Justify content.
 * @property {AlignItems} [alignment] - Align items alias.
 * @property {PointerEvents | "auto"} [pointerEvents] - Pointer events alias.
 * @property {SemanticSizes | "auto"} [p] - Padding alias.
 * @property {SemanticSizes | "auto"} [g] - Gap alias.
 * @property {Position | "auto"} [position] - Position.
 * @property {Width} [width] - Width of the box.
 */
export interface BoxProps {
  children: ReactNode;
  visible?: boolean;
  direction?: "vertical" | "horizontal";
  justification?: JustifyContent;
  alignment?: AlignItems;
  pointerEvents?: PointerEvents | "auto";
  p?: SemanticSizes | "auto";
  g?: SemanticSizes | "auto";
  position?: Position | "auto";
  width?: Width;
  st?: CSSProperties;
  skin?: keyof typeof skins;
}

const FlexContainer = styled.div<Omit<BoxProps, "st">>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === "vertical" ? "column" : "row"};
  justify-content: ${({ justification }) => justification};
  align-items: ${({ alignment }) => alignment};
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  position: ${({ position }) => position};
  padding: ${({ p }) => sizes[p]};
  gap: ${({ g }) => sizes[g]};
  width: ${({ width }) => width};
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  ${({ skin }) => (skin ? skins[skin] : "")};
`;

const Core: FC<BoxProps> = ({
  visible = true,
  direction = "horizontal",
  justification = "auto",
  alignment = "auto",
  pointerEvents = "auto",
  position = "auto",
  g = "sm",
  p = "sm",
  width = "auto",
  skin = "",
  st = {},
  children,
}) => {
  return (
    <FlexContainer
      visible={visible}
      direction={direction}
      justification={justification}
      alignment={alignment}
      pointerEvents={pointerEvents}
      position={position}
      width={width}
      g={g}
      p={p}
      style={st}
      skin={skin}
    >
      {children}
    </FlexContainer>
  );
};

const flexDefaultProps = {
  p: "sm",
  g: "sm",
  direction: "horizontal",
  justification: "auto",
  alignment: "auto",
  visible: true,
  st: {},
};

const floatingViewDefaultProps = {
  position: "absolute",
  pointerEvents: "none",
  width: "300px",
  ...flexDefaultProps,
};

const webBoxDefaultProps = {
  position: "auto",
  pointerEvents: "all",
  width: "auto",
  ...flexDefaultProps,
};

export interface SnappedBoxProps extends BoxProps {
  place: keyof typeof floatingPositions;
}

const FloatingView: FC<BoxProps> = (props) => {
  const { children, ...restProps } = props;
  return (
    // @ts-ignore
    <Core {...{ ...floatingViewDefaultProps, ...restProps }}>{children}</Core>
  );
};

const Web: FC<BoxProps> = (props) => {
  const { children, ...restProps } = props;
  return (
    // @ts-ignore
    <Core {...{ ...webBoxDefaultProps, ...restProps }}>{children}</Core>
  );
};

// @ts-expect-error
const SnappedFloatingElement = styled<SnappedBoxProps>(FlexContainer)`
  ${({
    // @ts-expect-error
    place,
  }) => floatingPositions[place] || floatingPositions["bottom-left"]}
`;

const Snapped: FC<BoxProps> = (props) => {
  const { children, ...restProps } = props;
  return (
    // @ts-ignore
    <SnappedFloatingElement {...{ ...floatingViewDefaultProps, ...restProps }}>
      {children}
    </SnappedFloatingElement>
  );
};

export const Box = {
  FloatingView: memo(FloatingView),
  Web: memo(Web),
  Snapped: memo(Snapped),
  Core: memo(Core),
};
