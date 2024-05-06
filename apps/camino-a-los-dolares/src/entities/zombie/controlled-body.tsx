import { useFrame } from "@react-three/fiber";
import {
  RapierRigidBody,
  CapsuleCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { memo, useRef } from "react";
import { PositionalAudio } from "@react-three/drei";

import {
  getVector3From,
  goToTarget,
  payloadIsThePlayer,
} from "../../lib/rigibBodyHelper";
import hitByCar from "../../assets/audio/hit-by-car.mp3";
import zombieDeathSound1 from "../../assets/audio/in-game-sfx/zombie/zombie-death-variant-1.m4a";
import zombieDeathSound2 from "../../assets/audio/in-game-sfx/zombie/zombie-death-variant-2.m4a";
import zombieDeathSound3 from "../../assets/audio/in-game-sfx/zombie/zombie-death-variant-3.m4a";
const h = 1.7;
const deathR = 0.05;

const getZombieHitAudio = () =>
  [zombieDeathSound1, zombieDeathSound2, zombieDeathSound3][
    Math.floor(Math.random() * 3)
  ];

export const ControlledZombieBody = memo(
  ({
    children,
    position,
    isHit,
    handleChasePlayer,
    handleAttackPlayer,
    handleHitByPlayer,
  }) => {
    const rigidBody = useRef<RapierRigidBody>(null);
    const carRigidBody = useRef<RapierRigidBody | null>(null);

    useFrame(() => {
      if (isHit || !rigidBody.current || !carRigidBody.current) {
        return;
      }

      const params = {
        sourcePosition: getVector3From(rigidBody.current.translation()),
        targetPosition: getVector3From(carRigidBody?.current.translation()),
        sourceRigidBody: rigidBody.current,
        style: "LINEAR VELOCITY",
        speed: 200,
      };

      goToTarget(params);
    });

    return (
      <RigidBody
        mass={44}
        density={1}
        friction={1}
        restitution={0.5}
        ref={rigidBody}
        position={position}
        lockRotations
        colliders={false}
      >
        <CapsuleCollider
          name="Zombie body"
          position={[0, isHit ? deathR : h, 0]}
          args={[isHit ? deathR : h, isHit ? deathR : 0.5]}
          onCollisionEnter={handleHitByPlayer}
        />
        <CylinderCollider
          name="Near"
          sensor
          position={[0, h, 0]}
          args={[h, 3]}
          onIntersectionEnter={handleAttackPlayer}
          onIntersectionExit={handleChasePlayer}
        />
        <CylinderCollider
          name="Region"
          sensor
          position={[0, h, 0]}
          args={[h, 200]}
          onIntersectionEnter={(payload) => {
            if (payloadIsThePlayer(payload)) {
              carRigidBody.current = payload.other.rigidBody!;
            }
          }}
          onIntersectionExit={() => {
            carRigidBody.current = null;
          }}
        />
        {isHit && (
          <>
            <PositionalAudio
              distance={10}
              url={getZombieHitAudio()}
              autoplay={true}
              loop={false}
            />
            <PositionalAudio
              distance={20}
              url={hitByCar}
              autoplay={true}
              loop={false}
            />
          </>
        )}
        {children}
      </RigidBody>
    );
  }
);
