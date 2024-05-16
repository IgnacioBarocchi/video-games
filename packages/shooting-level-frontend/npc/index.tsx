import { useContext, useRef, useEffect, useMemo } from "react";
import { GroupProps, useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
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
  MOVE_EVENT,
  REACTING_TO_SKILL_2_EVENT,
  FSMStates,
  INACTIVE_STATE,
} from "../machines/createBaseFSMInput";
import { NPCRigidBody } from "./NPCRigidBody";
import { ActionName, ZombieModel } from "./ZombieModel";
import { ZombieMachine } from "../machines/zombie-machine";
import { useEnemyNPCLogic } from "../hooks/useEnemyNPCLogic";
import zombie3DMFile from "../assets/models/Zombie_Male.glb";
import { createActor } from "xstate";
import { Context } from "../providers/player-context-provider";
import { useSelector } from "@xstate/react";

const statusSelector = (state) => {
  return state.value === INACTIVE_STATE;
};

export const NPC = () => {
  const NPCActor = createActor(ZombieMachine);
  const isInactive = useSelector(NPCActor, statusSelector);
  const playerActor = useContext(Context);

  const group = useRef<GroupProps>();
  const { scene, materials, animations } = useGLTF(zombie3DMFile) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations<GLTFActions>(animations, group);

  const { NPCRigidBodyReference } = useEnemyNPCLogic({
    NPCActor,
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
    // NPCActor.send({ type: MOVE_EVENT });
  }, []);

  const handleCollisionWithPlayer = (payload) => {
    if (payload.other.rigidBodyObject.name === "Player") {
      NPCActor.send({ type: USING_SKILL_2_EVENT });
      playerActor.send({ type: REACTING_TO_SKILL_2_EVENT });
    }
  };

  if (isInactive) {
    return null;
  }

  return (
    <NPCRigidBody
      ref={NPCRigidBodyReference}
      onCollisionEnter={handleCollisionWithPlayer}
      actor={NPCActor}
    >
      <ZombieModel
        ref={group}
        nodes={nodes}
        materials={materials}
        actions={actions}
        position={[0, 0, 0]}
      />
    </NPCRigidBody>
  );
};
