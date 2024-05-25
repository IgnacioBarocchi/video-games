import { World3D } from "../world-3d";
import { CAMERA_FAR } from "game-constants";
import { UILayer } from "../UILayer";
import { Physics } from "@react-three/rapier";
import { LVL1 } from "../LVL1";
import { OrbitControls, Preload } from "@react-three/drei";
import { Perf } from "r3f-perf";

export const CarGameFrontend = ({ setWonTheGame }) => {
  return (
    <>
      <World3D>
        <Perf />
        {/* <OrbitControls makeDefault={true} enableDamping={true} /> */}
        <Preload all={true} />
        <Physics debug={true} gravity={[0, -30, 0]} colliders={false}>
          <fog attach="fog" args={["black", 5, CAMERA_FAR]} />
          <LVL1 setWonTheGame={setWonTheGame} />
        </Physics>
      </World3D>
      <UILayer />
    </>
  );
};
