import { MutableRefObject, useRef } from "react";

import { RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { getDistance } from "../lib/getDistance";
import { getVector3From } from "../lib/getVector3From";
import { Context } from "../providers/PlayerProvider";
import { RootState } from "@react-three/fiber/dist/declarations/src/core/store";
import { Vector3 } from "three";
import { Area } from "../components/Systems/EnemyRegion";
import {
  CombatInformation,
  useEnemyNPCBehaviorHandlers,
} from "./useEnemyNPCBehaviorHandlers";
import { BaseFSM } from "../lib/getBaseMachineInput";
import { useGameStore } from "./useGameStore";

export const useEnemyNPCLogic = (params: {
  machine: BaseFSM;
  region: { area: Area; positions: Vector3[] };
  movement: "LINEAR VELOCITY" | "IMPULSE";
  playerIsReachableReference?: MutableRefObject<boolean | undefined>;
  activeNPCReference?: MutableRefObject<boolean | undefined>;
}) => {
  const { setEnemiesCount, enemiesCount } = useGameStore((state) => ({
    setEnemiesCount: state.setEnemiesCount,
    enemiesCount: state.enemiesCount,
  }));

  const [playerState] = Context.useActorRef();

  const {
    machine: [state, send],
    region,
    movement,
    playerIsReachableReference,
    activeNPCReference,
  } = params;

  const NPCRigidBodyReference =
    useRef<RapierRigidBody>() as MutableRefObject<RapierRigidBody>;

  const {
    handleRoamingState,
    handleCombatState,
    handleChaseState,
    handleEscapeState,
  } = useEnemyNPCBehaviorHandlers({
    region,
    NPCRigidBodyReference,
    movement,
    state,
    send,
    playerIsReachableReference,
  });

  useFrame((_: RootState, delta: number) => {
    // !might break the code
    // if (state.matches('Death') && activeNPCReference?.current) {
    //   const result = enemiesCount + 1;
    //   setEnemiesCount(result);
    //   activeNPCReference.current = false;
    //   window.THREE.Cache.clear();
    //   return;
    // }

    if (
      state.matches("Death") ||
      state.matches("React to skill 2") ||
      !NPCRigidBodyReference.current
    ) {
      return;
    }

    const selfPosition = getVector3From(
      NPCRigidBodyReference.current.translation()
    );

    const playerPosition = getVector3From(
      (playerState.context.rigidBody! as RapierRigidBody).translation()
    );

    const combatInformation: CombatInformation = {
      selfPosition: getVector3From(NPCRigidBodyReference.current.translation()),
      playerIsAlive: playerState.context.currentHP > 0,
      playerPosition: getVector3From(
        (playerState.context.rigidBody! as RapierRigidBody).translation()
      ),
      distanceToPlayer: getDistance({
        sourcePosition: selfPosition,
        targetPosition: playerPosition,
      }),
      delta,
    };

    const handlers = {
      roaming: handleRoamingState,
      fighting: handleCombatState,
      chasing: handleChaseState,
      escaping: handleEscapeState,
    };

    // @ts-ignore
    handlers[state.context.combatStatus](combatInformation);
  });

  return {
    NPCRigidBodyReference,
  };
};
