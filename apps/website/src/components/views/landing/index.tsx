import demo from "../../../assets/video/demo.mp4";
import poster from "../../../assets/images/BG4.png";
import { styled } from "styled-components";
import {
  FOOTER_HEIGHT,
  LINUX_LINK,
  MAC_LINK,
  WINDOWS_LINK,
} from "../../../constants";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaLinux } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { Button } from "ui";
import { Section } from "../../parallax-section";
import wheelImageFile from "../../../../public/Wheel.png";
import { Colors } from "game-constants";
import image from "../../../assets/images/BG3.png";
import useReleaseData from "../../../hooks/use-release-data";
import { Loading } from "../../loading/loading";
import { HTTPError } from "../../error/error";

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

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  width: calc(100% - 50px - 10px);

  @media (max-width: 768px) {
    height: content-fit;
    width: 100%;
    flex-direction: column;
  }
`;

const PausePlayToggle = styled.button`
  font-size: 36px;
  border: 0;
  outline: none;
  background: transparent;
`;
// cursor: none;

const OSLabels = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    font-size: 30px;
    width: 100%;
  }
`;

const OSLabel = styled.label`
  display: flex;
  gap: 16px;
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

// const ImageLogo = styled.img`
//   position: absolute;
//   width: 150px;
//   top: -25px;
// `;

const Quote = styled.div`
  font-family: Tanker;
  font-size: 50px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

const Author = styled.div`
  font-family: Supreme;
  font-size: 25px;
`;

const OSText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Quotes = () => {
  const [quotesIndex, setQuotesIndex] = useState(0);
  const quotes = useMemo(
    () => [
      {
        quote: "Está re bueno el ruidito de cuando pisa al zombie",
        author: "Un amigo",
      },
      {
        quote: "Los gráficos no son importantes si el juego es bueno",
        author: "Otro amigo",
      },
      {
        quote: "Los controles y la física se sienten bien",
        author: "Otro amigo",
      },
      {
        quote: "Me anda bastante bug jeje",
        author: "Otro amigo",
      },
      {
        quote: "El juego está muy bueno",
        author: "Chat GPT",
      },
      {
        quote: "Jajaja corte Carmageddon",
        author: "Otro amigo",
      },
    ],
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuotesIndex((prev) => {
        const next = prev + 1;
        if (next >= quotes.length) {
          return 0;
        }
        return next;
      });
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [quotes.length]); // Ensure effect runs only once by providing quotes.length

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "calc(100% - 50px)",
        padding: "25px 0",
      }}
    >
      <Quote>"{quotes[quotesIndex].quote}"</Quote>
      <Author>-{quotes[quotesIndex].author}</Author>
    </div>
  );
};

export const Landing = () => {
  const {
    data: { windows, linux, mac },
    error,
    loading,
  } = useReleaseData();

  const [isPlaying, setIsPlaying] = useState(true);
  const videRef = useRef();

  const togglePlay = () => {
    if (videRef?.current) {
      videRef.current[isPlaying ? "pause" : "play"]();
    }
    setIsPlaying((prev) => !prev);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <HTTPError />;
  }

  return (
    <Section
      image={image}
      preset="3"
      heights={{ desktop: "100vh", mobile: "100vh" }}
    >
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
              // cursor: "none",
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
          <Buttons>
            <PausePlayToggle onClick={togglePlay}>
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </PausePlayToggle>
            <OSLabels>
              <OSLabel as="a" href={linux.endpoint ?? ""} target="_blank">
                <FaLinux />
                <OSText>Linux</OSText>
              </OSLabel>
              <OSLabel as="a" href={windows.endpoint ?? ""} target="_blank">
                <FaWindows />
                <OSText>Windows</OSText>
              </OSLabel>
              <OSLabel as="a" href={mac.endpoint ?? ""} target="_blank">
                <FaApple />
                <OSText>macOS</OSText>
              </OSLabel>
            </OSLabels>
            <div
              style={{ width: "50px", height: "50px", visibility: "hidden" }}
            ></div>
          </Buttons>
          <Quotes />
        </Footer>
      </Container>
    </Section>
  );
};
