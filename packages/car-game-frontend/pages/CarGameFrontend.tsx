import React, { memo } from "react";
import { World3D } from "../world-3d";
import { CAMERA_FAR } from "game-constants";
import { UILayer } from "../UILayer";
import { Physics } from "@react-three/rapier";
import { LVL1 } from "../LVL1";
import { Perf } from "r3f-perf";
import { Preload } from "@react-three/drei";
import { FloatingNotification } from "ui";
import { Clock, MoneyLoss } from "../gui-panels/panel";

const M = memo(({ setWonTheGame }) => (
  <World3D>
    <Perf position="top-right" />
    <Preload all={true} />
    <Physics debug={false} gravity={[0, -30, 0]} colliders={false}>
      <fog attach="fog" args={["black", 5, CAMERA_FAR]} />
      <LVL1 setWonTheGame={setWonTheGame} />
    </Physics>
  </World3D>
));

export const CarGameFrontend = ({ setWonTheGame }) => {
  return (
    <>
      <M setWonTheGame={setWonTheGame} />
      <MoneyLoss />
      <Clock />
    </>
  );
};

/* <OrbitControls makeDefault={true} enableDamping={true} /> */
/* <UILayer /> */
