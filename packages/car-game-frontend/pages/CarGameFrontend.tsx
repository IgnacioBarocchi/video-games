import { LVL1 } from "../levels";
import { CarPlayerActorProvider } from "characters";
import { ProExperience2D } from "./game-elements/experience-2D";
import { GameCanvas } from "./game-elements/experience-3D";
import { Suspense, lazy, memo } from "react";

const Filter2DOverlay = lazy(
  () => import("./game-elements/experience-2D/gui-panels/overlay-panel")
);

export const CarGameFrontend = memo(() => {
  return (
    <CarPlayerActorProvider>
      <Suspense fallback={null}>
        <Filter2DOverlay>
          <GameCanvas
            debugPerformance={true}
            debugPhysics={false}
            experimentalCanvas={false}
            orbitControls={false}
            Scene={() => <LVL1 />}
          />
        </Filter2DOverlay>
      </Suspense>
      <ProExperience2D />
    </CarPlayerActorProvider>
  );
});
