import { styled } from "styled-components";
import { Section } from "../../parallax-section";
import imageCarPart from "../../../assets/images/CAR_PART.png";
import imageZombiePart from "../../../assets/images/ZOMBIE_PART.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Heading, Paragraph, Span } from "ui/utilities";
import { Card } from "ui";

const AboutTitle = styled.h1`
  font-family: Tanker;
  font-size: 50px;
`;

const AboutText = styled.div`
  font-size: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Block = styled.div`
  z-index: 5;
  width: 50%;
  box-shadow: 0 8px 32px 0 rgba(80, 72, 93, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin-right: 25px;
  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    margin-right: 0;
    width: 100%;
    height: 100%;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
`;

const ZombieImagePart = styled.div`
  position: absolute;
  top: 0;
  left: 5%;
  height: 100vh;
  width: 500px;
  background-image: url(${imageZombiePart});
  background-size: cover;
  background-position-y: center;
  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
  @media (max-width: 768px) {
    margin-left: 0;
    width: 100vw;
  }
`;

const A = () => {
  return (
    <Card.Wrapper>
      <Card.Header title="YA FUE, NO TENÉS FUTURO" />
      <Card.Content
        paragraph="En un mundo devastado por un apocalipsis zombie, tu misión es simple
          pero desafiante: ¡sobrevivir! Viaja a través de la provincia de Buenos
          Aires enfrentando peligros en cada esquina. Tu vehículo es tu mayor
          aliado y deberás cuidarlo como a tu propia vida."
      />
      <Card.Footer text="-Chat GPT" />
    </Card.Wrapper>
  );
};
const Boxes = () => (
  <ContentWrapper>
    {/* <Block style={{ visibility: "hidden" }}>
      <VideoWrapper data-aos="fade-up">
        <div>video</div>
        <div>cubo</div>
      </VideoWrapper>
    </Block> */}
    <Block>
      <Card.Wrapper>
        <Card.Header title="YA FUE, NO TENÉS FUTURO" />
        <Card.Content
          paragraph="En un mundo devastado por un apocalipsis zombie, tu misión es simple
          pero desafiante: ¡sobrevivir! Viaja a través de la provincia de Buenos
          Aires enfrentando peligros en cada esquina. Tu vehículo es tu mayor
          aliado y deberás cuidarlo como a tu propia vida."
        />
        <Card.Footer text="-Chat GPT" />
      </Card.Wrapper>
      {/* <VideoWrapper>
        <Heading index="2" font="Tanker">
          YA FUE, NO TENÉS FUTURO
        </Heading>
        <Paragraph>
          En un mundo devastado por un apocalipsis zombie, tu misión es simple
          pero desafiante: ¡sobrevivir! Viaja a través de la provincia de Buenos
          Aires enfrentando peligros en cada esquina. Tu vehículo es tu mayor
          aliado y deberás cuidarlo como a tu propia vida.
        </Paragraph>
        <Span>-Chat GPT</Span>
      </VideoWrapper> */}
    </Block>
  </ContentWrapper>
);

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  top: 0;
`;

export const ViewTrailer = () => {
  useEffect(() => {
    AOS.init({
      offset: 500,
      delay: 0,
      duration: 3000,
      easing: "ease",
      once: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Section
        image={imageCarPart}
        heights={{ desktop: "100vh", mobile: "100vh" }}
      >
        <Wrapper>
          <Boxes />
          <ZombieImagePart data-aos="fade-left" />
        </Wrapper>
      </Section>
    </div>
  );
};
