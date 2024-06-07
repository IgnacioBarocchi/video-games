import { FaLinux } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import demo from "../../../../assets/video/demo.mp4";
import poster from "../../../../assets/images/VIDEO_POSTER.png";
import { styled } from "styled-components";
import { Colors } from "game-constants";
import { Suspense, forwardRef, useEffect, useMemo, useState } from "react";
import useReleaseData from "../../../../hooks/use-release-data";
import { Loading } from "../../../loading/loading";
import { HTTPError } from "../../../error/error";
import {
  Heading3,
  Label,
  Paragraph,
  devices,
} from "../../../responsive-text-content";

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

const Fallback = styled.div`
  background: ${Colors.richBlack};
  height: 100vh;
  width: 100vw;
`;

export const BackgroundVideo = forwardRef(({}, ref) => {
  return (
    <Suspense fallback={<Fallback />}>
      <FullScreenVideo
        ref={ref}
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
    </Suspense>
  );
});

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  width: calc(100% - 50px - 10px);

  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
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
  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
  }
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

  @media (max-width: 576px) {
  }
  @media (max-width: 992px) {
  }
  @media (max-width: 1200px) {
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

export const OSButtons = forwardRef(({}, ref) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const {
    data: { windows, linux, mac },
    error,
    loading,
  } = useReleaseData();

  const togglePlay = () => {
    if (ref?.current) {
      ref.current[isPlaying ? "pause" : "play"]();
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
    <Buttons>
      <PausePlayToggle onClick={togglePlay}>
        {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
      </PausePlayToggle>
      <OSLabels>
        <OSLabel as="a" href={linux.endpoint ?? ""} target="_blank">
          <FaLinux />
          <OSName>Linux</OSName>
        </OSLabel>
        <OSLabel as="a" href={windows.endpoint ?? ""} target="_blank">
          <FaWindows />
          <OSName>Windows</OSName>
        </OSLabel>
        <OSLabel as="a" href={mac.endpoint ?? ""} target="_blank">
          <FaApple />
          <OSName>macOS</OSName>
        </OSLabel>
      </OSLabels>
      <div
        style={{ width: "50px", height: "50px", visibility: "hidden" }}
      ></div>
    </Buttons>
  );
});

export const Quotes = () => {
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
        width: "calc(100vw - 50px)",
        padding: "25px 0",
      }}
    >
      <Heading3 font="Tanker">"{quotes[quotesIndex].quote}"</Heading3>
      <Paragraph font="Supreme">-{quotes[quotesIndex].author}</Paragraph>
    </div>
  );
};
