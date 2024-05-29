import { Ref, ReactNode, forwardRef } from "react";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Vector3 } from "three";
import { ENTITY } from "game-constants";

export interface CarRigidBodyProps {
  children: ReactNode;
  position: Vector3 | [number, number, number];
  userData?: any;
  playerRigidBodyReference: Ref<RapierRigidBody>;
}

const Wheels = () => {
  return (
    <>
      <BallCollider args={[0.25]} position={[0.75, 0.25, 1.5]} />
      <BallCollider args={[0.25]} position={[0.75, 0.25, -1.5]} />
      <BallCollider args={[0.25]} position={[-0.75, 0.25, 1.5]} />
      <BallCollider args={[0.25]} position={[-0.75, 0.25, -1.5]} />
    </>
  );
};

export const CarRigidBody = forwardRef<
  RapierRigidBody,
  Omit<CarRigidBodyProps, "playerRigidBodyReference">
>(({ children, position }, ref) => {
  return (
    <RigidBody
      name={ENTITY.CAR}
      ref={ref}
      position={position}
      lockRotations
      mass={2000}
      density={1500}
      friction={5}
      restitution={0.1}
    >
      <CuboidCollider
        name="Front"
        args={[1, 0.5, 2.25]}
        position={[0, 1.2, -0.2]}
      />
      <Wheels />
      {children}
    </RigidBody>
  );
});
