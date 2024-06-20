import * as THREE from "three";

import { FC, useCallback, useState } from "react";

import { BARRIER_IMPACT_COST, ENTITY } from "game-constants";
import { Detailed, PositionalAudio } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import concreteImpact from "../../../assets/audio/in-game-sfx/concrete-barrier/impact.m4a";

import useCarGameStore from "../../../store/store";
import { BarrierStandardRes3DModel } from "./barrier-sr-3D-model";
import { BarrierLowRes3DModel } from "./barrier-low-res-3D-model";
import { createOnceFunction, throttleFunction } from "game-lib";

export const Barrier: FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const { setCarNotification, subMoney } = useCarGameStore((state) => ({
    setCarNotification: state.setCarNotification,
    subMoney: state.subMoney,
  }));

  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const registerBarrierCrash = useCallback(
    createOnceFunction((payload) => {
      payload.other.rigidBody.setLinvel(new THREE.Vector3(0, 1, 2), true);
      setCarNotification({ type: "HIT BARRIER", cost: BARRIER_IMPACT_COST });
      subMoney({ type: "HIT BARRIER", cost: BARRIER_IMPACT_COST });
      setShouldPlayAudio(true);

      setTimeout(() => {
        setShouldRender(false);
      }, 500);
    }),
    []
  );

  const handleBarrierImpact = (payload) => {
    if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) {
      return;
    }
    registerBarrierCrash(payload);
  };

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

export default Barrier;
