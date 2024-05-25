import { MutableRefObject, memo, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, useAfterPhysicsStep } from "@react-three/rapier";
import {
  PerspectiveCamera,
  Vector3Tuple,
  Object3D,
  Object3DEventMap,
} from "three";
import { Character } from "../../classes/Character";
import { InputControls } from "../../controls/input";
import { usePointerLockControls } from "../../controls/usePointerLockControls";
import { CAMERA_FAR } from "game-constants";
import { CarModel } from "../models/CarModel";
import { CarThirdPersonCamera } from "../../classes/CarThirdPersonCamera";
import { CarRigidBody } from "../../physics/CarRigidBody";

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

export const CarPlayer = memo(
  ({
    position = [-5, 1.2, -10],
    cameraPhi = 20,
    cameraTheta = 15,
    orientation = [0, 0, 1],
  }: Props) => {
    const playerObjectReferences = useRef({
      rigidbody: useRef<RapierRigidBody>(null),
      modelRef: useRef<Object3D>(null),
    });

    const camera = useThree((s) => {
      const cam = s.camera;
      cam["fov"] = 20;
      cam.zoom = 1;
      cam.near = 0.000000005;
      cam.far = CAMERA_FAR;
      cam.updateProjectionMatrix();
      return cam;
    }) as PerspectiveCamera;

    const gl = useThree((s) => s.gl);

    const cameraOperator = useMemo(
      () =>
        new CarThirdPersonCamera({
          camera,
          phi: cameraPhi,
          theta: cameraTheta,
          normalRadius: 1.5, //2.5,
        }),
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
          isCar: true,
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
        <CarRigidBody
          position={position}
          ref={playerObjectReferences.current.rigidbody}
        >
          <CarModel ref={playerObjectReferences} />
        </CarRigidBody>
      </>
    );
  }
);
