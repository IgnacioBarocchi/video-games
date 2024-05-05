import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import { UILayer } from "./UILayer";
import { LVL1 } from "./LVL1";
import { LobbyTurnTable } from "./lobby-turn-table";
import { World3D } from "./world-3d";
import useGameStore from "./store/store";
import { BROWN, CAMERA_FAR } from "./constants";

export default function App() {
  const gameStarted = useGameStore((state) => state.gameStarted);
  return (
    <>
      <World3D>
        <Perf />
        <Physics debug={false} gravity={[0, -30, 0]} colliders={false}>
          <fog attach="fog" args={[BROWN, 1, CAMERA_FAR]} />
          {gameStarted ? <LVL1 /> : <LobbyTurnTable />}
        </Physics>
      </World3D>
      <UILayer />
    </>
  );
}

/* <directionalLight
  intensity={2}
  castShadow={false}
  color={PALE_ORANGE}
  position={[-74, 116, -88]}
  shadow-camera-far={50}
  shadow-bias={-0.000001}
  shadow-darkness={0.116}
  // shadow-camera-top={74}
  // shadow-camera-left={-74}
  // shadow-camera-right={74}
  // shadow-camera-bottom={-74}
  // shadow-mapSize-width={1024}
  // shadow-mapSize-height={1024}
/> */
// const Effects = () => {
//   return (
//     <EffectComposer enableNormalPass={false}>
//       {/* inputColorSpace={BROWN} */}
//       <Vignette />
//       {/* <Noise opacity={0.1} /> */}

//       {/* <Pixelation granularity={10} /> */}
//       {/* <DotScreen scale={100} /> */}
//     </EffectComposer>
//   );
// };
