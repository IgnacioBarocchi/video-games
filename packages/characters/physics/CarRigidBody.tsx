import { Ref, ReactNode, forwardRef, useState, useRef } from "react";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Quaternion, Vector3 } from "three";
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

  const createHandler =
    (referenceID: "frontLeft" | "frontRight" | "backLeft" | "backRight") =>
    (payload) => {
      // console.log(
      //   referenceID,
      //   "touching " + payload.other.rigidBodyObject.name
      // );
      const isOnGrass = payload.other.rigidBodyObject.name === ENTITY.GRASS;
      const inSpeedThreshold =
        Math.abs(payload.target.rigidBody.linvel().z) > 35;
      // console.table({ inSpeedThreshold, isOnGrass });
      wheelsAttachmentReferences.current[referenceID].current.visible =
        inSpeedThreshold && isOnGrass;
    };

  return (
    <>
      <BallCollider
        name="Front Left"
        onContactForce={createHandler("frontLeft")}
        args={[0.25]}
        position={[0.75, 0.25, 1.5]}
      />
      <WaterAttachment3DModel
        name="Front Left"
        visible={false}
        ref={wheelsAttachmentReferences.current.frontLeft}
        position={[0, 0, 1.5]}
      />
      <BallCollider
        name="Back Left"
        onContactForce={createHandler("backLeft")}
        args={[0.25]}
        position={[0.75, 0.25, -1.5]}
      />
      <WaterAttachment3DModel
        name="Back Left"
        visible={false}
        ref={wheelsAttachmentReferences.current.backLeft}
        position={[0, 0, -1.5]}
      />

      <BallCollider
        name="Front Right"
        onContactForce={createHandler("frontRight")}
        args={[0.25]}
        position={[-0.75, 0.25, 1.5]}
      />
      <WaterAttachment3DModel
        name="Front Right"
        visible={false}
        ref={wheelsAttachmentReferences.current.frontRight}
        position={[0, 0, 1.5]}
        scale={new Vector3(-1, 1, 1)}
      />
      <BallCollider
        name="Back Right"
        onContactForce={createHandler("backRight")}
        args={[0.25]}
        position={[-0.75, 0.25, -1.5]}
      />
      <WaterAttachment3DModel
        name="Back Right"
        visible={false}
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

const frontWheelsOrigin = 1.5;
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
      friction={5}
      restitution={0.1}
      enabledTranslations={[true, true, true]}
      massProperties={{
        mass: 1500,
        centerOfMass: new Vector3(0, 0, frontWheelsOrigin),
        principalAngularInertia: new Vector3(0, 0, 0),
        angularInertiaLocalFrame: new Quaternion(0, 0, 0, 0),
      }}
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
