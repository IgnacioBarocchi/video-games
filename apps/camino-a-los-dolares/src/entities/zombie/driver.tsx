import { useMachine } from "@xstate/react";
import {
  ATTACK_EVENT,
  CHASE_EVENT,
  HIT_EVENT,
  HIT_STATE,
  INACTIVE_STATE,
  enemyMachine,
} from "./machine/zombie-machine";
import { ControlledZombieBody } from "./controlled-body";
import { payloadIsThePlayer } from "../../lib/rigibBodyHelper";
import { CollisionPayload } from "@react-three/rapier";
import { throttle } from "../../lib/throttle";
import { ZOMBIE_IMPACT_COST } from "../../constants";
import useGameStore from "../../store/store";
import { memo } from "react";
import { ZombieModel } from "./model";

const throttleTime = 0;
export const ZombieDriver = memo<{ position: [number, number, number] }>(
  ({ position }) => {
    const [state, send] = useMachine(enemyMachine);
    const { setCarNotification, subMoney } = useGameStore((gameState) => ({
      setCarNotification: gameState.setCarNotification,
      subMoney: gameState.subMoney,
    }));

    const handleChasePlayer = throttle((payload: CollisionPayload) => {
      if (state.matches(HIT_STATE)) {
        return;
      }

      if (payloadIsThePlayer(payload)) {
        send({ type: CHASE_EVENT });
      }
    }, throttleTime);

    const handleAttackPlayer = throttle((payload: CollisionPayload) => {
      if (state.matches(HIT_STATE)) {
        return;
      }

      if (payloadIsThePlayer(payload)) {
        send({ type: ATTACK_EVENT });
      }
    }, throttleTime);

    const handleHitByPlayer = throttle((payload: CollisionPayload) => {
      if (state.matches(HIT_STATE)) {
        return;
      }

      if (
        payloadIsThePlayer(payload) &&
        Math.abs(payload.rigidBody?.linvel().z!) > 2
      ) {
        send({ type: HIT_EVENT });
        setCarNotification({ type: "HIT ZOMBIE", cost: ZOMBIE_IMPACT_COST });
        subMoney(ZOMBIE_IMPACT_COST);
      }
    }, 0);

    if (state.matches(INACTIVE_STATE)) {
      return null;
    }

    return (
      <ControlledZombieBody
        position={position}
        isHit={state.matches(HIT_STATE)}
        stateValue={state.value}
        handleChasePlayer={handleChasePlayer}
        handleAttackPlayer={handleAttackPlayer}
        handleHitByPlayer={handleHitByPlayer}
      >
        <ZombieModel state={state.value} />
      </ControlledZombieBody>
    );
  }
);
