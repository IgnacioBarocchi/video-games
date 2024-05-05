import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
  CollisionPayload,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { memo, useRef, useState } from "react";
import { Vector3Tuple } from "three";
import { ZombieModel } from "./model";
import {
  getVector3From,
  goToTarget,
  payloadIsThePlayer,
} from "../../lib/rigibBodyHelper";
import { PositionalAudio } from "@react-three/drei";
import hitByCar from "../../assets/audio/hit-by-car.mp3";
import zombieDeathSound1 from "../../assets/audio/in-game-sfx/zombie/zombie-death-variant-1.m4a";
import zombieDeathSound2 from "../../assets/audio/in-game-sfx/zombie/zombie-death-variant-2.m4a";
import zombieDeathSound3 from "../../assets/audio/in-game-sfx/zombie/zombie-death-variant-3.m4a";
import useGameStore from "../../store/store";
import { throttle } from "../../lib/throttle";
import { ZOMBIE_IMPACT_COST } from "../../constants";
import { useMachine } from "@xstate/react";
import {
  ATTACK_EVENT,
  CHASE_EVENT,
  HIT_EVENT,
  HIT_STATE,
  INACTIVE_STATE,
  enemyMachine,
} from "./machine/zombie-machine";

type Props = {
  position?: Vector3Tuple;
  cameraPhi?: number;
  cameraTheta?: number;
  orientation?: Vector3Tuple;
};

const h = 1.7;
const deathR = 0.05;

export const Zombie = memo(({ position = [0, h + 1, -300] }: Props) => {
  const [state, send] = useMachine(enemyMachine);
  const rigidbody = useRef<RapierRigidBody>(null);
  // const [isActive, setIsActive] = useState(true);
  const carRigidBody = useRef<RapierRigidBody | null>(null);
  const { setCarNotification, subMoney } = useGameStore((gameState) => ({
    setCarNotification: gameState.setCarNotification,
    subMoney: gameState.subMoney,
  }));

  useFrame(() => {
    if (
      !state.matches(INACTIVE_STATE) ||
      !rigidbody.current ||
      !carRigidBody.current ||
      !state.matches(HIT_STATE)
    ) {
      return;
    }

    const params = {
      sourcePosition: getVector3From(rigidbody.current.translation()),
      targetPosition: getVector3From(carRigidBody.current.translation()),
      sourceRigidBody: rigidbody.current,
      style: "LINEAR VELOCITY",
      speed: 200,
    };

    goToTarget(params);
  });

  const triggerIsValid = (payload) =>
    payloadIsThePlayer(payload) && !state.matches(HIT_STATE);
  // const triggerIsValid = (payload: CollisionPayload) => {
  //   const m = payloadIsThePlayer(payload);
  //   const f = !state.matches(HIT_STATE);
  //   if (m) {
  //     console.log(f);
  //   }

  //   return m && f;
  // };

  const handleCollision = throttle((payload: CollisionPayload) => {
    if (!triggerIsValid(payload)) {
      return;
    }

    if (Math.abs(payload.rigidBody?.linvel().z!) > 2) {
      send({ type: HIT_EVENT });
      setCarNotification({ type: "HIT ZOMBIE", cost: ZOMBIE_IMPACT_COST });
      subMoney(ZOMBIE_IMPACT_COST);
    }
  }, 0);

  const triggerNPCOnEnter = throttle((payload: CollisionPayload) => {
    if (!triggerIsValid(payload)) {
      return;
    }

    if (payloadIsThePlayer(payload)) {
      send({ type: ATTACK_EVENT });
    }
  }, 0);

  const triggerNPCOnExit = throttle((payload: CollisionPayload) => {
    if (!triggerIsValid(payload)) {
      return;
    }

    if (payloadIsThePlayer(payload)) {
      send({ type: CHASE_EVENT });
    }
  }, 0);

  const onNPCRegionEnter = throttle((payload: CollisionPayload) => {
    if (!triggerIsValid(payload)) {
      return;
    }

    if (payloadIsThePlayer(payload)) {
      carRigidBody.current = payload.other.rigidBody;
    }
  }, 0);

  const onNPCRegionExit = throttle((payload: CollisionPayload) => {
    if (!triggerIsValid(payload)) {
      return;
    }

    if (payloadIsThePlayer(payload)) {
      carRigidBody.current = null;
    }
  }, 1000);

  if (state.matches(INACTIVE_STATE)) {
    return null;
  }

  return (
    <group>
      <RigidBody
        mass={44}
        density={1}
        friction={1}
        restitution={0.5}
        ref={rigidbody}
        position={position}
        lockRotations
        colliders={false}
      >
        <CapsuleCollider
          name="Zombie body"
          position={[0, state.matches(HIT_STATE) ? deathR : h, 0]}
          args={[
            state.matches(HIT_STATE) ? deathR : h,
            state.matches(HIT_STATE) ? deathR : 0.5,
          ]}
          onCollisionEnter={handleCollision}
        />
        <CylinderCollider
          name="Near"
          sensor
          position={[0, h, 0]}
          args={[h, 3]}
          onIntersectionEnter={triggerNPCOnEnter}
          onIntersectionExit={triggerNPCOnExit}
        />
        <CylinderCollider
          name="Region"
          sensor
          position={[0, h, 0]}
          args={[h, 200]}
          onIntersectionEnter={onNPCRegionEnter}
          onIntersectionExit={onNPCRegionExit}
        />
        {state.matches(HIT_STATE) && (
          <>
            <PositionalAudio
              distance={10}
              url={
                [zombieDeathSound1, zombieDeathSound2, zombieDeathSound3][
                  Math.floor(Math.random() * 3)
                ]
              }
              autoplay
              loop={false}
            />
            <PositionalAudio
              distance={20}
              url={hitByCar}
              autoplay
              loop={false}
              // onEnded={() => {
              //   setTimeout(() => {
              //     setIsActive(false);
              //   }, 1000);
              // }}
            />
          </>
        )}
        <ZombieModel state={state.value} />
      </RigidBody>
    </group>
  );
});
