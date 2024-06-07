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

  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    height: ${({ heights }) => heights.mobile};
  }
`;

export const Section: FC<{
  children: ReactNode | ReactNode[] | FC;
  id?: string;
  image: string;
  heights: { desktop: string; mobile: string };
}> = ({ children, id, heights, image }) => {
  return (
    <Container id={id} heights={heights}>
      <Layer
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
        }}
        settings={{ speed: 0.3 }}
      >
        {children}
      </Layer>
    </Container>
  );
};
