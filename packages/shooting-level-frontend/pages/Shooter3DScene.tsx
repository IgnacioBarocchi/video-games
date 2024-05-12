import { Suspense } from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Canvas } from "@react-three/fiber";
import { PlayerContextProvider } from "../providers/player-context-provider";
import { Player } from "../player";
import { Physics } from "@react-three/rapier";

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

export const Shooter3DScene = () => {
  return (
    <PlayerContextProvider>
      <Canvas
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
          fov: 45,
          near: 0.1,
          far: 9,
          position: [0.2, 2, 5],
          rotation: [0, 0, 0],
        }}
      >
        <Suspense fallback={null}>
          <Physics>
            <Player />
          </Physics>
          <Effects />
        </Suspense>
      </Canvas>
    </PlayerContextProvider>
  );
};
