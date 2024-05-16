import { useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  useAfterPhysicsStep,
} from "@react-three/rapier";
import {
  MutableRefObject,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  PerspectiveCamera,
  Vector3Tuple,
  Object3D,
  PositionalAudio,
  PointLight,
  AudioAnalyser,
  Object3DEventMap,
  Vector3,
} from "three";
import { Character } from "./Character";
import { InputControls } from "./input";
import { CarModel, GLTFActions, GLTFResult } from "./model";
import { ThirdPersonCamera } from "./ThirdPersonCamera";
import { usePointerLockControls } from "./usePointerLockControls";
import { Attachments } from "./attachments";
import { useAnimations, useGLTF } from "@react-three/drei";
import useGameStore from "../store/store";
import { CAMERA_FAR, ENTITY } from "game-constants";

const useMusic = false;

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

export type AttachmentReferences = MutableRefObject<{
  lights: {
    leftFrontLight: MutableRefObject<PointLight | undefined>;
    rightFrontLight: MutableRefObject<PointLight | undefined>;
    leftBackLight: MutableRefObject<PointLight | undefined>;
    rightBackLight: MutableRefObject<PointLight | undefined>;
    leftStopLight: MutableRefObject<PointLight | undefined>;
    rightStopLight: MutableRefObject<PointLight | undefined>;
    bottomLight: MutableRefObject<PointLight | undefined>;
  };
  audio: {
    music: MutableRefObject<PositionalAudio | undefined>;
    drivingOnSurface: MutableRefObject<PositionalAudio | undefined>;
    carEngine: MutableRefObject<PositionalAudio | undefined>;
    analyser: MutableRefObject<AudioAnalyser | undefined>;
  };
  isOnSnow: MutableRefObject<boolean>;
}>;

export const Player = memo(
  ({
    position = [-10, h + 1, -10],
    cameraPhi = 0,
    cameraTheta = 0,
    orientation = [0, 0, 1],
  }: Props) => {
    const gameOver = useGameStore((state) => state.gameOver);

    const playerObjectReferences = useRef({
      rigidbody: useRef<RapierRigidBody>(null),
      modelRef: useRef<Object3D>(null),
    });

    const attachmentReferences = useRef({
      lights: {
        leftFrontLight: useRef<PointLight>(),
        rightFrontLight: useRef<PointLight>(),
        leftBackLight: useRef<PointLight>(),
        rightBackLight: useRef<PointLight>(),
        leftStopLight: useRef<PointLight>(),
        rightStopLight: useRef<PointLight>(),
        bottomLight: useRef<PointLight>(),
      },
      audio: {
        music: useRef<PositionalAudio>(),
        drivingOnSurface: useRef<PositionalAudio>(),
        carEngine: useRef<PositionalAudio>(),
        analyser: useRef<AudioAnalyser>(),
      },
      isOnSnow: useRef(false),
    });

    useEffect(() => {
      if (useMusic) {
        attachmentReferences.current.audio.analyser.current = new AudioAnalyser(
          attachmentReferences.current.audio.music.current,
          32
        );
      }

      attachmentReferences.current.isOnSnow.current = false;
    }, []);

    const camera = useThree((s) => {
      const cam = s.camera;
      cam.fov = 90;
      cam.zoom = 1;
      cam.near = 0.000000005;
      cam.far = CAMERA_FAR;
      // cam.filmGauge = 24;
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
          attachmentReferences,
          // actions,
        }),
      [playerObjectReferences, camera, orientation]
    );

    useAfterPhysicsStep((api) => {
      character.physicsPostStep(api);
    });

    useFrame((_, delta) => {
      if (!playerObjectReferences?.current?.rigidbody?.current) return;
      if (!playerObjectReferences?.current?.modelRef?.current) return;
      if (!gameOver) {
        character.update(delta);
      }
      cameraOperator.update(playerObjectReferences?.current?.modelRef?.current);
    });

    return (
      <group>
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
          onContactForce={(payload) => {
            if (
              [
                "left-over-highway",
                "middle-road",
                "right-over-highway",
              ].includes(payload.other.rigidBodyObject.name)
            ) {
              attachmentReferences.current.isOnSnow.current = true;
            } else {
              attachmentReferences.current.isOnSnow.current = false;
            }
          }}
          onCollisionExit={(payload) => {
            if (
              [
                "left-over-highway",
                "middle-road",
                "right-over-highway",
              ].includes(payload.other.rigidBodyObject.name)
            ) {
              attachmentReferences.current.isOnSnow.current = false;
            }
          }}
          onCollisionEnter={(payload) => {
            // if (
            //   [
            //     'left-over-highway',
            //     'middle-road',
            //     'right-over-highway',
            //   ].includes(payload.other.rigidBodyObject.name) &&
            //   Math.random() > 0.9
            // ) {
            //   const currentVelocity =
            //     playerObjectReferences.current.rigidbody.current?.linvel();
            //   const newVelocity = new Vector3(
            //     currentVelocity.x,
            //     currentVelocity.y + 2.5,
            //     currentVelocity.z,
            //   );
            //   playerObjectReferences.current.rigidbody.current?.setLinvel(
            //     newVelocity,
            //     true,
            //   );
            // console.log(newVelocity);
            // }
          }}
        >
          <CuboidCollider
            name="Car"
            args={[3, 1, 5.5]}
            position={[0, 3, 0.2]}

            // args={[2.081, 1.674, 4.494]}
            // position={[0, 1.674, 0]}
          />

          <BallCollider args={[0.5]} position={[1.5, 0.5, 3]} />
          <BallCollider args={[0.5]} position={[1.5, 0.5, -3]} />

          <BallCollider args={[0.5]} position={[-1.5, 0.5, 3]} />
          <BallCollider args={[0.5]} position={[-1.5, 0.5, -3]} />

          <CarModel ref={playerObjectReferences} />
          {!gameOver && <Attachments ref={attachmentReferences} />}
        </RigidBody>
      </group>
    );
  }
);
// a={character.drivingState}
// carGltfResult={carGltfResult}
// actions={actions}
