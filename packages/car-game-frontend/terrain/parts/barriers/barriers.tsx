import * as THREE from "three";

import { FC, useState } from "react";

import {
  BARRIER_IMPACT_COST,
  ENTITY,
  HIGHWAY_X_POSITIONS,
} from "game-constants";
import { Detailed, PositionalAudio } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import concreteImpact from "../../../assets/audio/in-game-sfx/concrete-barrier/impact.m4a";

import useCarGameStore from "../../../store/store";
import { BarrierStandardRes3DModel } from "./barrier-sr-3D-model";
import { BarrierLowRes3DModel } from "./barrier-low-res-3D-model";
import { throttleFunction } from "game-lib";

export const Barrier: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const { registerCrashCount, setCarNotification, subMoney } = useCarGameStore(
    (state) => ({
      registerCrashCount: state.registerCrashCount,
      setCarNotification: state.setCarNotification,
      subMoney: state.subMoney,
    })
  );

  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const handleBarrierImpact = throttleFunction((payload) => {
    if (!payload?.other?.rigidBodyObject?.name === ENTITY.CAR) {
      return;
    }

    payload.other.rigidBody.setLinvel(new THREE.Vector3(0, 1, 2), true);
    registerCrashCount();
    setCarNotification({ type: "HIT BARRIER", cost: BARRIER_IMPACT_COST });
    subMoney(BARRIER_IMPACT_COST);
    setShouldPlayAudio(true);

    setTimeout(() => {
      setShouldRender(false);
    }, 500);
  }, 1000);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <RigidBody
        position={position}
        onCollisionEnter={handleBarrierImpact}
        gravityScale={3}
        colliders={false}
      >
        <CuboidCollider position={[0, 0.5, 0]} args={[1, 0.5, 0.2]} />
        <Detailed distances={[1, 50]}>
          <BarrierStandardRes3DModel playAnimation={shouldPlayAudio} />
          <BarrierLowRes3DModel />
        </Detailed>
      </RigidBody>
      {shouldPlayAudio && (
        <PositionalAudio
          // distance={60}
          loop={false}
          url={concreteImpact}
          autoplay={shouldPlayAudio}
        />
      )}
    </>
  );
};

const distance = 20;
const positions = Object.values(HIGHWAY_X_POSITIONS);

export const Barriers = ({ count = 100 }) => {
  let selector = 0;
  let positionZ = 0;
  let offset = 1;

  return (
    <>
      {[...Array(count)].map((_, i) => {
        selector > positions.length - 1 ? (selector = 0) : selector++;
        positionZ = positionZ - offset * distance;
        let positionX = positions[selector];

        offset =
          positionX === HIGHWAY_X_POSITIONS.MIDDLE_TRACK_X ? (offset = -1) : 1;
        return <Barrier key={i} position={[positionX, 0, positionZ]} />;
      })}
    </>
  );
};

// return (
//   <>
//     <EntitiesRegion
//       name="Barriers"
//       depth={2000}
//       ZOffset={400}
//       numberOfEntities={[10, 10]}
//       Entity={Barrier}
//       spaceBetween={{ x: [-15, 15], y: 0 }}
//     />
//   </>
// );

/* {[...Array(25)].map((_, i) => (
  <Barrier
    key={i}
    position={[
      -getBarrierXPosition(),
      0,
      i * -Math.floor(Math.random() * (50 - 25) + 25) - 2,
    ]}
  />
))} */
