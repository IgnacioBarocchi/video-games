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
import { Rain } from "./enviroment";
import { Box } from "@react-three/drei";
import { CarCharacter } from "../../classes/Character/CarCharacter";
import { SET_CONTEXT, STOP_EVENT } from "../../machines/machine-constants";
import { CarPlayerContext } from "../../providers/car-player-actor-provider";

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
    isRaining,
  }: Props) => {
    // const lastTimeRef = useRef(performance.ncar-plaow());
    // const frameCountRef = useRef(0);

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
      console.log(playerObjectReferences);
      console.log(playerActor);
      if (!playerObjectReferences?.current?.rigidbody?.current) {
        console.log("rigidbody", "false");
        return;
      }
      // if (!playerObjectReferences?.current?.modelRef?.current) {
      //   console.log("model", "false");

      //   return;
      // }

      if (!playerActor) {
        console.log("actor", "false");

        return;
      }

      playerActor.send({
        type: SET_CONTEXT,
        mesh: playerObjectReferences?.current?.modelRef?.current,
        rigidBody: playerObjectReferences?.current?.rigidbody?.current,
      });
      playerActor.start();
      playerActor.send({ type: STOP_EVENT });

      try {
        const s = playerActor.getSnapshot();
        console.log(playerActor);
        console.log(s);
        console.log(
          "Z",
          playerActor.getSnapshot()?.context?.rigidBody?.linvel()?.z
        );
      } catch (e) {
        console.log(e);
      }
    }, [playerObjectReferences?.current?.modelRef?.current]);

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

      // const currentTime = performance.now();
      // frameCountRef.current++;
      // if (currentTime - lastTimeRef.current >= 1000) {
      //   frameCountRef.current = 0;
      //   lastTimeRef.current = currentTime;
      // }

      // const fps = frameCountRef.current > 60 ? 120 : 60;
      // console.log(fps);
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
            <CarModel ref={playerObjectReferences} />
            <Attachments ref={audioRef} />
          </Suspense>
        </CarRigidBody>
        {isRaining && <Rain ref={playerObjectReferences.current.rigidbody} />}
      </>
    );
  }
);
