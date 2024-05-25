import { MutableRefObject, useRef, useContext } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { getVector3From } from "../../lib/getVector3From";
import { goToTarget } from "../../lib/goToTarget";
import { Context } from "../../providers/player-actor-provider";
import {
  DEATH_STATE,
  IDLE_STATE,
  MOVE_EVENT,
  MOVE_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
} from "../../machines/createBaseFSMInput";

export const useEnemyNPCLogic = (params: {
  NPCActor: BaseFSM;
  movement: "LINEAR VELOCITY" | "IMPULSE";
  playerRigidBody: MutableRefObject<RapierRigidBody> | null;
}) => {
  const playerActor = useContext(Context);

  const NPCRigidBodyReference =
    useRef<RapierRigidBody>() as MutableRefObject<RapierRigidBody>;

  useFrame(() => {
    const NPCActorCurrentState = params.NPCActor.getSnapshot();
    const playerActorCurrentState = playerActor?.getSnapshot();

    if (NPCActorCurrentState.status === "error") {
      throw new Error(NPCActorCurrentState.status);
    }

    if (
      NPCActorCurrentState.status === "done" ||
      [
        DEATH_STATE,
        REACTING_TO_SKILL_2_STATE,
        REACTING_TO_SKILL_1_STATE,
      ].includes(NPCRigidBodyReference.current)
    ) {
      return;
    }

    const currentPlayerRigidBody = params?.playerRigidBody?.current;
    // console.log(currentPlayerRigidBody);

    //! playerActorCurrentState?.context.rigidBody;

    if (!currentPlayerRigidBody?.translation?.()) {
      return;
    }

    const selfPosition = getVector3From(
      NPCRigidBodyReference.current.translation()
    );

    const playerPosition = getVector3From(
      currentPlayerRigidBody?.translation?.() || { x: 0, y: 0, z: 0 }
    );

    if (NPCActorCurrentState.value === MOVE_STATE) {
      goToTarget({
        sourcePosition: selfPosition,
        targetPosition: playerPosition,
        sourceRigidBody: NPCRigidBodyReference.current,
        speed: 10,
        style: params.movement,
      });
    } else if (NPCActorCurrentState.value === IDLE_STATE) {
      params.NPCActor.send({ type: MOVE_EVENT });
    }
  });

  return {
    NPCRigidBodyReference,
  };
};
