import { styled } from "styled-components";
import { textStandardCssText } from "../constants/text-standard-css-text";
import { devices } from "../constants/devices";

const ModifiedP = styled.p`
  ${textStandardCssText}
`;

export const Paragraph = styled(ModifiedP)<{ font?: string }>`
  font-family: ${({ font }) => (font ? font : "Supreme")};
  font-size: 20px;

  @media only screen and ${devices["2xl"]} {
    // color: red;
    font-size: 20px;
  }

  @media only screen and ${devices.xl} {
    // color: green;
    font-size: 18px;
  }

  @media only screen and ${devices.lg} {
    // color: purple;
    font-size: 16px;
  }

  @media only screen and ${devices.md} {
    // color: pink;
    font-size: 16px;
  }

  @media only screen and ${devices.sm} {
    // color: blue;
    font-size: 16px;
  }

  @media only screen and ${devices.xs} {
    // color: orange;
    font-size: 16px;
  }
`;
