import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { UILayer } from "./UILayer";
import { LVL1 } from "./LVL1";
import { LobbyTurnTable } from "./lobby-turn-table";
import { World3D } from "./world-3d";
import useGameStore from "./store/store";
import { BROWN, CAMERA_FAR } from "./constants";
import { memo, useState } from "react";
import { Hub } from "hub-screen-frontend";
import { Shooter3DScene } from "shooting-level-frontend";

export default function App() {
  const [pickMission, setPickMission] = useState(false);
  const [missionPicked, setMissionPicked] = useState(false);

  return (
    <>
      {!pickMission && <Hub onStart={() => setPickMission(true)} />}
      {!missionPicked && pickMission && (
        <Shooter3DScene onMissionPicked={() => setMissionPicked(true)} />
      )}
      {missionPicked && (
        <>
          <World3D>
            <Physics debug={false} gravity={[0, -30, 0]} colliders={false}>
              <fog attach="fog" args={["black", 5, CAMERA_FAR]} />
              <LVL1 />
            </Physics>
          </World3D>
          <UILayer />
        </>
      )}
    </>
  );
}

// const Experience = memo(({ gameStarted }) => {
//   if (gameStarted) {
//     return <LVL1 />;
//   }

//   return <LobbyTurnTable />;
// });

// const gameStarted = useGameStore((state) => state.gameStarted);
