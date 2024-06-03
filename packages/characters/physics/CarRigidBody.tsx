import { Ref, ReactNode, forwardRef, useState, useRef } from "react";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Vector3 } from "three";
import { ENTITY } from "game-constants";
import { WaterAttachment3DModel } from "../players/car-player/water-attachment-3D-model";

export interface CarRigidBodyProps {
  children: ReactNode;
  position: Vector3 | [number, number, number];
  userData?: any;
  playerRigidBodyReference: Ref<RapierRigidBody>;
}

const Wheels = () => {
  const wheelsAttachmentReferences = useRef({
    frontLeft: useRef(),
    frontRight: useRef(),
    backLeft: useRef(),
    backRight: useRef(),
  });

  return (
    <>
      <BallCollider
        name="Front Left"
        onContactForce={(payload) => {
          wheelsAttachmentReferences.current.frontLeft.current.visible =
            payload.other.rigidBodyObject.name === ENTITY.GRASS;
        }}
        args={[0.25]}
        position={[0.75, 0.25, 1.5]}
      />
      <WaterAttachment3DModel
        name="Front Left"
        ref={wheelsAttachmentReferences.current.frontLeft}
        position={[0, 0, 1.5]}
      />
      <BallCollider
        name="Back Left"
        onContactForce={(payload) => {
          wheelsAttachmentReferences.current.backLeft.current.visible =
            payload.other.rigidBodyObject.name === ENTITY.GRASS;
        }}
        args={[0.25]}
        position={[0.75, 0.25, -1.5]}
      />
      <WaterAttachment3DModel
        name="Back Left"
        ref={wheelsAttachmentReferences.current.backLeft}
        position={[0, 0, -1.5]}
      />

      <BallCollider
        name="Front Right"
        onContactForce={(payload) => {
          wheelsAttachmentReferences.current.frontRight.current.visible =
            payload.other.rigidBodyObject.name === ENTITY.GRASS;
        }}
        args={[0.25]}
        position={[-0.75, 0.25, 1.5]}
      />
      <WaterAttachment3DModel
        name="Front Right"
        ref={wheelsAttachmentReferences.current.frontRight}
        position={[0, 0, 1.5]}
        scale={new Vector3(-1, 1, 1)}
      />
      <BallCollider
        name="Back Right"
        onContactForce={(payload) => {
          wheelsAttachmentReferences.current.backRight.current.visible =
            payload.other.rigidBodyObject.name === ENTITY.GRASS;
        }}
        args={[0.25]}
        position={[-0.75, 0.25, -1.5]}
      />
      <WaterAttachment3DModel
        name="Back Right"
        ref={wheelsAttachmentReferences.current.backRight}
        position={[0, 0, -1.5]}
        scale={new Vector3(-1, 1, 1)}
      />
    </>
  );

  // const [wheelWetState, setWheelWerState] = useState({
  //   frontLeft: false,
  //   frontRight: false,
  //   backLeft: false,
  //   backRight: false,
  // });

  // return (
  //   <>
  //     <BallCollider
  //       name="Front Left"
  //       onContactForce={(payload) => {
  //         setWheelWerState((prev) => {
  //           return {
  //             ...prev,
  //             frontLeft: payload.other.rigidBodyObject.name === ENTITY.GRASS,
  //           };
  //         });
  //       }}
  //       args={[0.25]}
  //       position={[0.75, 0.25, 1.5]}
  //     />
  //     <WaterAttachment3DModel
  //       name="Front Left"
  //       visible={wheelWetState.frontRight}
  //       position={[0, 0, 1.5]}
  //     />
  //     <BallCollider
  //       name="Back Left"
  //       onContactForce={(payload) => {
  //         setWheelWerState((prev) => {
  //           return {
  //             ...prev,
  //             backLeft: payload.other.rigidBodyObject.name === ENTITY.GRASS,
  //           };
  //         });
  //       }}
  //       args={[0.25]}
  //       position={[0.75, 0.25, -1.5]}
  //     />
  //     <WaterAttachment3DModel
  //       name="Back Left"
  //       visible={wheelWetState.backLeft}
  //       position={[0, 0, -1.5]}
  //     />

  //     <BallCollider
  //       name="Front Right"
  //       onContactForce={(payload) => {
  //         setWheelWerState((prev) => {
  //           return {
  //             ...prev,
  //             frontRight: payload.other.rigidBodyObject.name === ENTITY.GRASS,
  //           };
  //         });
  //       }}
  //       args={[0.25]}
  //       position={[-0.75, 0.25, 1.5]}
  //     />
  //     <WaterAttachment3DModel
  //       name="Front Right"
  //       visible={wheelWetState.frontRight}
  //       position={[0, 0, 1.5]}
  //       scale={new Vector3(-1, 1, 1)}
  //     />
  //     <BallCollider
  //       name="Back Right"
  //       onContactForce={(payload) => {
  //         setWheelWerState((prev) => {
  //           return {
  //             ...prev,
  //             backRight: payload.other.rigidBodyObject.name === ENTITY.GRASS,
  //           };
  //         });
  //       }}
  //       args={[0.25]}
  //       position={[-0.75, 0.25, -1.5]}
  //     />
  //     <WaterAttachment3DModel
  //       name="Back Right"
  //       visible={wheelWetState.backRight}
  //       position={[0, 0, -1.5]}
  //       scale={new Vector3(-1, 1, 1)}
  //     />
  //   </>
  // );
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
