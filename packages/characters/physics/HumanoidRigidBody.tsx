import { Ref, ReactNode, forwardRef } from "react";
import {
  CapsuleCollider,
  CollisionEnterHandler,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Vector3 } from "three";
import { ENTITY } from "game-constants";

export interface HumanoidRigidBodyProps {
  children: ReactNode;
  position: Vector3 | [number, number, number];
  entity: typeof ENTITY.PLAYER | typeof ENTITY.ZOMBIE;
  userData?: any;
  playerRigidBodyReference: Ref<RapierRigidBody>;
  onBodyCollision?: CollisionEnterHandler;
  onSensorEnter?: CollisionEnterHandler;
  onSensorExit?: CollisionEnterHandler;
}

export const HumanoidRigidBody = forwardRef<
  RapierRigidBody,
  Omit<HumanoidRigidBodyProps, "playerRigidBodyReference">
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
      >
        <CapsuleCollider
          args={[0.6, 0.2]}
          position={[0, 0.8, 0]}
          onCollisionEnter={onBodyCollision}
        />
        <CylinderCollider
          sensor
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

export default HumanoidRigidBody;
