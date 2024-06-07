import { FC } from "react";
import { CustomCardProps } from "..";
import { styled } from "styled-components";

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

export const ReleaseMetaData: FC<Pick<CustomCardProps, "releaseMetaData">> = ({
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

export const Foreground3D: FC<Pick<CustomCardProps, "Scene">> = ({ Scene }) => (
  <SceneWrapper>
    <Scene />
  </SceneWrapper>
);
