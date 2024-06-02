import Parallax, { Layer } from "react-parallax-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "react-animated-3d-card";
import { FC, useEffect, useState } from "react";
import { Colors } from "../../constants";
import { styled } from "styled-components";
import { CoinsScene } from "../coins-scene";

const TitleLabel = styled.label<{ position: "R" | "L" }>`
  color: white;
  position: absolute;
  bottom: 60px;
  opacity: 0.5;
  ${({ position }) => (position === "R" ? "right: " : "left: ")}25px;
`;

const TextLabel = styled.label<{ position: "R" | "L" }>`
  color: white;
  position: absolute;
  bottom: 25px;
  opacity: 1;
  font-size: 25px;
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
  z-index: 4;
  pointer-events: none;
  width: 40%;
  height: 40%;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  pointer-events: all;
  opacity: 0.8;
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

export const CustomCard: FC<CustomCardProps> = ({
  title,
  topText,
  Scene,
  releaseMetaData,
}) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Parallax>
      <Layer settings={{ speed: 0.2, type: "translateY" }}>
        <MainWrapper data-aos="fade-up">
          {/* this is my foreground */}
          <SceneWrapper>
            <Scene />
          </SceneWrapper>
          {/* this is my background */}
          <CardWrapper>
            <Card
              cursorPointer={false}
              shineStrength={0.75}
              style={{
                background: `linear-gradient(to right, ${Colors.d}, ${Colors.l}, ${Colors.d})`,
                width: "300px",
                height: releaseMetaData ? "400px" : "300px",
                border: `1px solid ${Colors.darkGrey}`,
                position: "relative",
              }}
              onClick={() => console.log("Link to...")}
            >
              <p style={{ paddingLeft: "25px" }}>{topText}</p>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    color: "white",
                  }}
                  onClick={console.log("test")}
                >
                  {title}
                </div>
              </div>
              <ReleaseMetaData releaseMetaData={releaseMetaData} />
            </Card>
          </CardWrapper>
        </MainWrapper>
      </Layer>
    </Parallax>
  );
};
