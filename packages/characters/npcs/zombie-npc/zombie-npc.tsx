import { useContext, useRef, useEffect, useMemo, FC } from "react";
import { GroupProps, useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { ActionName, Zombie3DModel } from "../models/zombie-3D-model";
import { ZombieMachine } from "../../machines/zombie-machine";
import { useEnemyNPCLogic } from "../hooks/useEnemyNPCLogic";
import { createActor } from "xstate";
import { Context } from "../../providers/player-actor-provider";
import { useSelector } from "@xstate/react";
import HumanoidRigidBody from "../../physics/HumanoidRigidBody";
import { GLTFActions, GLTFResult } from "../models/zombie-3D-model";
import { USING_SKILL_3_EVENT } from "../../machines/createBaseFSMInput";
import { ENTITY } from "game-constants";
import { Vector3 } from "three";
import {
  IntersectionEnterPayload,
  CylinderCollider as PlayerDetector,
  RapierRigidBody,
} from "@react-three/rapier";
import zombie3DMFile from "../../assets/models/Zombie_Male.glb";
import {
  IDLE_STATE,
  MOVE_STATE,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  USING_SKILL_3_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
  DEATH_STATE,
  USING_SKILL_2_EVENT,
  REACTING_TO_SKILL_2_EVENT,
  FSMStates,
  INACTIVE_STATE,
  USING_SKILL_1_EVENT,
  DEATH_EVENT,
} from "../../machines/createBaseFSMInput";
import { Attachments } from "./attachments";

const statusSelector = (state) => {
  return state.value === INACTIVE_STATE;
};

export interface ZombieNPCProps {
  position: Vector3 | [number, number, number];
  collisionCallback?: Function;
}

export const ZombieNPC: FC<ZombieNPCProps> = ({
  position,
  collisionCallback,
}) => {
  const NPCActor = createActor(ZombieMachine);
  const isInactive = useSelector(NPCActor, statusSelector);
  const playerActor = useContext(Context);
  const playerRigidBody = useRef<RapierRigidBody>(null);
  const group = useRef<GroupProps>();
  const { scene, materials, animations } = useGLTF(zombie3DMFile) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations<GLTFActions>(animations, group);

  const { NPCRigidBodyReference } = useEnemyNPCLogic({
    NPCActor,
    playerRigidBody,
    movement: "LINEAR VELOCITY",
  });

  useEffect(() => {
    if (group?.current && NPCRigidBodyReference?.current && NPCActor) {
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
    }

    NPCActor.start();
  }, []);

  const handleCollisionWithPlayer = (payload) => {
    if (
      ![ENTITY.PLAYER, ENTITY.CAR].includes(payload.other.rigidBodyObject.name)
    ) {
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
      NPCActor.send({ type: DEATH_EVENT });
    }

    collisionCallback?.();
  };

  const handleIntersectionWithPlayer = (payload) => {
    if (
      ![ENTITY.PLAYER, ENTITY.CAR].includes(payload.other.rigidBodyObject.name)
    ) {
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

  const handleRegisterPlayer = (payload: IntersectionEnterPayload) => {
    if (
      ![ENTITY.PLAYER, ENTITY.CAR].includes(payload.other.rigidBodyObject.name)
    ) {
      return;
    }

    if (payload.other.rigidBody) {
      playerRigidBody.current = payload.other.rigidBody;
    }
  };

  const handleUnregisterPlayer = (payload: IntersectionEnterPayload) => {
    if (
      ![ENTITY.PLAYER, ENTITY.CAR].includes(payload.other.rigidBodyObject.name)
    ) {
      return;
    }

    playerRigidBody.current = null;
  };

  if (isInactive) {
    return null;
  }

  return (
    <HumanoidRigidBody
      position={position}
      entity={ENTITY.ZOMBIE}
      ref={NPCRigidBodyReference}
      onBodyCollision={handleCollisionWithPlayer}
      onSensorEnter={handleIntersectionWithPlayer}
      userData={NPCActor}
    >
      <PlayerDetector
        sensor
        name="Region"
        position={[0, 1, 0]}
        args={[1, 200]}
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
