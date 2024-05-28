import { MutableRefObject, ReactNode, memo, useMemo, useRef } from "react";
import { PositionalAudioProps, useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, useAfterPhysicsStep } from "@react-three/rapier";
import {
  PerspectiveCamera,
  Vector3Tuple,
  Object3D,
  Object3DEventMap,
  MathUtils,
} from "three";
import { Character } from "../../classes/Character";
import { InputControls } from "../../controls/input";
import { usePointerLockControls } from "../../controls/usePointerLockControls";
import { CAMERA_FAR } from "game-constants";
import { CarModel } from "../models/CarModel";
import { CarThirdPersonCamera } from "../../classes/CarThirdPersonCamera";
import { CarRigidBody } from "../../physics/CarRigidBody";
import { Attachments } from "./attachments";
import { Rain } from "./enviroment";

export type Props = {
  position?: Vector3Tuple;
  cameraPhi?: number;
  cameraTheta?: number;
  orientation?: Vector3Tuple;
  isRaining?: boolean;
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
    isRaining,
  }: Props) => {
    const playerObjectReferences = useRef({
      rigidbody: useRef<RapierRigidBody>(null),
      modelRef: useRef<Object3D>(null),
    });

    const audioRef = useRef<PositionalAudioProps>(null);

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

      if (!audioRef?.current) {
        return;
      }

      character.update(delta);
      cameraOperator.update(playerObjectReferences?.current?.modelRef?.current);

      const carSpeed =
        playerObjectReferences.current.rigidbody.current.linvel().z;

      const volume = MathUtils.clamp(
        Number(Math.abs(carSpeed).toFixed(2)),
        0,
        20
      );

      audioRef.current!.setVolume(volume);
    });

    return (
      <>
        <InputControls />
        <CarRigidBody
          position={position}
          ref={playerObjectReferences.current.rigidbody}
        >
          <CarModel ref={playerObjectReferences} />
          <Attachments ref={audioRef} />
        </CarRigidBody>
        {isRaining && <Rain ref={playerObjectReferences.current.rigidbody} />}
      </>
    );
  }
);
