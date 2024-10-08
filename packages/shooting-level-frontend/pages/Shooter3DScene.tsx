import { useState, Suspense } from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Canvas } from "@react-three/fiber";
import { PlayerContextProvider } from "../providers/player-context-provider";
import { Player } from "../player";
import { Physics } from "@react-three/rapier";
import { GroundModel } from "../components/scenario/Ground";
import { OrbitControls, Preload } from "@react-three/drei";
import { NPC } from "../npc";
import { HumanPlayer, PlayerActorProvider, ZombieNPCV2 } from "characters";
import { Scenario } from "../components/scenario";

const Effects = () => {
  return (
    <>
      <fog attach="fog" args={["#02111b", 1, 8.5]} />
      <EffectComposer>
        <Vignette
          offset={0.5}
          darkness={0.5}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
};

export const Shooter3DScene = () => {
  return (
    <PlayerActorProvider>
      <Canvas
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
        }}
        fallback="Shooter 3D Scene"
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
          fov: 50,
          near: 0.1,
          far: 9,
          // far: 3000,
          position: [0.2, 2, 5],
          rotation: [0, 0, 0],
        }}
      >
        {/* <OrbitControls makeDefault={true} enableDamping={true} /> */}
        <Preload all={true} />
        <Suspense fallback={null}>
          <Physics debug={true}>
            <Scenario />
            <HumanPlayer position={[-7, 0, -4]} />
            {/* <ZombieNPCV2 position={[0, 0, 0]} playerContext="HUMAN" /> */}
          </Physics>
          <Effects />
        </Suspense>
      </Canvas>
    </PlayerActorProvider>
  );
};
