import { styled } from "styled-components";
import { FOOTER_HEIGHT } from "../../../constants";
import { useRef } from "react";

import { Section } from "../../parallax-section";
import image from "../../../assets/images/BG3.png";
import { BackgroundVideo, OSButtons, Quotes } from "./elements";
import { Heading1, Heading2 } from "../../responsive-text-content";
import { Button } from "../../button";

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
  height: ${FOOTER_HEIGHT}px;
  width: 100%;
  height: 100%;
  justify-content: center;

  // // position: absolute;
  // // bottom: 15%;
  // // left: 25px;

  // @media (max-width: 576px) {
  // }
  // @media (max-width: 992px) {
  // }
  // @media (max-width: 1200px) {
  // }
  // @media (max-width: 768px) {
  //   left: 0;
  //   width: 100%;
  // }
`;

const MainTextContainer = styled.div`
  // position: absolute;
  // top: 25%;
  // left: 50%;
  // transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  // @media (max-width: 576px) {
  // }
  // @media (max-width: 992px) {
  // }
  // @media (max-width: 1200px) {
  // }
  // @media (max-width: 768px) {
  //   top: 20%;
  //   width: 100%;
  // }
`;

export const Landing = () => {
  const videoRef = useRef();

  return (
    <Section image={image} heights={{ desktop: "100vh", mobile: "100vh" }}>
      <BackgroundVideo ref={videoRef} />
      <Container>
        <MainTextContainer>
          <Heading1
            style={{ width: "100vw", textAlign: "center", marginTop: "100px" }}
          >
            LA LUZ DEL TÚNEL
          </Heading1>
          <Heading2 font="Tanker">NO TENÉS FUTURO</Heading2>
          <Button
            onClick={() => {
              document
                .querySelector("#downloads")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            label="Descargar"
            skin="dark"
          />
        </MainTextContainer>
        <Footer>
          <OSButtons ref={videoRef} />
          <Quotes />
        </Footer>
      </Container>
    </Section>
  );
};
