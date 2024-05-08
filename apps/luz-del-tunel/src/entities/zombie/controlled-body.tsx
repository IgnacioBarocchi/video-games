import { useFrame } from "@react-three/fiber";
import {
  RapierRigidBody,
  CapsuleCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { forwardRef, memo, useRef } from "react";
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
  forwardRef(
    (
      {
        children,
        position,
        isHit,
        handleChasePlayer,
        handleAttackPlayer,
        handleHitByPlayer,
        handleRegisterPlayer,
        handleUnregisterPlayer,
      },
      references
    ) => {
      // const rigidBody = useRef<RapierRigidBody>(null);
      // const references.current?.carRigidBody = useRef<RapierRigidBody | null>(null);

      useFrame(() => {
        if (
          isHit ||
          !references?.current?.zombieRigidBody.current ||
          !references.current?.carRigidBody.current
        ) {
          return;
        }

        const params = {
          sourcePosition: getVector3From(
            references.current.zombieRigidBody.current.translation()
          ),
          targetPosition: getVector3From(
            references.current?.carRigidBody?.current.translation()
          ),
          sourceRigidBody: references.current.zombieRigidBody.current,
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
          ref={references.current.zombieRigidBody}
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
            onIntersectionEnter={handleRegisterPlayer}
            onIntersectionExit={handleUnregisterPlayer}
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
  )
);
