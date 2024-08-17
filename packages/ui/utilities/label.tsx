import { styled } from "styled-components";
import { devices } from "../constants/devices";
import { textStandardCssText } from "../constants/text-standard-css-text";
import { Label as AriaLabel } from "react-aria-components";

// const ModifiedLabel = styled(AriaLabel)`
const ModifiedLabel = styled.label`
  ${textStandardCssText}
`;

export const Label = styled(ModifiedLabel)<{ font?: string }>`
  font-family: ${({ font }) => (font ? font : "Supreme")};
  font-size: 40px;

  @media only screen and ${devices["2xl"]} {
    // color: red;
    font-size: 40px;
  }

  @media only screen and ${devices.xl} {
    // color: green;
    font-size: 35px;
  }

  @media only screen and ${devices.lg} {
    // color: purple;
    font-size: 30px;
  }

  @media only screen and ${devices.md} {
    // color: pink;
    font-size: 30px;
  }

  @media only screen and ${devices.sm} {
    // color: blue;
    font-size: 30px;
  }

  @media only screen and ${devices.xs} {
    // color: orange;
    font-size: 30px;
  }
`;
