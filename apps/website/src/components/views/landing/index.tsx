import demo from "../../../assets/video/demo.mp4";
import poster from "../../../assets/images/BG4.png";
import { styled } from "styled-components";
import { Colors, FOOTER_HEIGHT } from "../../../constants";
import { useRef, useState } from "react";
import { FaLinux } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { Button } from "ui";
import { Section } from "../../parallax-section";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const FullScreenVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover; /* This ensures the video covers the entire container */
  position: absolute;
  top: 0;
  left: 0;
`;

const VignetteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Ensures the overlay does not interfere with video controls */
  background: radial-gradient(circle, transparent, ${Colors.richBlack} 70%);
`;

const Footer = styled.footer`
  display: flex;
  position: absolute;
  width: calc(100% - 50px - 10px);
  height: ${FOOTER_HEIGHT}px;
  bottom: 25px;
  left: 25px;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PausePlayToggle = styled.button`
  font-size: 36px;
  border: 0;
  outline: none;
  background: transparent;
  cursor: none;
`;

const OSLabels = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-evenly;
`;

const OSLabel = styled.label`
  display: flex;
  gap: 16px;
  font-size: 40px;
  color: white;
  align-items: center;
  @media (max-width: 768px) {
    font-size: 30px;
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
    top: 10%;
    width: 100%;
  }
`;

const Logo = styled.div`
  font-size: 60px;
  @media (max-width: 768px) {
    top: 40px;
  }
`;

const Slogan = styled.div`
  font-size: 48px;
  @media (max-width: 768px) {
    top: 20px;
  }
`;

export const Landing = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videRef = useRef();

  const togglePlay = () => {
    if (videRef?.current) {
      videRef.current[isPlaying ? "pause" : "play"]();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <Section preset="3" heights={{ desktop: "100vh", mobile: "100vh" }}>
      <Container>
        <FullScreenVideo
          ref={videRef}
          autoPlay={true}
          poster={poster}
          playsInline={true}
          loop={true}
          muted={true}
          controls={false}
        >
          <source src={demo} type="video/mp4" />
          Your browser does not support the video tag or the file format of this
          video.
        </FullScreenVideo>
        <VignetteOverlay />
        <MainTextContainer>
          <Logo>LldT</Logo>
          <Slogan>No tenés futuro</Slogan>
          <Button
            style={{
              fontSize: "25px",
              height: "50px",
              borderRadius: "6px",
              background: Colors.richBlack,
              border: "1px solid " + Colors.darkGrey,
              color: "#F1FFFA",
              cursor: "none",
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
          <PausePlayToggle onClick={togglePlay}>
            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
          </PausePlayToggle>
          <OSLabels>
            <OSLabel>
              <FaLinux />
              <span>Linux</span>
            </OSLabel>
            <OSLabel>
              <FaWindows />
              <span>Windows</span>
            </OSLabel>
            <OSLabel>
              <FaApple />
              <span>macOS</span>
            </OSLabel>
          </OSLabels>
          <div style={{ width: "50px", height: "50px" }}></div>
        </Footer>
      </Container>
    </Section>
  );
};
