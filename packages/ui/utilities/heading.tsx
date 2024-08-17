import { ReactNode, useMemo } from "react";
import { styled } from "styled-components";
import { devices } from "../constants/devices";
import { textStandardCssText } from "../constants/text-standard-css-text";

const ModifiedH1 = styled.h1`
  ${textStandardCssText}
`;
const ModifiedH2 = styled.h2`
  ${textStandardCssText}
`;
const ModifiedH3 = styled.h3`
  ${textStandardCssText}
`;

const Heading1 = styled(ModifiedH1)<{ font?: string }>`
  font-family: ${({ font }) => (font ? font : "Technor")};
  font-size: 75px;

  @media only screen and ${devices["2xl"]} {
    // color: red;
    font-size: 75px;
  }

  @media only screen and ${devices.xl} {
    // color: green;
    font-size: 60px;
  }

  @media only screen and ${devices.lg} {
    // color: purple;
    font-size: 50px;
  }

  @media only screen and ${devices.md} {
    // color: pink;
    font-size: 40px;
  }

  @media only screen and ${devices.sm} {
    // color: blue;
    font-size: 40px;
  }

  @media only screen and ${devices.xs} {
    // color: orange;
    font-size: 40px;
  }
`;

const Heading2 = styled(ModifiedH2)<{ font?: string }>`
  font-family: ${({ font }) => (font ? font : "Technor")};
  font-size: 65px;

  @media only screen and ${devices["2xl"]} {
    // color: red;
    font-size: 65px;
  }

  @media only screen and ${devices.xl} {
    // color: green;
    font-size: 50px;
  }

  @media only screen and ${devices.lg} {
    // color: purple;
    font-size: 40px;
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

const Heading3 = styled(ModifiedH3)<{ font?: string }>`
  font-family: ${({ font }) => (font ? font : "Technor")};
  font-size: 48px;

  @media only screen and ${devices["2xl"]} {
    // color: red;
    font-size: 40px;
  }

  @media only screen and ${devices.xl} {
    // color: green;
    font-size: 40px;
  }

  @media only screen and ${devices.lg} {
    // color: purple;
    font-size: 30px;
  }

  @media only screen and ${devices.md} {
    // color: pink;
    font-size: 25px;
  }

  @media only screen and ${devices.sm} {
    // color: blue;
    font-size: 25px;
  }

  @media only screen and ${devices.xs} {
    // color: orange;
    font-size: 25px;
  }
`;

export interface HeadingProps {
  index: "1" | "2" | "3";
  font?: string;
  children: ReactNode;
}

export const Heading: FC<HeadingProps> = ({ index = "1", children, font }) => {
  const Component = useMemo(
    () => [() => <></>, Heading1, Heading2, Heading3][Number(index)],
    []
  );

  return <Component font={font}>{children}</Component>;
};
