import { Layer } from "react-parallax-scroll";
import { FlexRow } from "ui";
import "./styles.css";
import { FC, ReactNode, useMemo } from "react";
import { styled } from "styled-components";
import { Colors } from "game-constants";

const Container = styled.section<{
  heights: { desktop: string; mobile: string };
}>`
  height: ${({ heights }) => heights.desktop};
  background: linear-gradient(
    0deg,
    ${Colors.richBlack} 80%,
    ${Colors.darkGrey} 100%
  );

  @media (max-width: 768px) {
    height: ${({ heights }) => heights.mobile};
  }
`;

export const Section: FC<{
  children: ReactNode | ReactNode[] | FC;
  preset: "1" | "2" | "3";
  id?: string;
  heights: { desktop: string; mobile: string };
}> = ({ children, preset = "1", id, heights }) => {
  return (
    <Container id={id} heights={heights}>
      <Layer className={`banner banner-${preset}`} settings={{ speed: 0.3 }}>
        {children}
      </Layer>
    </Container>
  );
};
