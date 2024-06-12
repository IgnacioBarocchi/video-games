import {
  MutableRefObject,
  memo,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, useAfterPhysicsStep } from "@react-three/rapier";
import {
  PerspectiveCamera,
  Vector3Tuple,
  Object3D,
  Object3DEventMap,
  Vector3,
} from "three";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { Character } from "../../classes/Character";
import { input } from "../../controls/input";
import { ThirdPersonCamera } from "../../classes/ThirdPersonCamera";
import { usePointerLockControls } from "../../controls/usePointerLockControls";
import { CAMERA_FAR, ENTITY } from "game-constants";
import {
  GLTFActions,
  GLTFResult,
  MaleCharacter3DModel,
} from "../models/MaleCharacter3DModel";
import character3DModelFile from "../../assets/models/Male_Character.glb";
import { HumanoidRigidBody } from "../../physics/HumanoidRigidBody";
import { getFSMEvent } from "../../controls/getFSMEvent";

import { Context } from "../../providers/player-actor-provider";
import { Attachments } from "./attachments";
import {
  USING_SKILL_3_STATE,
  IDLE_EVENT,
  DEATH_STATE,
  IDLE_STATE,
  MOVE_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  SET_CONTEXT,
} from "../../machines/machine-constants";
import { Backpack } from "./backpack/backpack";

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

const milliseconds = 1000;

export const HumanPlayer = memo(
  ({
    position = [-0, 0, -10],
    cameraPhi = 0,
    cameraTheta = 0,
    orientation = [0, 0, 1],
  }: Props) => {
    // const lastTimeRef = useRef(performance.now());
    // const frameCountRef = useRef(0);

    const [playerPickedBackpack, setPlayerPickedBackpack] = useState(false);
    const playerActor = useContext(Context);

    const playerObjectReferences = useRef({
      rigidbody: useRef<RapierRigidBody>(null),
      modelRef: useRef<Object3D>(null),
    });

    const { scene, materials, animations } = useGLTF(
      character3DModelFile
    ) as GLTFResult;
    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);
    const { actions } = useAnimations<GLTFActions>(
      animations,
      playerObjectReferences?.current?.modelRef
    );

    const camera = useThree((s) => {
      const cam = s.camera;
      cam["fov"] = 35;
      // cam.zoom = 0.5;
      cam.near = 0.000000005;
      cam.far = CAMERA_FAR;
      cam.updateProjectionMatrix();
      return cam;
    }) as PerspectiveCamera;

    const gl = useThree((s) => s.gl);

    const cameraOperator = useMemo(
      () =>
        new ThirdPersonCamera({
          camera,
          phi: 20,
          theta: cameraTheta,
          normalRadius: 1,
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
          isCar: false,
        }),
      [playerObjectReferences, camera, orientation]
    );

    useAfterPhysicsStep((api) => {
      if (!playerObjectReferences?.current?.rigidbody?.current) {
        return;
      }

      character.physicsPostStep(api);
    });

    useEffect(() => {
      if (!playerObjectReferences?.current?.rigidbody?.current) {
        return;
      }
      if (!playerObjectReferences?.current?.modelRef?.current) {
        return;
      }

      if (!playerActor) {
        return;
      }

      nodes.BULLET_TRAIL_MESH.visible = false;
      nodes.BULLET_TRAIL_MESH_1.visible = false;

      const animationNameByFSMState = new Map([
        [IDLE_STATE, "IDLE"],
        [MOVE_STATE, "RUN"],
        [USING_SKILL_1_STATE, "SHOOTING"],
        [USING_SKILL_2_STATE, "MAUL"],
        [USING_SKILL_3_STATE, "ROLL"],
        [REACTING_TO_SKILL_1_STATE, "DEATH"],
        [REACTING_TO_SKILL_2_STATE, "DEATH"],
        [DEATH_STATE, "DEATH"],
      ]);

      const characterFSMDurations = new Map([
        [IDLE_STATE, actions.IDLE?.getClip().duration! * milliseconds],
        [MOVE_STATE, actions.RUN?.getClip().duration! * milliseconds],
        [
          USING_SKILL_1_STATE,
          actions.SHOOTING?.getClip().duration! * milliseconds,
        ],
        [USING_SKILL_2_STATE, actions.MAUL?.getClip().duration! * milliseconds],
        [USING_SKILL_3_STATE, actions.ROLL?.getClip().duration! * milliseconds],
        // *
        [
          REACTING_TO_SKILL_1_STATE,
          actions.DEATH?.getClip().duration! * milliseconds,
        ],
        [
          REACTING_TO_SKILL_2_STATE,
          actions.DEATH?.getClip().duration! * milliseconds,
        ],
        // *
        [DEATH_STATE, actions.DEATH?.getClip().duration! * milliseconds],
      ]);

      playerActor.send({
        type: SET_CONTEXT,
        actions,
        mesh: playerObjectReferences?.current?.modelRef?.current,
        rigidBody: playerObjectReferences?.current?.rigidbody?.current,
        animationNameByFSMState,
        characterFSMDurations,
      });
      playerActor.start();
      playerActor.send({ type: IDLE_EVENT });
    }, []);

    useFrame((_rootState, delta) => {
      // const currentTime = performance.now();
      // frameCountRef.current++;
      // if (currentTime - lastTimeRef.current >= 1000) {
      //   console.log(`Current framerate: ${frameCountRef.current} fps`);
      //   frameCountRef.current = 0;
      //   lastTimeRef.current = currentTime;
      // }

      if (!playerObjectReferences?.current?.rigidbody?.current) {
        return;
      }
      if (!playerObjectReferences?.current?.modelRef?.current) {
        return;
      }
      character.update(delta);
      cameraOperator.update(playerObjectReferences?.current?.modelRef?.current);
      // const keys = getKeys() as unknown as Keys;
      // console.log(keys);
      playerActor.send({ type: getFSMEvent(input) });
      const actorCurrentState = playerActor.getSnapshot();
      if (actorCurrentState.value === USING_SKILL_3_STATE) {
        const impulseVector = new Vector3(0, 0, 5);
        impulseVector.applyAxisAngle(
          new Vector3(0, 1, 0),
          character.rotationSimulator.target
        );
        //1 /*orientation*/);
        playerObjectReferences.current.rigidbody.current.setLinvel(
          impulseVector,
          false
        );
      }
    });

    return (
      <>
        <HumanoidRigidBody
          entity={ENTITY.PLAYER}
          position={position}
          ref={playerObjectReferences?.current?.rigidbody}
        >
          <MaleCharacter3DModel
            ref={playerObjectReferences?.current?.modelRef}
            nodes={nodes}
            materials={materials}
            actions={actions}
          />
          <Attachments
            nodes={nodes}
            playerPickedBackpack={playerPickedBackpack}
          />
        </HumanoidRigidBody>
        <Backpack
          position={[0, 0, 0]}
          setPlayerPickedBackpack={setPlayerPickedBackpack}
        />
      </>
    );
  }
);
// nodes.BULLET_TRAIL_MESH.visible = false;
// nodes.BULLET_TRAIL_MESH_1.visible = false;

// const milliseconds = 1000;
// const animationNameByFSMState = new Map([
//   [IDLE_STATE, "IDLE"],
//   [MOVE_STATE, "RUN"],
//   [USING_SKILL_1_STATE, "SHOOTING"],
//   [USING_SKILL_2_STATE, "MAUL"],
//   [USING_SKILL_3_STATE, "ROLL"],
//   [REACTING_TO_SKILL_1_STATE, "DEATH"],
//   [REACTING_TO_SKILL_2_STATE, "DEATH"],
//   [DEATH_STATE, "DEATH"],
// ]);

// const characterFSMDurations = new Map([
//   [IDLE_STATE, actions.IDLE?.getClip().duration! * milliseconds],
//   [MOVE_STATE, actions.RUN?.getClip().duration! * milliseconds],
//   [
//     USING_SKILL_1_STATE,
//     actions.SHOOTING?.getClip().duration! * milliseconds,
//   ],
//   [USING_SKILL_2_STATE, actions.MAUL?.getClip().duration! * milliseconds],
//   [USING_SKILL_3_STATE, actions.ROLL?.getClip().duration! * milliseconds],
//   // *
//   [
//     REACTING_TO_SKILL_1_STATE,
//     actions.DEATH?.getClip().duration! * milliseconds,
//   ],
//   [
//     REACTING_TO_SKILL_2_STATE,
//     actions.DEATH?.getClip().duration! * milliseconds,
//   ],
//   // *
//   [DEATH_STATE, actions.DEATH?.getClip().duration! * milliseconds],
// ]);

// !error!
// const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
