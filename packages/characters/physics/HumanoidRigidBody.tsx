import { Ref, ReactNode, forwardRef } from "react";
import {
  CapsuleArgs,
  CapsuleCollider,
  CollisionEnterHandler,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Vector3 } from "three";
import { ENTITY } from "game-constants";

const aliveBodyDimensions: CapsuleArgs = [0.6, 0.2];
const deadBodyDimensions: CapsuleArgs = [0.005, 0.005];
const aliveBodyPositionOffset: [number, number, number] = [0, 0.8, 0];
const deadBodyPositionOffset: [number, number, number] = [0, 0.005, 0];

export interface HumanoidRigidBodyProps {
  children: ReactNode;
  position: Vector3 | [number, number, number];
  entity: typeof ENTITY.PLAYER | typeof ENTITY.ZOMBIE;
  userData?: any;
  ref: Ref<RapierRigidBody>;
  onBodyCollision?: CollisionEnterHandler;
  onSensorEnter?: CollisionEnterHandler;
  onSensorExit?: CollisionEnterHandler;
  isDead?: boolean;
}

export const HumanoidRigidBody = forwardRef<
  RapierRigidBody,
  Omit<HumanoidRigidBodyProps, "ref">
>(
  (
    {
      children,
      position,
      entity,
      userData,
      onBodyCollision,
      onSensorEnter,
      onSensorExit,
      isDead = false,
    },
    ref
  ) => {
    return (
      <RigidBody
        name={entity}
        lockRotations={true}
        colliders={false}
        ref={ref}
        position={position}
        userData={userData}
        density={isDead ? 0 : 40}
        mass={isDead ? 0 : 60}
        friction={isDead ? 0 : 2}
      >
        <CapsuleCollider
          name="Body"
          args={isDead ? deadBodyDimensions : aliveBodyDimensions}
          position={isDead ? deadBodyPositionOffset : aliveBodyPositionOffset}
          onCollisionEnter={onBodyCollision}
        />
        <CylinderCollider
          sensor
          name="Proximity sensor"
          args={[0.2, 2]}
          position={[0, 0.5, 0]}
          onIntersectionEnter={onSensorEnter}
          onIntersectionExit={onSensorExit}
        />
        {children}
      </RigidBody>
    );
  }
);
