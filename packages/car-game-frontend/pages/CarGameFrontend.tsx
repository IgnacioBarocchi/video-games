import { World3D } from "../world-3d";
import { CAMERA_FAR } from "game-constants";
import { UILayer } from "../UILayer";
import { Physics } from "@react-three/rapier";
import { LVL1 } from "../LVL1";

export const CarGameFrontend = ({ setWonTheGame }) => {
  return (
    <>
      <World3D>
        <Physics debug={false} gravity={[0, -30, 0]} colliders={false}>
          <fog attach="fog" args={["black", 5, CAMERA_FAR]} />
          <LVL1 setWonTheGame={setWonTheGame} />
        </Physics>
      </World3D>
      <UILayer />
    </>
  );
};
