import { useActor } from "@xstate/react";
import { useContext, useCallback, useRef, useEffect, useMemo } from "react";
import { Context } from "../providers/player-context-provider";
import {
  GLTFActions,
  GLTFResult,
  MaleCharacter3DModel,
} from "./MaleCharacter3DModel";
import { usePlayerLogic } from "../hooks/usePlayerLogic";
import { CharacterRigidBody } from "./CharacterRigidBody";
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
} from "../machines/createBaseFSMInput";
import character3DModelFile from "../assets/models/Male_Character.glb";
import { Attachments } from "./Attachments";

export const Player = ({ onLoad }) => {
  const playerActor = useContext(Context);
  const group = useRef<GroupProps>();
  const { scene, materials, animations } = useGLTF(
    character3DModelFile
  ) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations<GLTFActions>(animations, group);
  const { playerRigidBodyReference } = usePlayerLogic({
    useOrbitControls: false,
    actor: playerActor,
  });

  useEffect(() => {
    if (group?.current && playerRigidBodyReference?.current && playerActor) {
      nodes.BULLET_TRAIL_MESH.visible = false;
      nodes.BULLET_TRAIL_MESH_1.visible = false;

      const milliseconds = 1000;
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
        type: "SET_CONTEXT",
        actions,
        mesh: group.current,
        rigidBody: playerRigidBodyReference.current,
        animationNameByFSMState,
        characterFSMDurations,
      });

      playerActor.start();

      setTimeout(() => onLoad(), 1000);
    }
  }, []);

  return (
    <CharacterRigidBody ref={playerRigidBodyReference} position={[-7, 0, -4]}>
      <MaleCharacter3DModel
        ref={group}
        nodes={nodes}
        materials={materials}
        actions={actions}
      />
      <Attachments nodes={nodes} />
    </CharacterRigidBody>
  );
};
