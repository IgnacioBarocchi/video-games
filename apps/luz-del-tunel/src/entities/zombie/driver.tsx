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
import {
  CollisionPayload,
  IntersectionEnterPayload,
  RapierRigidBody,
} from "@react-three/rapier";
import { throttle } from "../../lib/throttle";
import { ZOMBIE_IMPACT_COST } from "../../constants";
import useGameStore from "../../store/store";
import { memo, useEffect, useMemo, useRef } from "react";
import { ZombieModel } from "./model";
import { AnimationAction, Group, LoopOnce } from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import zombieModelFile from "../../assets/models/Zombie/Zombie.gltf";

type ActionName = "Attack" | "Hit By Car" | "Run";
type GLTFActions = Record<ActionName, AnimationAction>;

const throttleTime = 0;
export const ZombieDriver = memo<{ position: [number, number, number] }>(
  ({ position }) => {
    const [state, send] = useMachine(enemyMachine);

    const { scene, materials, animations } = useGLTF(zombieModelFile);

    const ref = useRef({
      zombieRigidBody: useRef<RapierRigidBody | null>(null),
      carRigidBody: useRef<RapierRigidBody | null>(null),
      zombieModel: useRef<Group>(null),
    });

    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

    const { nodes } = useGraph(clone);

    const { actions } = useAnimations<GLTFActions>(
      animations,
      ref.current?.zombieModel
    );

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
        actions.Run.stop().reset().fadeIn(0.2).play();
        actions.Attack?.stop();
      }
    }, throttleTime);

    const handleAttackPlayer = throttle((payload: CollisionPayload) => {
      if (state.matches(HIT_STATE)) {
        return;
      }

      if (payloadIsThePlayer(payload)) {
        send({ type: ATTACK_EVENT });
        actions.Attack.stop().reset().fadeIn(0.2).play();
        actions.Run?.stop();
      }
    }, throttleTime);

    const handleHitByPlayer = throttle((payload: CollisionPayload) => {
      if (state.matches(HIT_STATE)) {
        return;
      }

      if (
        payloadIsThePlayer(payload) &&
        Math.abs(payload.rigidBody?.linvel().z!) > 10
      ) {
        send({ type: HIT_EVENT });
        setCarNotification({ type: "HIT ZOMBIE", cost: ZOMBIE_IMPACT_COST });
        subMoney(ZOMBIE_IMPACT_COST);
        actions["Hit By Car"].setLoop(LoopOnce, 1);
        actions["Hit By Car"].clampWhenFinished = true;
        actions["Hit By Car"].enabled = true;
        actions["Hit By Car"].timeScale = 3;
        actions["Hit By Car"].stop().reset().fadeIn(0.2).play();
        actions.Run.stop();
        actions.Attack.stop();
      }
    }, 0);

    const handleRegisterPlayer = throttle(
      (payload: IntersectionEnterPayload) => {
        if (state.matches(HIT_STATE)) {
          return;
        }

        if (payloadIsThePlayer(payload) && payload.other.rigidBody) {
          ref.current.carRigidBody.current = payload.other.rigidBody;
        }
      },
      0
    );

    const handleUnregisterPlayer = throttle(
      (payload: IntersectionEnterPayload) => {
        if (state.matches(HIT_STATE)) {
          return;
        }

        if (payloadIsThePlayer(payload)) {
          ref.current.carRigidBody.current = null;
        }
      },
      0
    );

    useEffect(() => {
      actions?.Run?.play();
    }, []);

    if (state.matches(INACTIVE_STATE)) {
      setTimeout(() => {
        ref.current = null;
      }, 1000);

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
        handleRegisterPlayer={handleRegisterPlayer}
        handleUnregisterPlayer={handleUnregisterPlayer}
        ref={ref}
      >
        <ZombieModel ref={ref} nodes={nodes} materials={materials} />
      </ControlledZombieBody>
    );
  }
);
