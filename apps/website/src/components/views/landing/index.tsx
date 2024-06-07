import { styled } from "styled-components";
import { FOOTER_HEIGHT } from "../../../constants";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "ui";
import { Section } from "../../parallax-section";
import { Colors } from "game-constants";
import image from "../../../assets/images/BG3.png";
import { BackgroundVideo, OSButtons, Quotes } from "./elements";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: ${FOOTER_HEIGHT}px;
  bottom: 200px;
  left: 25px;
  width: 100%;

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

const MainTextContainer = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  @media (max-width: 768px) {
    top: 20%;
    width: 100%;
  }
`;

const Logo = styled.div`
  font-size: 60px;
  font-family: Technor;
  z-index: 5;
  @media (max-width: 768px) {
    top: 40px;
    font-size: 50px;
  }
`;

const Slogan = styled.div`
  font-family: Tanker;
  font-size: 48px;
  @media (max-width: 768px) {
    top: 20px;
  }
`;

export const Landing = () => {
  const videoRef = useRef();

  return (
    <Section image={image} heights={{ desktop: "100vh", mobile: "100vh" }}>
      <Container>
        <BackgroundVideo ref={videoRef} />
        <MainTextContainer>
          <Logo>LA LUZ DEL TÚNEL</Logo>
          <Slogan>NO TENÉS FUTURO</Slogan>
          <Button
            style={{
              fontSize: "25px",
              height: "50px",
              borderRadius: "6px",
              background: Colors.richBlack,
              border: "1px solid " + Colors.darkGrey,
              color: "#F1FFFA",
            }}
            onClick={() => {
              document
                .querySelector("#downloads")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Descargar
          </Button>
        </MainTextContainer>
        <Footer>
          <OSButtons ref={videoRef} />
          <Quotes />
        </Footer>
      </Container>
    </Section>
  );
};
