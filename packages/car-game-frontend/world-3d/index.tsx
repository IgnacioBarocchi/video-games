//docs.pmnd.rs/react-three-fiber/advanced/pitfalls#%E2%9C%85-or-react-spring
// import { EffectComposer, SSAO } from "@react-three/postprocessing";
// import { BlendFunction } from "postprocessing";
//https: import { Box, CameraShake, Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/offscreen";
import { Component, Suspense, lazy } from "react";
import { LVL1 } from "../LVL1";

const worker = new Worker(new URL("../workers/worker.jsx", import.meta.url), {
  type: "module",
});

// const LVL1 = lazy(() => import("../LVL1"));

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
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

const LazyScene = () => {
  return (
    <Suspense fallback={null}>
      <LVL1 />
    </Suspense>
  );
};

export const World3D = () => {
  return (
    <ErrorBoundary>
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
        }}
        mode={"concurrent"}
        flat
        dpr={[0.2, 1]}
        performance={{ min: 0.2 }}
        frameloop={"always"}
        shadows={false}
        gl={{
          logarithmicDepthBuffer: true,
          precision: "lowp",
          powerPreference: "high-performance",
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [10, 10, 20],
        }}
        fallback={<LazyScene />}
        worker={worker}
      />
    </ErrorBoundary>
  );
};
