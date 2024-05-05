import { useFrame } from "@react-three/fiber";
import {
  CapsuleCollider,
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

type Props = {
  position?: Vector3Tuple;
  cameraPhi?: number;
  cameraTheta?: number;
  orientation?: Vector3Tuple;
};
const h = 1.7;
const deathR = 0.05;
export const Zombie = memo(
  ({ position = [0, h + 1, -300], orientation = [0, 0, 1] }: Props) => {
    const rigidbody = useRef<RapierRigidBody>(null);
    // const modelRef = useRef<Object3D>(null);
    const [state, setState] = useState("Running");
    const [isActive, setIsActive] = useState(true);
    const carRigidBody = useRef<RapierRigidBody | null>(null);
    const { setCarNotification, subMoney } = useGameStore((state) => ({
      setCarNotification: state.setCarNotification,
      subMoney: state.subMoney,
    }));

    useFrame((_, delta) => {
      if (
        !isActive ||
        !rigidbody.current ||
        !carRigidBody.current ||
        ["Hit", "Attacking"].includes(state)
      ) {
        return;
      }
      const params = {
        sourcePosition: getVector3From(rigidbody.current.translation()),
        targetPosition: getVector3From(carRigidBody.current.translation()),
        speed: 10,
        sourceRigidBody: rigidbody.current,
        style: "LINEAR VELOCITY",
      };
      goToTarget(params);
    });

    const handleCollision = throttle((payload) => {
      if (!payloadIsThePlayer(payload)) {
        return;
      }

      if (Math.abs(payload.rigidBody?.linvel().z) > 10) {
        setState("Hit");
        setCarNotification({ type: "HIT ZOMBIE", cost: ZOMBIE_IMPACT_COST });
        subMoney(ZOMBIE_IMPACT_COST);
      }
    }, 0);

    const triggerNPCOnEnter = throttle((payload) => {
      if (state === "Hit") {
        return;
      }

      if (payloadIsThePlayer(payload)) {
        setState("Attacking");
      }
    }, 0);

    const triggerNPCOnExit = throttle((payload) => {
      if (state === "Hit") {
        return;
      }
      if (payloadIsThePlayer(payload)) {
        setState("Running");
      }
    }, 0);

    const onNPCRegionEnter = throttle((payload) => {
      if (state === "Hit") {
        return;
      }
      if (payloadIsThePlayer(payload)) {
        carRigidBody.current = payload.other.rigidBody;
      }
    }, 0);

    const onNPCRegionExit = throttle((payload) => {
      if (state === "Hit") {
        return;
      }
      if (payloadIsThePlayer(payload)) {
        carRigidBody.current = null;
      }
    }, 1000);

    if (!isActive) {
      return null;
    }

    return (
      <group>
        <RigidBody
          mass={67.9}
          friction={2}
          restitution={0.5}
          ref={rigidbody}
          position={position}
          lockRotations
          colliders={false}
          onCollisionEnter={handleCollision}
        >
          <CapsuleCollider
            name="Zombie body"
            position={[0, state === "Hit" ? deathR : h, 0]}
            args={[
              state === "Hit" ? deathR : h,
              state === "Hit" ? deathR : 0.5,
            ]}
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
          {state === "Hit" && (
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
                onEnded={() => {
                  setTimeout(() => {
                    setIsActive(false);
                  }, 1000);
                }}
              />
            </>
          )}
          <ZombieModel state={state} />
        </RigidBody>
      </group>
    );
  }
);

// mass={174}
// friction={5}
// restitution={0.1}

/* <CylinderCollider
    name='Region'
    sensor
    position={[0, h, 0]}
    args={[h, 200]}
    onIntersectionEnter={(payload) => {
      if (payloadIsCar(payload)) {
        setCarRigidBody(payload.other.rigidBody);
      }
    }}
    onIntersectionExit={(payload) => {
      if (payloadIsCar(payload)) {
        setCarRigidBody(null);
      }
    }}
  /> 
*/

// onContactForce={(payload) => {
//   if (!payloadIsCar(payload)) {
//     return;
//   }
//   console.log(payload.maxForceMagnitude);
//   // a veces es un vector y otras veces es un
//   // valor
//   if (payload.maxForceMagnitude > 1) {
//     setState('Hit');
//   }
// }}
