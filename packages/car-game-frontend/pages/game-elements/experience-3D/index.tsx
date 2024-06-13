import SceneWorker from "../../../workers/worker?worker";
import { Canvas as OffScreenCanvas } from "@react-three/offscreen";
import { Component } from "react";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { AdaptiveDpr, View, Preload, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { Environment } from "../enviroment";

const config: CanvasProps = {
  style: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
  },
  // @ts-ignore
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
};

// const worker = new Worker(new URL("../workers/worker.jsx", import.meta.url), {
//   type: "module",
// });

// const LVL1 = lazy(() => import("../LVL1"));

const worker = new SceneWorker();

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>MMM algo anda muy mal.</h1>;<div>{this.state.error}</div>
        </>
      );
    }
    return this.props.children;
  }
}

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
        <Environment />
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
        worker={worker}
      />
    </ErrorBoundary>;
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
