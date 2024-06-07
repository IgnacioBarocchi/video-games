import { Colors } from "game-constants";
import { styled } from "styled-components";

const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const devices = {
  xs: `(max-width: ${breakpoints.xs})`,
  sm: `(max-width: ${breakpoints.sm})`,
  md: `(max-width: ${breakpoints.md})`,
  lg: `(max-width: ${breakpoints.lg})`,
  xl: `(max-width: ${breakpoints.xl})`,
  "2xl": `(max-width: ${breakpoints["2xl"]})`,
};

const customCSS = `
    // color: ${Colors.white};
    font-family: Technor;
    margin: 0;
    padding: 0;
`;

const ModifiedH1 = styled.h1`
  ${customCSS}
`;
const ModifiedH2 = styled.h2`
  ${customCSS}
`;
const ModifiedH3 = styled.h3`
  ${customCSS}
`;
const ModifiedP = styled.p`
  ${customCSS}
`;
const ModifiedLabel = styled.label`
  ${customCSS}
`;
const ModifiedSpan = styled.span`
  ${customCSS}
`;

export const Heading1 = styled(ModifiedH1)<{ font?: string }>`
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

export const Heading2 = styled(ModifiedH2)<{ font?: string }>`
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

export const Heading3 = styled(ModifiedH3)<{ font?: string }>`
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

export const Span = styled(ModifiedSpan)<{ font?: string }>`
  font-family: ${({ font }) => (font ? font : "Supreme")};
  font-size: 16px;

  @media only screen and ${devices["2xl"]} {
    // color: red;
    font-size: 16px;
  }

  @media only screen and ${devices.xl} {
    // color: green;
    font-size: 16px;
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
