import { EffectComposer, Vignette } from "@react-three/postprocessing";

import { AnimatedScene } from "../components/AnimatedScene";
import { BlendFunction } from "postprocessing";
import { Canvas } from "@react-three/fiber";
import { Fisheye } from "@react-three/drei";
import { MainMenu } from "ui";
import React from "react";
import { Suspense } from "react";

const Effects = () => {
  return (
    <>
      <fog attach="fog" args={["#02111B", 1, 8.5]} />
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
    <>
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
        }}
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
          position: [0.3, 1, 3],
          rotation: [0, 0, 0],
        }}
      >
        <Suspense fallback={null}>
          <AnimatedScene />
          <Effects />
        </Suspense>
      </Canvas>
      <MainMenu
        onStartClick={() => {}}
        onQuitClick={() => {}}
        onAboutClick={() => {}}
        lobbyMusic={null}
      />
    </>
  );
};
