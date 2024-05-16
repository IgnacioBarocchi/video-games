import { useState } from "react";
import { Hub } from "hub-screen-frontend";
import { Shooter3DScene } from "shooting-level-frontend";
import { CarGameFrontend } from "car-game-frontend";

export default function App() {
  const [pickMission, setPickMission] = useState(false);
  const [missionPicked, setMissionPicked] = useState(false);

  return (
    <>
      {!pickMission && <Hub onStart={() => setPickMission(true)} />}
      {!missionPicked && pickMission && (
        <Shooter3DScene onMissionPicked={() => setMissionPicked(true)} />
      )}
      {missionPicked && <CarGameFrontend />}
    </>
  );
}
