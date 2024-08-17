import demo from "../../../assets/video/demo.mp4";
import poster from "../../../assets/images/VIDEO_POSTER.png";
import { styled } from "styled-components";
import { FOOTER_HEIGHT } from "../../../constants";
import { VideoHTMLAttributes, useRef } from "react";

import { Section } from "../../parallax-section";
import image from "../../../assets/images/BG3.png";
import { OSButtons } from "./elements";
import { BackgroundVideo } from "ui/website/background-video";
import { Accreditations } from "ui/website/accreditations";
import { Button, Heading } from "ui/utilities";
import { CollaborateModal } from "../../modals/collaborate-modal";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const LandingFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${FOOTER_HEIGHT}px;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Landing = () => {
  const videoRef = useRef<VideoHTMLAttributes<unknown>>();

  return (
    <>
      <CollaborateModal />
      <Section image={image} heights={{ desktop: "100vh", mobile: "100vh" }}>
        <BackgroundVideo.Player
          src={demo}
          type="video/mp4"
          poster={poster}
          ref={videoRef}
        />
        <Container>
          <MainTextContainer>
            <div
              style={{
                width: "100vw",
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              <Heading index="1">LA LUZ DEL TÚNEL</Heading>
            </div>
            <Heading index="2" font="Tanker">
              NO TENÉS FUTURO
            </Heading>
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
          <LandingFooter>
            <OSButtons ref={videoRef} />
            <Accreditations />
          </LandingFooter>
        </Container>
      </Section>
    </>
  );
};
