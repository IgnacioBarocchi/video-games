import Parallax, { Layer } from "react-parallax-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "react-animated-3d-card";
import { FC, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import { Colors } from "game-constants";
import { Label, Paragraph, Span } from "../utilities";

const TitleLabel = styled(Paragraph)<{ position: "R" | "L" }>`
  position: absolute;
  bottom: 60px;
  opacity: 0.5;
  ${({ position }) => (position === "R" ? "right: " : "left: ")}25px;
`;

const TextLabel = styled(Span)<{ position: "R" | "L" }>`
  position: absolute;
  bottom: 25px;
  opacity: 1;
  ${({ position }) => (position === "R" ? "right: " : "left: ")}25px;
`;

const SceneWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
  width: 100%;
  height: 50%;
`;

const TopText = styled.p`
  position: absolute;
  height: object-fit;
  left: 25px;
`;
const MainWrapper = styled.div`
  position: relative;
`;

interface CustomCardProps {
  title: string;
  topText?: string;
  Scene: FC;
  releaseMetaData?: { date: string; releaseID: string };
}

const ReleaseMetaData: FC<Pick<CustomCardProps, "releaseMetaData">> = ({
  releaseMetaData,
}) => {
  if (!releaseMetaData) {
    return null;
  }

  const { date, releaseID } = releaseMetaData;
  return (
    <>
      <div>
        <TitleLabel position="L">Fecha</TitleLabel>
        <TitleLabel position="R">Versión</TitleLabel>
      </div>
      <div>
        <TextLabel position="L">{date}</TextLabel>
        <TextLabel position="R">{releaseID}</TextLabel>
      </div>
    </>
  );
};

export const Foreground3D: FC<
  Pick<CustomCardProps, "Scene"> & { text: string }
> = ({ Scene, text }) => (
  <SceneWrapper>
    <Scene />
    <Label
      style={{
        position: "absolute",
        zIndex: 4,
        bottom: 0,
        fontSize: "30px",
      }}
    >
      {text}
    </Label>
  </SceneWrapper>
);

const DynamicCard = ({ children, isMobile, releaseMetaData }) => {
  const styles = useMemo(
    () => ({
      background: `linear-gradient(to right, ${Colors.d}, ${Colors.l}, ${Colors.d})`,
      width: isMobile ? "calc(100vw - 50px)" : "300px",
      height: isMobile
        ? releaseMetaData
          ? "300px"
          : "200px"
        : releaseMetaData
        ? "400px"
        : "300px",
      border: `1px solid ${Colors.darkGrey}`,
      position: "relative",
      display: "flex",
      justifyContent: isMobile ? "flex-start" : "center",
      alignContent: "center",
      pointerEvents: isMobile ? "none" : "all",
      opacity: "0.8",
      placeContent: "none",
      transform: "none",
      padding: "25px",
    }),
    [isMobile]
  );

  if (isMobile) {
    return <div style={styles}>{children}</div>;
  }

  return (
    <Card
      style={styles}
      cursorPointer={false}
      shineStrength={0.75}
      isStatic={isMobile}
    >
      {children}
    </Card>
  );
};

export const Card3D: FC<CustomCardProps> = ({
  title,
  topText,
  Scene,
  releaseMetaData,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const checkIfMobile = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
  };

  useEffect(() => {
    AOS.init();
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <MainWrapper data-aos={isMobile ? "none" : "fade-up"}>
        <Foreground3D Scene={Scene} text={title} />
        <DynamicCard isMobile={isMobile} releaseMetaData={releaseMetaData}>
          <Label>{topText}</Label>
          <ReleaseMetaData releaseMetaData={releaseMetaData} />
        </DynamicCard>
      </MainWrapper>
    );
  }

  return (
    <Parallax>
      <Layer settings={{ speed: 0.2, type: "translateY" }}>
        <MainWrapper data-aos={isMobile ? "none" : "fade-up"}>
          <Foreground3D Scene={Scene} text={title} />
          <DynamicCard isMobile={isMobile} releaseMetaData={releaseMetaData}>
            <TopText>{topText}</TopText>
            <ReleaseMetaData releaseMetaData={releaseMetaData} />
          </DynamicCard>
        </MainWrapper>
      </Layer>
    </Parallax>
  );
};
