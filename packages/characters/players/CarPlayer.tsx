import { MutableRefObject, memo, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  useAfterPhysicsStep,
} from "@react-three/rapier";
import {
  PerspectiveCamera,
  Vector3Tuple,
  Object3D,
  Object3DEventMap,
} from "three";
import { Character } from "../classes/Character";
import { InputControls } from "../controls/input";
import { ThirdPersonCamera } from "../classes/ThirdPersonCamera";
import { usePointerLockControls } from "../usePointerLockControls";
import { CAMERA_FAR, ENTITY } from "game-constants";
import { CarModel } from "./models/CarModel";

const h = 0.2;

export type Props = {
  position?: Vector3Tuple;
  cameraPhi?: number;
  cameraTheta?: number;
  orientation?: Vector3Tuple;
};

export type PlayerObjectReferences = MutableRefObject<{
  rigidbody: React.RefObject<RapierRigidBody>;
  modelRef: React.RefObject<Object3D<Object3DEventMap>>;
}>;

const Wheels = () => {
  return (
    <>
      <BallCollider args={[0.5]} position={[1.5, 0.5, 3]} />
      <BallCollider args={[0.5]} position={[1.5, 0.5, -3]} />
      <BallCollider args={[0.5]} position={[-1.5, 0.5, 3]} />
      <BallCollider args={[0.5]} position={[-1.5, 0.5, -3]} />
    </>
  );
};

export const CarPlayer = memo(
  ({
    position = [-10, h + 1, -10],
    cameraPhi = 0,
    cameraTheta = 0,
    orientation = [0, 0, 1],
  }: Props) => {
    const playerObjectReferences = useRef({
      rigidbody: useRef<RapierRigidBody>(null),
      modelRef: useRef<Object3D>(null),
    });

    const camera = useThree((s) => {
      const cam = s.camera;
      cam.fov = 90;
      cam.zoom = 1;
      cam.near = 0.000000005;
      cam.far = CAMERA_FAR;
      cam.updateProjectionMatrix();
      return cam;
    }) as PerspectiveCamera;

    const gl = useThree((s) => s.gl);

    const cameraOperator = useMemo(
      () =>
        new ThirdPersonCamera({ camera, phi: cameraPhi, theta: cameraTheta }),
      [camera, cameraPhi, cameraTheta]
    );

    usePointerLockControls(gl, (e) =>
      cameraOperator.move(e.movementX, e.movementY)
    );

    const character = useMemo(
      () =>
        new Character({
          orientation,
          camera,
          playerObjectReferences,
        }),
      [playerObjectReferences, camera, orientation]
    );

    useAfterPhysicsStep((api) => {
      character.physicsPostStep(api);
    });

    useFrame((_, delta) => {
      if (!playerObjectReferences?.current?.rigidbody?.current) {
        return;
      }
      if (!playerObjectReferences?.current?.modelRef?.current) {
        return;
      }

      character.update(delta);
      cameraOperator.update(playerObjectReferences?.current?.modelRef?.current);
    });

    return (
      <>
        <InputControls />
        <RigidBody
          name={ENTITY.CAR}
          ref={playerObjectReferences.current.rigidbody}
          position={position}
          lockRotations
          mass={2000}
          density={1500}
          friction={5}
          restitution={0.1}
        >
          <CuboidCollider
            name="Front"
            args={[3, 1, 5.5]}
            position={[0, 3, 0.2]}
          />
          {/* 
          <CuboidCollider
            name="Rest"
            args={[3, 1, 5.5]}
            position={[0, 3, 0.2]}
          /> */}
          <Wheels />
          <CarModel ref={playerObjectReferences} />
        </RigidBody>
      </>
    );
  }
);

// cam.filmGauge = 24;
