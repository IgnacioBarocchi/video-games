import React, { memo } from "react";
import { World3D } from "../world-3d";
import { CAMERA_FAR } from "game-constants";
import { Physics } from "@react-three/rapier";
import { LVL1 } from "../LVL1";
import { Perf } from "r3f-perf";
import { OrbitControls, Preload } from "@react-three/drei";
import {
  BackToMenuPanel,
  ClockPanel,
  EndGamePanel,
  Filter2DOverlay,
  LoadingPanel,
  MoneyLossPanel,
  TitlePanel,
} from "../gui-panels";

const Experience3D = memo(() => (
  <World3D>
    {/* <OrbitControls makeDefault={true} enableDamping={true} /> */}
    {/* <Perf position="top-right" /> */}
    <Preload all={true} />
    <Physics gravity={[0, -30, 0]} colliders={false}>
      <fog attach="fog" args={["black", 5, CAMERA_FAR]} />
      <LVL1 setWonTheGame={() => {}} />
    </Physics>
  </World3D>
));

const Experience2D = () => (
  <div
    style={{
      pointerEvents: "none",
    }}
  >
    <MoneyLossPanel />
    <ClockPanel />
    <LoadingPanel />
    <EndGamePanel />
    <BackToMenuPanel />
    <TitlePanel />
  </div>
);

export const CarGameFrontend = () => {
  return (
    <>
      <Filter2DOverlay>
        <Experience3D />
      </Filter2DOverlay>
      <Experience2D />
    </>
  );
};

/* <OrbitControls makeDefault={true} enableDamping={true} /> */
/* <UILayer /> */
