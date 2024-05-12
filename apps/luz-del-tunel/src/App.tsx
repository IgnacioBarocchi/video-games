import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { UILayer } from "./UILayer";
import { LVL1 } from "./LVL1";
import { LobbyTurnTable } from "./lobby-turn-table";
import { World3D } from "./world-3d";
import useGameStore from "./store/store";
import { BROWN, CAMERA_FAR } from "./constants";
import { memo } from "react";
import { Hub } from "hub-screen-frontend";
import { Shooter3DScene } from "shooting-level-frontend";

const Experience = memo(({ gameStarted }) => {
  if (gameStarted) {
    return <LVL1 />;
  }

  return <LobbyTurnTable />;
});

export default function App() {
  // const gameStarted = useGameStore((state) => state.gameStarted);

  return (
    <Shooter3DScene />
    // <Shooter3DScene />
    // <>
    //   <World3D>
    //     <Physics debug={false} gravity={[0, -30, 0]} colliders={false}>
    //       <fog attach="fog" args={["black", 5, CAMERA_FAR]} />
    //       <Experience gameStarted={gameStarted} />
    //     </Physics>
    //   </World3D>
    //   <UILayer />
    // </>
  );
}
{
  /* <fog attach="fog" args={[BROWN, 1, CAMERA_FAR]} /> */
}
