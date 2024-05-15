import { Euler, Quaternion, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Keys } from "../lib/keysMap";
import { RapierRigidBody } from "@react-three/rapier";
import getPlayerImpulse from "../lib/getPlayerImpulse";
import { useKeyboardControls } from "@react-three/drei";
import { cameraLookAt } from "../lib/cameraLookAt";
import { getVector3From } from "../lib/getVector3From";
import { FSMStates } from "../lib/getBaseMachineInput";
// import { useGameStore } from "./useGameStore";
import { canMove, canTransitionState } from "../lib/FSMHelper";
import updateOrientation from "../lib/updateOrientation";
import {
  IDLE_EVENT,
  MOVE_EVENT,
  USING_SKILL_1_STATE,
  USING_SKILL_3_STATE,
  USING_SKILL_1_EVENT,
  USING_SKILL_2_EVENT,
  USING_SKILL_3_EVENT,
} from "../machines/createBaseFSMInput";

const getFSMEvent = (keys: Keys) => {
  const { forward, backward, leftward, rightward, skill_1, skill_2, skill_3 } =
    keys;
  if (forward || backward || leftward || rightward) {
    return MOVE_EVENT;
  }

  if (skill_3) return USING_SKILL_3_EVENT;

  if (skill_2) return USING_SKILL_2_EVENT;

  if (skill_1) return USING_SKILL_1_EVENT;

  return IDLE_EVENT;
};

export const usePlayerLogic = (params: {
  useOrbitControls: boolean;
  actor: any;
}) => {
  const { useOrbitControls, actor } = params;

  const playerRigidBodyReference = useRef<RapierRigidBody>(null);
  const [orientation, setOrientation] = useState(Math.PI);
  const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];

  useFrame((rootState, delta) => {
    if (!playerRigidBodyReference.current) return;
    const actorCurrentState = actor.getSnapshot();
    const keys = getKeys() as unknown as Keys;

    // if (canTransitionState(state.value as FSMStates)) {
    actor.send({ type: getFSMEvent(keys) });
    // }

    // ! FIX CAN MOVE
    // if (canMove(state.value as FSMStates)) {
    const impulse = getPlayerImpulse(keys, delta);

    playerRigidBodyReference.current.setLinvel(impulse, false);
    updateOrientation(orientation, setOrientation, keys);
    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
    playerRigidBodyReference.current.setRotation(quaternionRotation, false);

    if (actorCurrentState.value === USING_SKILL_3_STATE) {
      const impulseVector = new Vector3(0, 0, 5);
      impulseVector.applyAxisAngle(new Vector3(0, 1, 0), orientation);
      playerRigidBodyReference.current.setLinvel(impulseVector, false);
    }

    cameraLookAt({
      rootState,
      position: getVector3From(playerRigidBodyReference.current.translation()),
      rotation: getVector3From(playerRigidBodyReference.current.rotation()),
    });
  });

  return {
    playerRigidBodyReference,
    orientation,
    setOrientation,
    getKeys,
  };
};
