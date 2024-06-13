import {
  Ref,
  ReactNode,
  forwardRef,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { Quaternion, Vector3 } from "three";
import { ENTITY } from "game-constants";
import { WaterAttachment3DModel } from "../players/car-player/water-attachment-3D-model";
import { throttleFunction } from "game-lib";
import { CRASH_EVENT } from "../machines/machine-constants";
import { CarPlayerContext } from "../providers/car-player-actor-provider";
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

  const createHandler = useCallback(
    (referenceID: "frontLeft" | "frontRight" | "backLeft" | "backRight") =>
      (payload) => {
        const isOnGrass = payload.other.rigidBodyObject.name === ENTITY.GRASS;
        const inSpeedThreshold =
          Math.abs(payload.target.rigidBody.linvel().z) > 35;
        // console.table({ inSpeedThreshold, isOnGrass });
        wheelsAttachmentReferences.current[referenceID].current.visible =
          inSpeedThreshold && isOnGrass;
      },
    []
  );

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
};

const frontWheelsOrigin = 1.5;
export const CarRigidBody = forwardRef<
  RapierRigidBody,
  Omit<CarRigidBodyProps, "playerRigidBodyReference">
>(({ children, position }, ref) => {
  const playerActor = useContext(CarPlayerContext);

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
      onCollisionEnter={(payload) => {
        const entity =
          [ENTITY.CONCRETE_BARRIER, ENTITY.ZOMBIE].includes(
            payload?.other?.rigidBodyObject?.name
          ) || payload?.colliderObject.name.includes("barrier");
        const inSpeedThreshold =
          Math.abs(payload.target.rigidBody.linvel().z) > 50;

        if (!inSpeedThreshold || !entity) {
          return;
        }

        playerActor.send({ type: CRASH_EVENT });
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
