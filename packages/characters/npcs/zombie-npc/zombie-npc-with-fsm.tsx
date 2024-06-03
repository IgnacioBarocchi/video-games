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
import { MathUtils, Vector3 } from "three";
import {
  CollisionPayload,
  IntersectionEnterPayload,
  RapierRigidBody,
} from "@react-three/rapier";
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
  DEATH_EVENT,
} from "../../machines/machine-constants";
import { Attachments } from "./attachments";
import { simpleZombieMachine } from "../../machines/simple-zombie-machine";

export interface ZombieNPCProps {
  position: Vector3 | [number, number, number];
  collisionCallback?: Function;
  playerContext: "CAR" | "HUMAN";
}

export const ZombieNPCV2: FC<ZombieNPCProps> = ({
  position,
  collisionCallback,
  playerContext,
}) => {
  const [state, send] = useMachine(
    playerContext === "HUMAN" ? complexZombieMachine : simpleZombieMachine
  );
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
  }, [playerContext]);

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

    if (meleeRange /*&& playerContext === "HUMAN"*/) {
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
    (payload: CollisionPayload) => {
      if (
        playerContext === "HUMAN" &&
        payload.other.rigidBodyObject.name === ENTITY.PLAYER
      ) {
        const attackChance = Math.random() < 0.75;

        if (attackChance) {
          send({ type: USING_SKILL_2_EVENT });
          playerActor?.send({ type: REACTING_TO_SKILL_2_EVENT });
        } else {
          send({ type: USING_SKILL_3_EVENT });
        }
      }
      const otherObjectSpeed = Math.abs(payload.other.rigidBody?.linvel().z);
      if (
        playerContext === "CAR" &&
        payload.other.rigidBodyObject.name === ENTITY.CAR &&
        otherObjectSpeed > 10
      ) {
        payload.target.rigidBody.setLinvel(
          new Vector3(0, MathUtils.clamp(otherObjectSpeed, 0, 15), 0),
          true
        );
        if (collisionCallback) {
          collisionCallback();
        }
        send({ type: DEATH_EVENT });
      }
    },
    [playerActor, collisionCallback, send]
  );

  const attackPlayer = useCallback(() => {
    // const attackChance = Math.random() < 0.75;

    // if (attackChance) {
    if (!meleeRange /* && playerContext === "HUMAN"*/) {
      setMeleeRange(true);
      send({ type: USING_SKILL_1_EVENT });
      console.log("set to true");
    }
    // TODO: ZOMBIE NEEDS ARM ATTACHMENT TO HIT THE PLAYER
    // playerActor?.send({ type: REACTING_TO_SKILL_1_EVENT });
    // } else {
    //   send({ type: USING_SKILL_3_EVENT });
    // }
  }, [meleeRange, send]);

  const chasePlayer = useCallback(() => {
    if (meleeRange /* && playerContext === "HUMAN"*/) {
      setMeleeRange(false);
      send({ type: MOVE_EVENT });
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
      isDead={state.matches(DEATH_STATE)}
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
