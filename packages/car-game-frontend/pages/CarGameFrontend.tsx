import { memo } from "react";
import { OrbitControls, Preload } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  BackToMenuPanel,
  ClockPanel,
  EndGamePanel,
  Filter2DOverlay,
  KMPanel,
  LoadingPanel,
  MoneyLossPanel,
  TitlePanel,
} from "../gui-panels";

import { CAMERA_FAR } from "game-constants";
import { LVL1 } from "../LVL1";
import { Physics } from "@react-three/rapier";
import { World3D } from "../world-3d";
import { CarPlayerActorProvider } from "characters";

{
  /* <Perf position="top-right" />
<Physics debug={false} gravity={[0, -30, 0]} colliders={false}>
  <fog attach="fog" args={["#02111b", 5, CAMERA_FAR]} />
  <LVL1 />
</Physics> */
}
const Experience3D = memo(() => <World3D />);

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
    <KMPanel />
  </div>
);

export const CarGameFrontend = () => {
  return (
    <CarPlayerActorProvider>
      {/* <Filter2DOverlay> */}
      <Experience3D />
      {/* </Filter2DOverlay> */}
      <Experience2D />
    </CarPlayerActorProvider>
  );
};

/* <OrbitControls makeDefault={true} enableDamping={true} /> */
