import { Suspense } from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { AnimatedScene } from "../components/AnimatedScene";
import { Canvas } from "@react-three/fiber";

const Effects = () => {
  return (
    <>
      <fog attach="fog" args={["black", 1, 8.5]} />
      <EffectComposer>
        <Vignette
          offset={0.5} // vignette offset
          darkness={0.5} // vignette darkness
          eskil={false} // Eskil's vignette technique
          blendFunction={BlendFunction.NORMAL} // blend mode
        />
      </EffectComposer>
    </>
  );
};

export const Hub = () => {
  return (
    <Canvas
      fallback="Hub 3D Objects"
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
        fov: 30,
        near: 0.1,
        far: 9,
        position: [0.2, 1, 3],
        rotation: [0, 0, 0],
      }}
    >
      <Suspense fallback={<div>Loading</div>}>
        <AnimatedScene />
        <Effects />
      </Suspense>
    </Canvas>
  );
};
