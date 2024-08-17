import { Colors } from "game-constants";
import { styled } from "styled-components";
import { devices } from "../constants/devices";
import { Label } from "./label";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { useMemo } from "react";
import { gap } from "../constants/gap";

const OSLabel = styled.label`
  display: flex;
  gap: ${gap};
  font-size: 40px;
  align-items: center;
  &:hover {
    text-shadow: 0px 0px 18px ${Colors.white};
    // text-shadow:box-shadow: 0px 0px 18px 6px ${Colors.white};
    & > svg {
      // box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
      //   0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
  }

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const OSName = styled(Label)`
  @media only screen and ${devices.sm} {
    display: none;
  }
`;

export const OSBadge = ({
  os,
  linkTo,
}: {
  os: "Linux" | "Windows" | "macOs";
  linkTo?: string;
}) => {
  const Component = useMemo(
    () =>
      ({
        Linux: FaLinux,
        Windows: FaWindows,
        macOs: FaApple,
      }[os]),
    []
  );

  const linkProps = linkTo
    ? {
        as: "a",
        href: linkTo,
        target: "_blank",
      }
    : {};

  return (
    <OSLabel {...linkProps}>
      <Component />
      <OSName>{os}</OSName>
    </OSLabel>
  );
};
