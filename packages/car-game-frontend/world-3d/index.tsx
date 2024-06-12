//docs.pmnd.rs/react-three-fiber/advanced/pitfalls#%E2%9C%85-or-react-spring// import { EffectComposer, SSAO } from "@react-three/postprocessing";
// import { BlendFunction } from "postprocessing";
//https: import { Box, CameraShake, Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/offscreen";
import { Physics } from "@react-three/rapier";
import { CAMERA_FAR } from "game-constants";
import { Perf } from "r3f-perf";
import { lazy } from "react";
import { LVL1 } from "../LVL1";
// import { LVL1 } from "../LVL1";

// function Effects() {
//   return (
//     <EffectComposer>
//       <SSAO
//         blendFunction={BlendFunction.NORMAL} // Use NORMAL to see the effect
//         samples={31}
//         radius={5}
//         intensity={30}
//       />
//     </EffectComposer>
//   );
// }

const worker = new Worker(new URL("../workers/worker.jsx", import.meta.url), {
  type: "module",
});

// const LVL1 = lazy(() => import("../LVL1"));

export const World3D = () => {
  return (
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
      fallback={<LVL1 />}
      worker={worker}
    ></Canvas>
  );
};
