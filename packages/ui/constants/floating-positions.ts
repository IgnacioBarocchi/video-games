import { css } from "styled-components";

export const floatingPositions = {
  "top-left": css`
        top: 25px;
        left: 25px;
        padding
      `,
  "top-center": css`
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
  `,
  "top-right": css`
    top: 25px;
    right: 25px;
  `,
  "bottom-left": css`
    bottom: 25px;
    left: 25px;
  `,
  "bottom-center": css`
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
  `,
  "bottom-right": css`
    bottom: 25px;
    right: 25px;
  `,
  center: css`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
