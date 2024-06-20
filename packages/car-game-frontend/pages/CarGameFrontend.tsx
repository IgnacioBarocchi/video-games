import { LVL1 } from "../levels";
import { CarPlayerActorProvider } from "characters";
import { GameCanvas } from "./game-elements/experience-3D";
import { Suspense, lazy, memo } from "react";
// ! build error

/*
import { wrap } from "react-worker-components";
import GUIWorker from "./game-elements/experience-2D?worker";
const GUIWorkerComponent = wrap(() => new GUIWorker());
*/
const GUIFallback = lazy(() => import("./game-elements/experience-2D"));
const Filter2DOverlay = lazy(
  () => import("./game-elements/experience-2D/gui-panels/overlay-panel")
);

export const CarGameFrontend = memo(() => {
  return (
    <CarPlayerActorProvider>
      <Suspense fallback={null}>
        <Filter2DOverlay>
          <GameCanvas
            experimentalCanvas={false}
            debugPerformance={true}
            debugPhysics={false}
            orbitControls={false}
            Scene={() => <LVL1 />}
          />
        </Filter2DOverlay>
      </Suspense>
      <GUIFallback />
      {/*
      // ! build error
      <Suspense fallback={<GUIFallback />}>
        <GUIWorkerComponent />
      </Suspense> 
      */}
    </CarPlayerActorProvider>
  );
});
