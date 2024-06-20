import * as Comlink from "comlink";
import {
  MutableRefObject,
  Suspense,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { PositionalAudioProps, useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, useAfterPhysicsStep } from "@react-three/rapier";
import {
  PerspectiveCamera,
  Vector3Tuple,
  Object3D,
  Object3DEventMap,
  MathUtils,
} from "three";

import { usePointerLockControls } from "../../controls/usePointerLockControls";
import { CAMERA_FAR } from "game-constants";
import { CarModel } from "../models/CarModel";
import { CarThirdPersonCamera } from "../../classes/CarThirdPersonCamera";
import { CarRigidBody } from "../../physics/CarRigidBody";
import { Attachments } from "./attachments";
import { Box } from "@react-three/drei";
import { CarCharacter } from "../../classes/Character/CarCharacter";
import {
  CRASH_STATE,
  SET_CONTEXT,
  STOP_EVENT,
} from "../../machines/machine-constants";
import { CarPlayerContext } from "../../providers/car-player-actor-provider";
import CharacterWorker from "./car-update-worker?worker";
import { deepFunctionsToStrings } from "./deep-functions";
import carWithSkin3DModelFile from "../../assets/models/CarWSkin";
import { CarModelWSkin } from "../models/CarModelWSkin";

export type Props = {
  position?: Vector3Tuple;
  cameraPhi?: number;
  cameraTheta?: number;
  orientation?: Vector3Tuple;
  isRaining?: boolean;
  controlled?: boolean;
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

    const audioRef = useRef<PositionalAudioProps>(null);
    const playerActor = useContext(CarPlayerContext);

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
          actorRef: playerActor.ref,
        }),
      [camera, cameraPhi, cameraTheta]
    );

    usePointerLockControls(gl, (e) =>
      cameraOperator.move(e.movementX, e.movementY)
    );

    const character = useMemo(
      () =>
        new CarCharacter({
          orientation,
          camera,
          playerObjectReferences,
        }),
      [playerObjectReferences?.current?.rigidbody?.current, camera, orientation]
    );

    useAfterPhysicsStep((api) => {
      character.physicsPostStep(api);
    });

    useEffect(() => {
      if (!playerObjectReferences?.current?.rigidbody?.current) {
        return;
      }

      if (!playerActor) {
        return;
      }

      playerActor.send({
        type: SET_CONTEXT,
        mesh: playerObjectReferences?.current?.modelRef?.current,
        rigidBody: playerObjectReferences?.current?.rigidbody?.current,
      });
      playerActor.start();
      playerActor.send({ type: STOP_EVENT });
    }, [playerObjectReferences?.current?.modelRef?.current]);

    useFrame((_rootState, delta) => {
      if (!playerObjectReferences?.current?.rigidbody?.current) {
        return;
      }

      if (!playerObjectReferences?.current?.modelRef?.current) {
        return;
      }

      if (!audioRef?.current) {
        return;
      }

      character.update(delta, 60);

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
        <CarRigidBody
          position={position}
          ref={playerObjectReferences.current.rigidbody}
        >
          <Suspense fallback={<Box />}>
            <CarModelWSkin ref={playerObjectReferences} />
            {/* <CarModel ref={playerObjectReferences} /> */}
            <Attachments ref={audioRef} />
          </Suspense>
        </CarRigidBody>
      </>
    );
  }
);
// const currentTime = performance.now();
// frameCountRef.current++;
// if (currentTime - lastTimeRef.current >= 1000) {
//   frameCountRef.current = 0;
//   lastTimeRef.current = currentTime;
// }

// const fps = frameCountRef.current > 60 ? 120 : 60;
// console.log(fps);
// const obj = {
//   character,
//   cameraOperator,
//   delta,
//   playerObjectReferences: playerObjectReferences?.current,
//   audioRef: audioRef?.current,
// };

// let objFunctionPaths = deepFunctionsToStrings(obj);

// try {
//   worker.postMessage({
//     obj: obj,
//     objFunctionPaths: objFunctionPaths,
//   });
//   // worker.postMessage({
//   //   character,
//   //   cameraOperator,
//   //   delta,
//   //   playerObjectReferences: playerObjectReferences?.current,
//   //   audioRef: audioRef?.current,
//   // });
// } catch (e) {
//   console.error(e);
// }
