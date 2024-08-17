import { createPortal } from "react-dom";
import { Box, SnappedBoxProps } from "./box2";
import { FC, memo } from "react";
import { IconType } from "react-icons";
import { Colors } from "game-constants";
import { styled } from "styled-components";

const Circle = styled.div`
  border-radius: 50%;
  border: 1px solid ${Colors.white};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface FloatingAlertProps extends SnappedBoxProps {
  Prefix?: IconType;
}

export const FloatingAlert: FC<FloatingAlertProps> = memo((props) => {
  const { children, Prefix, ...restProps } = props;
  return (
    <>
      {createPortal(
        <Box.Snapped
          {...restProps}
          st={{ zIndex: 10 }}
          alignment="center"
          direction="horizontal"
          g="md"
        >
          {Prefix && (
            <Circle>
              <Prefix />
            </Circle>
          )}
          {children}
        </Box.Snapped>,
        document.body
      )}
    </>
  );
});
