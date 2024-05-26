import {
  CollisionEnterPayload,
  CollisionPayload,
  IntersectionEnterPayload,
  CylinderCollider as PlayerDetector,
  RapierRigidBody,
} from "@react-three/rapier";

import { FC, MutableRefObject, ReactNode, Ref, forwardRef } from "react";
import { Group, Vector3 } from "three";
import { HumanoidRigidBody } from "../../physics/HumanoidRigidBody";
import { ENTITY } from "game-constants";

const payloadIsThePlayer = (payload: CollisionPayload) =>
  [ENTITY.PLAYER, ENTITY.CAR].includes(payload.other.rigidBodyObject.name);

export interface ControlledZombieBody {
  Zombie3DModelVariant: React.ForwardRefExoticComponent<
    React.RefAttributes<{
      props: JSX.IntrinsicElements["group"];
      group: MutableRefObject<Group>;
    }>
  >;
  position: Vector3 | [number, number, number];
  gameContext: "SHOOTER" | "CAR GAME";
  engagePlayer: Function;
  chasePlayer: Function;
  attackPlayer: Function;
  goIdle: Function;
  playerImpactHandler: Function;
  ref: Ref<RapierRigidBody>;
  children?: ReactNode;
}

export const ControlledZombieBody = forwardRef<
  RapierRigidBody,
  Omit<ControlledZombieBody, "ref">
>(
  (
    {
      position,
      Zombie3DModelVariant,
      engagePlayer,
      chasePlayer,
      attackPlayer,
      goIdle,
      playerImpactHandler,
      children,
    },
    ref
  ) => {
    return (
      <HumanoidRigidBody
        position={position}
        entity={ENTITY.ZOMBIE}
        ref={ref}
        onBodyCollision={(payload) => {
          if (!payloadIsThePlayer(payload)) {
            return;
          }
          playerImpactHandler(payload);
        }}
        onSensorEnter={(payload) => {
          if (!payloadIsThePlayer(payload)) {
            return;
          }
          attackPlayer(payload);
        }}
        onSensorExit={(payload) => {
          if (!payloadIsThePlayer(payload)) {
            return;
          }
          chasePlayer(payload);
        }}
      >
        <PlayerDetector
          sensor
          name="Region"
          position={[0, 1, 0]}
          args={[1, 25]}
          onIntersectionEnter={(payload) => {
            if (!payloadIsThePlayer(payload)) {
              return;
            }
            engagePlayer(payload);
          }}
          onIntersectionExit={(payload) => {
            if (!payloadIsThePlayer(payload)) {
              return;
            }
            goIdle(payload);
          }}
        />
        <Zombie3DModelVariant />
        {children}
      </HumanoidRigidBody>
    );
  }
);
