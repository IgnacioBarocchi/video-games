// ! build error
/*import SceneWorker from "../../../workers/scene-worker?worker";*/
import { Canvas as OffScreenCanvas } from "@react-three/offscreen";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { AdaptiveDpr, View, Preload, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { EnvironmentV2 } from "../enviroment";
import { ErrorBoundary } from "game-lib";

const config: CanvasProps = {
  style: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
  },
  mode: "concurrent",
  flat: true,
  dpr: [0.1, 1],
  performance: { min: 0.2 },
  frameloop: "always",
  shadows: false,
  gl: {
    logarithmicDepthBuffer: true,
    precision: "lowp",
    powerPreference: "high-performance",
  },
  camera: {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [10, 10, 20],
  },
} as CanvasProps;

// ! build error
/*const worker = new SceneWorker();*/

const PhysicalWorldWrapper = ({
  children,
  debugPhysics,
  debugPerformance,
  orbitControls,
}) => {
  return (
    <>
      <AdaptiveDpr pixelated />
      <View.Port />
      <Preload all />
      {orbitControls && <OrbitControls makeDefault={true} />}
      {debugPerformance && <Perf position="top-right" />}
      <Physics debug={debugPhysics} gravity={[0, -30, 0]} colliders={false}>
        <EnvironmentV2 />
        {children}
      </Physics>
    </>
  );
};

export const GameCanvas = ({
  experimentalCanvas,
  Scene,
  debugPhysics,
  debugPerformance,
  orbitControls,
}) => {
  if (experimentalCanvas) {
    return (
      <ErrorBoundary>
        <OffScreenCanvas
          {...config}
          fallback={
            <PhysicalWorldWrapper
              debugPhysics={debugPhysics}
              debugPerformance={debugPerformance}
              orbitControls={orbitControls}
            >
              <Scene />
            </PhysicalWorldWrapper>
          }
          // ! build error
          /*worker={worker}*/
          worker={null}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Canvas {...config}>
        <PhysicalWorldWrapper
          debugPhysics={debugPhysics}
          debugPerformance={debugPerformance}
          orbitControls={orbitControls}
        >
          <Scene />
        </PhysicalWorldWrapper>
      </Canvas>
    </ErrorBoundary>
  );
};
