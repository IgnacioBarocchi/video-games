import {
  useContext,
  useRef,
  useEffect,
  useMemo,
  FC,
  useState,
  useCallback,
} from "react";
import { GroupProps, useFrame, useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { ActionName, Zombie3DModel } from "../models/zombie-3D-model";
import { complexZombieMachine } from "../../machines/complex-zombie-machine";

import { Context } from "../../providers/player-actor-provider";
import { useMachine } from "@xstate/react";
import { GLTFActions, GLTFResult } from "../models/zombie-3D-model";

import { ENTITY } from "game-constants";
import { Vector3 } from "three";
import { IntersectionEnterPayload, RapierRigidBody } from "@react-three/rapier";
import zombie3DMFile from "../../assets/models/Zombie_Male.glb";

import { getVector3From } from "../../lib/getVector3From";
import { goToTarget } from "../../lib/goToTarget";
import { ControlledZombieBody } from "./controlled-zombie-body";
import {
  INACTIVE_STATE,
  FSMStates,
  IDLE_STATE,
  MOVE_STATE,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  USING_SKILL_3_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
  DEATH_STATE,
  USING_SKILL_1_EVENT,
  USING_SKILL_2_EVENT,
  REACTING_TO_SKILL_2_EVENT,
  IDLE_EVENT,
  MOVE_EVENT,
  USING_SKILL_3_EVENT,
} from "../../machines/machine-constants";
import { Attachments } from "./attachments";

export interface ZombieNPCProps {
  position: Vector3 | [number, number, number];
  collisionCallback?: Function;
}

export const ZombieNPC: FC<ZombieNPCProps> = ({
  position,
  collisionCallback,
}) => {
  const [state, send] = useMachine(complexZombieMachine);
  // todo: move to context
  const [meleeRange, setMeleeRange] = useState(false);
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
    if (group?.current && NPCRigidBodyReference?.current) {
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

      send({
        type: "SET_CONTEXT",
        actions,
        mesh: group.current,
        rigidBody: NPCRigidBodyReference.current,
        animationNameByFSMState,
        characterFSMDurations,
        userControlled: false,
      });

      timeoutId = setTimeout(() => {
        send({ type: MOVE_EVENT });
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useFrame(() => {
    if (state.status === "error") {
      throw new Error(state.status);
    }

    if (
      !playerRigidBodyReference?.current ||
      state.status === "done" ||
      ![MOVE_STATE, IDLE_STATE].includes(state.value)
    ) {
      return;
    }

    if (meleeRange) {
      send({ type: USING_SKILL_1_EVENT });
      return;
    }

    if (state.value === MOVE_STATE) {
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

  const playerImpactHandler = useCallback(
    (payload) => {
      if (payload.other.rigidBodyObject.name === ENTITY.PLAYER) {
        const attackChance = Math.random() < 0.75;

        if (attackChance) {
          send({ type: USING_SKILL_2_EVENT });
          playerActor?.send({ type: REACTING_TO_SKILL_2_EVENT });
        } else {
          send({ type: USING_SKILL_3_EVENT });
        }
      }

      if (
        payload.other.rigidBodyObject.name === ENTITY.CAR &&
        Math.abs(payload.rigidBody?.linvel().z!) > 2
      ) {
        send({ type: REACTING_TO_SKILL_2_EVENT });
      }

      collisionCallback?.();
    },
    [playerActor, collisionCallback, send]
  );

  const attackPlayer = useCallback(() => {
    const attackChance = Math.random() < 0.75;

    if (attackChance) {
      send({ type: USING_SKILL_1_EVENT });
      // TODO: ZOMBIE NEEDS ARM ATTACHMENT TO HIT THE PLAYER
      // playerActor?.send({ type: REACTING_TO_SKILL_1_EVENT });
    } else {
      send({ type: USING_SKILL_3_EVENT });
    }

    if (!meleeRange) {
      setMeleeRange(true);
    }
  }, [meleeRange, send]);

  const chasePlayer = useCallback(() => {
    send({ type: MOVE_EVENT });

    if (meleeRange) {
      setMeleeRange(false);
    }
  }, [meleeRange, send]);

  const engagePlayer = useCallback(
    (payload: IntersectionEnterPayload) => {
      if (payload?.other?.rigidBody) {
        playerRigidBodyReference.current = payload.other.rigidBody;
        send({ type: MOVE_EVENT });
      }
    },
    [send]
  );

  const goIdle = useCallback(() => {
    playerRigidBodyReference.current = null;
    send({ type: IDLE_EVENT });
  }, [send]);

  if (state.matches(INACTIVE_STATE)) {
    return null;
  }

  return (
    <ControlledZombieBody
      position={position}
      ref={NPCRigidBodyReference}
      chasePlayer={chasePlayer}
      engagePlayer={engagePlayer}
      attackPlayer={attackPlayer}
      goIdle={goIdle}
      playerImpactHandler={playerImpactHandler}
      Zombie3DModelVariant={() => (
        <Zombie3DModel
          ref={group}
          nodes={nodes}
          materials={materials}
          actions={actions}
        />
      )}
    >
      <Attachments isDead={state.matches(DEATH_STATE)} />
    </ControlledZombieBody>
  );
};
