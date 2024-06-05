import {
  BackToMenuPanel,
  ClockPanel,
  EndGamePanel,
  Filter2DOverlay,
  LoadingPanel,
  MoneyLossPanel,
  TitlePanel,
} from "../gui-panels";
import { OrbitControls, Preload } from "@react-three/drei";
import React, { memo } from "react";

import { CAMERA_FAR } from "game-constants";
import { EffectComposer } from "@react-three/postprocessing";
import { Fisheye } from "@react-three/drei";
import { LVL1 } from "../LVL1";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { World3D } from "../world-3d";

const Experience3D = memo(() => (
  <World3D>
    <OrbitControls makeDefault={true} enableDamping={true} />
    {/* <Perf position="top-right" /> */}
    <Preload all={true} />
    <Physics debug={false} gravity={[0, -30, 0]} colliders={false}>
      <fog attach="fog" args={["#02111b", 5, CAMERA_FAR]} />
      <LVL1 />
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
