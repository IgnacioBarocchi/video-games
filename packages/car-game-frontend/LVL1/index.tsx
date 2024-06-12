import { useCallback, useEffect } from "react";

import { CarPlayer, CarPlayerActorProvider } from "characters";
// import { OrbitControls } from "three-stdlib";
import { CAMERA_FAR, ROAD_LENGTH } from "game-constants";
import { Terrain } from "../terrain";
import { ZombieHorde } from "../zombie-horde/zombie-horde";
import useCarGameStore from "../store/store";
import { View, Preload, CameraShake } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";

const config = {
  maxYaw: 0.1, // Max amount camera can yaw in either direction
  maxPitch: 0.1, // Max amount camera can pitch in either direction
  maxRoll: 0.1, // Max amount camera can roll in either direction
  yawFrequency: 0.1, // Frequency of the the yaw rotation
  pitchFrequency: 0.1, // Frequency of the pitch rotation
  rollFrequency: 0.1, // Frequency of the roll rotation
  intensity: 1, // initial intensity of the shake
  decay: false, // should the intensity decay over time
  decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
  controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
};

const Scenario = () => {
  return (
    <>
      <Terrain />
      <ZombieHorde />
    </>
  );
};

export const LVL1 = () => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const setLoading = useCarGameStore(
    useCallback((state) => state.setLoading, [])
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <View.Port />
      <Preload all />
      {/* <CameraShake {...config} /> */}
      {/* <OrbitControls makeDefault={true} enableDamping={true} /> */}
      <Perf position="top-right" />
      <Physics debug={false} gravity={[0, -30, 0]} colliders={false}>
        <fog attach="fog" args={["#02111b", 5, CAMERA_FAR]} />
        <Scenario />
        <CarPlayer
          position={[0, 0.1, ROAD_LENGTH - 50]}
          isRaining={true}
          controlled={!gameOver}
        />
      </Physics>
    </>
  );
};
