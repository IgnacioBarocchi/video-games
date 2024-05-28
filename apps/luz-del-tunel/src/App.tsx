import { useState } from "react";
import { Hub } from "hub-screen-frontend";
import { Shooter3DScene } from "shooting-level-frontend";
import { CarGameFrontend } from "car-game-frontend";
import { MainProvider } from "game-constants";
import { Stages } from "./Stages";

export default function App() {
  const [pickMission, setPickMission] = useState(false);
  const [missionPicked, setMissionPicked] = useState(false);
  const [wonTheGame, setWonTheGame] = useState(false);

  const restartMissions = () => {
    setPickMission(false);
    setMissionPicked(false);
    setWonTheGame(false);
  };

  return (
    <MainProvider>
      <Stages />
      {/* <CarGameFrontend
        setWonTheGame={() => {
          setTimeout(() => {
            setWonTheGame(true);
            restartMissions();
          }, 10000);
        }}
      /> */}
    </MainProvider>
  );

  return (
    <>
      {!pickMission && !wonTheGame && (
        <Hub onStart={() => setPickMission(true)} />
      )}
      {!missionPicked && pickMission && (
        <Shooter3DScene onMissionPicked={() => setMissionPicked(true)} />
      )}
      {missionPicked && (
        <CarGameFrontend
          setWonTheGame={() => {
            setTimeout(() => {
              setWonTheGame(true);
              restartMissions();
            }, 10000);
          }}
        />
      )}
    </>
  );
}
