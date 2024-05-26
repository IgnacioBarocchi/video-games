import {
  useContext,
  useRef,
  useEffect,
  useMemo,
  FC,
  MutableRefObject,
} from "react";
import { GroupProps, useFrame, useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { ActionName, Zombie3DModel } from "../../models/zombie-3D-model";
import { complexZombieMachine } from "../../../machines/complex-zombie-machine";
import { createActor } from "xstate";
import { Context } from "../../../providers/player-actor-provider";
import { useSelector } from "@xstate/react";
import { HumanoidRigidBody } from "../../../physics/HumanoidRigidBody";
import { GLTFActions, GLTFResult } from "../../models/zombie-3D-model";

import { ENTITY } from "game-constants";
import { Vector3 } from "three";
import {
  CollisionEnterPayload,
  IntersectionEnterPayload,
  CylinderCollider as PlayerDetector,
  RapierRigidBody,
} from "@react-three/rapier";
import zombie3DMFile from "../../../assets/models/Zombie_Male.glb";

import { Attachments } from "../attachments";
import { getVector3From } from "../../../lib/getVector3From";
import { goToTarget } from "../../../lib/goToTarget";
import {
  FSMStates,
  IDLE_STATE,
  MOVE_STATE,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  USING_SKILL_3_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
  DEATH_STATE,
  MOVE_EVENT,
  USING_SKILL_2_EVENT,
  REACTING_TO_SKILL_2_EVENT,
  USING_SKILL_3_EVENT,
  USING_SKILL_1_EVENT,
  IDLE_EVENT,
} from "../../../machines/machine-constants";

const payloadIsThePlayer = (payload: CollisionEnterPayload) =>
  [ENTITY.PLAYER, ENTITY.CAR].includes(payload.other.rigidBodyObject.name);

export interface ZombieNPCProps {
  position: Vector3 | [number, number, number];
  collisionCallback?: Function;
}

export const ZombieNPC: FC<ZombieNPCProps> = ({
  position,
  collisionCallback,
}) => {
  const NPCActor = createActor(complexZombieMachine);
  // const isInactive = useSelector(NPCActor, statusSelector);
  const playerActor = useContext(Context);
  const playerRigidBodyReference = useRef<RapierRigidBody>(null);
  const group = useRef<GroupProps>();
  const { scene, materials, animations } = useGLTF(zombie3DMFile) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations<GLTFActions>(animations, group);
  const NPCRigidBodyReference = useRef<RapierRigidBody>(null);

  useEffect(() => {
    let timeoutId = 0;
    if (group?.current && NPCRigidBodyReference?.current && NPCActor) {
      console.count("EFFECT!");

      const milliseconds = 1000;
      const animationNameByFSMState = new Map<FSMStates, ActionName>([
        [IDLE_STATE, "RUN"],
        [MOVE_STATE, "RUN"],
        [USING_SKILL_1_STATE, "ATTACK"],
        [USING_SKILL_2_STATE, "BITE"],
        [USING_SKILL_3_STATE, "SCREAM"],
        [REACTING_TO_SKILL_1_STATE, "SHOT"],
        [REACTING_TO_SKILL_2_STATE, "HEAD_HIT"],
        [DEATH_STATE, "DEATH"],
      ]);

      const characterFSMDurations = new Map([
        [IDLE_STATE, actions.RUN?.getClip().duration! * milliseconds],
        [MOVE_STATE, actions.RUN?.getClip().duration! * milliseconds],
        [
          USING_SKILL_1_STATE,
          actions.ATTACK?.getClip().duration! * milliseconds,
        ],
        [USING_SKILL_2_STATE, actions.BITE?.getClip().duration! * milliseconds],
        [
          USING_SKILL_3_STATE,
          actions.SCREAM?.getClip().duration! * milliseconds,
        ],
        [DEATH_STATE, actions.DEATH?.getClip().duration! * milliseconds],
      ]);

      NPCActor.send({
        type: "SET_CONTEXT",
        actions,
        mesh: group.current,
        rigidBody: NPCRigidBodyReference.current,
        animationNameByFSMState,
        characterFSMDurations,
      });
      NPCActor.start();

      timeoutId = setTimeout(() => {
        NPCActor.send({ type: MOVE_EVENT });
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useFrame(() => {
    const NPCActorCurrentState = NPCActor.getSnapshot();

    if (NPCActorCurrentState.status === "error") {
      throw new Error(NPCActorCurrentState.status);
    }

    if (
      !playerRigidBodyReference?.current ||
      NPCActorCurrentState.status === "done" ||
      [
        DEATH_STATE,
        REACTING_TO_SKILL_2_STATE,
        REACTING_TO_SKILL_1_STATE,
      ].includes(NPCActorCurrentState.value)
    ) {
      // console.log("valid", NPCActorCurrentState.value);
      // console.log("POS", playerPosition?.current);
      return;
    } else {
      // console.log("IS VALID!!!!", NPCActorCurrentState.value);
    }

    if (
      NPCActorCurrentState.value === MOVE_STATE ||
      NPCActorCurrentState.value === IDLE_STATE
    ) {
      const sourcePosition = getVector3From(
        NPCRigidBodyReference.current.translation()
      );

      const targetPosition = getVector3From(
        playerRigidBodyReference.current.translation()
      );

      const sourceRigidBody = NPCRigidBodyReference.current;

      goToTarget({
        sourcePosition,
        targetPosition,
        sourceRigidBody,
        style: "LINEAR VELOCITY",
        speed: 8000,
      });
    }
  });

  const handleCollisionWithPlayer = (payload) => {
    if (!payloadIsThePlayer(payload)) {
      return;
    }

    if (payload.other.rigidBodyObject.name === ENTITY.PLAYER) {
      const attackChance = Math.random() < 0.75;

      if (attackChance) {
        NPCActor.send({ type: USING_SKILL_2_EVENT });
        playerActor?.send({ type: REACTING_TO_SKILL_2_EVENT });
      } else {
        NPCActor.send({ type: USING_SKILL_3_EVENT });
      }
    }

    if (
      payload.other.rigidBodyObject.name === ENTITY.CAR &&
      Math.abs(payload.rigidBody?.linvel().z!) > 2
    ) {
      NPCActor.send({ type: REACTING_TO_SKILL_2_EVENT });
    }

    collisionCallback?.();
  };

  const handleIntersectionEnterWithPlayer = (payload) => {
    if (!payloadIsThePlayer(payload)) {
      return;
    }

    const attackChance = Math.random() < 0.75;

    if (attackChance) {
      NPCActor.send({ type: USING_SKILL_1_EVENT });
      // TODO: ZOMBIE NEEDS ARM ATTACHMENT TO HIT THE PLAYER
      // playerActor?.send({ type: REACTING_TO_SKILL_1_EVENT });
    } else {
      NPCActor.send({ type: USING_SKILL_3_EVENT });
    }
  };

  const handleIntersectionExitWithPlayer = (payload) => {
    if (!payloadIsThePlayer(payload)) {
      return;
    }

    NPCActor.send({ type: MOVE_EVENT });
  };

  const handleRegisterPlayer = (payload: IntersectionEnterPayload) => {
    if (!payloadIsThePlayer(payload)) {
      return;
    }

    if (payload?.other?.rigidBody) {
      playerRigidBodyReference.current = payload.other.rigidBody;
      NPCActor.send({ type: MOVE_EVENT });
    }
  };

  const handleUnregisterPlayer = (payload: IntersectionEnterPayload) => {
    if (!payloadIsThePlayer(payload)) {
      return;
    }

    playerRigidBodyReference.current = null;
    NPCActor.send({ type: IDLE_EVENT });
  };

  // if (isInactive) {
  //   return null;
  // }

  return (
    <HumanoidRigidBody
      position={position}
      entity={ENTITY.ZOMBIE}
      ref={NPCRigidBodyReference}
      onBodyCollision={handleCollisionWithPlayer}
      onSensorEnter={handleIntersectionEnterWithPlayer}
      onSensorExit={handleIntersectionExitWithPlayer}
      userData={NPCActor}
    >
      <PlayerDetector
        sensor
        name="Region"
        position={[0, 1, 0]}
        args={[1, 25]}
        onIntersectionEnter={handleRegisterPlayer}
        onIntersectionExit={handleUnregisterPlayer}
      />
      <Zombie3DModel
        ref={group}
        nodes={nodes}
        materials={materials}
        actions={actions}
      />
      <Attachments NPCActor={NPCActor} />
    </HumanoidRigidBody>
  );
};

// onIntersectionEnter={handleRegisterPlayer}
// onIntersectionExit={handleUnregisterPlayer}
