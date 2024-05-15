// todo: remove unnecessary calculations of behavior handlers
import { MutableRefObject, useRef, useContext } from "react";

import { RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

import { getVector3From } from "../lib/getVector3From";
import { BaseFSM } from "../lib/getBaseMachineInput";
import { Context } from "../providers/player-context-provider";
import { goToTarget } from "../lib/goToTarget";
import {
  DEATH_STATE,
  IDLE_STATE,
  MOVE_EVENT,
  MOVE_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
} from "../machines/createBaseFSMInput";

export const useEnemyNPCLogic = (params: {
  NPCActor: BaseFSM;
  movement: "LINEAR VELOCITY" | "IMPULSE";
  playerIsReachableReference?: MutableRefObject<boolean | undefined>;
}) => {
  const playerActor = useContext(Context);

  const NPCRigidBodyReference =
    useRef<RapierRigidBody>() as MutableRefObject<RapierRigidBody>;

  useFrame(() => {
    const NPCActorCurrentState = params.NPCActor.getSnapshot();
    const playerActorCurrentState = playerActor.getSnapshot();
    const playerRigidBody = playerActorCurrentState.context.rigidBody;
    // console.log(NPCActorCurrentState.status);
    if (NPCActorCurrentState.status === "error") {
      throw new Error(NPCActorCurrentState.status);
    }

    if (NPCActorCurrentState.status === "done") {
      return;
    }

    if (
      NPCActorCurrentState.value === DEATH_STATE ||
      NPCActorCurrentState.value === REACTING_TO_SKILL_2_STATE ||
      NPCActorCurrentState.value === REACTING_TO_SKILL_1_STATE ||
      !NPCRigidBodyReference.current ||
      !playerRigidBody
    ) {
      return;
    }

    const selfPosition = getVector3From(
      NPCRigidBodyReference.current.translation()
    );

    const playerPosition = getVector3From(
      (playerRigidBody! as RapierRigidBody).translation()
    );

    if (NPCActorCurrentState.value === REACTING_TO_SKILL_1_STATE) {
      alert("M");
      return;
    }

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

// const actorRef = Context.useActorRef();
// console.log(actorRef);
// const actorRefLogic = actorRef.logic;
// console.log(actorRefLogic);
// playerState.getSnapsho()
// const [playerState] = useActor(actorRefLogic);
// ***
// const {
//   handleRoamingState,
//   handleCombatState,
//   handleChaseState,
//   handleEscapeState,
// } = useEnemyNPCBehaviorHandlers({
//   region,
//   NPCRigidBodyReference,
//   movement,
//   state,
//   send,
//   playerIsReachableReference,
// });
// ***
// const combatInformation: CombatInformation = {
//   selfPosition: getVector3From(NPCRigidBodyReference.current.translation()),
//   playerIsAlive: playerState.context.currentHP > 0,
//   playerPosition: getVector3From(
//     (playerState.context.rigidBody! as RapierRigidBody).translation()
//   ),
//   distanceToPlayer: getDistance({
//     sourcePosition: selfPosition,
//     targetPosition: playerPosition,
//   }),
//   delta,
// };
// ***
// const handlers = {
//   roaming: handleRoamingState,
//   fighting: handleCombatState,
//   chasing: handleChaseState,
//   escaping: handleEscapeState,
// };
// ***
// // @ts-ignore
// handlers[state.context.combatStatus](combatInformation);
// import { getDistance } from "../lib/getDistance";
// // import { Area } from "../components/Systems/EnemyRegion";
// import {
//   CombatInformation,
//   useEnemyNPCBehaviorHandlers,
// } from "./useEnemyNPCBehaviorHandlers";
