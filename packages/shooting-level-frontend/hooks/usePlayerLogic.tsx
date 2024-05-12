import { Euler, Quaternion, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Keys } from '../lib/keysMap';
import { RapierRigidBody } from '@react-three/rapier';
import getPlayerImpulse from '../lib/getPlayerImpulse';
import { useKeyboardControls } from '@react-three/drei';
import { cameraLookAt } from '../lib/cameraLookAt';
import { getVector3From } from '../lib/getVector3From';
import { FSMStates } from '../lib/getBaseMachineInput';
import { useGameStore } from './useGameStore';
import { canMove, canTransitionState } from '../lib/FSMHelper';
import updateOrientation from '../lib/updateOrientation';

const getFSMEvent = (keys: Keys) => {
  const {
    forward,
    backward,
    leftward,
    rightward,
    skill_1,
    skill_2,
    skill_3,
    skill_4,
  } = keys;
  if (forward || backward || leftward || rightward) {
    return 'move';
  }

  if (skill_4) return 'use_skill_4';

  if (skill_3) return 'use_skill_3';

  if (skill_2) return 'use_skill_2';

  if (skill_1) return 'use_skill_1';

  return 'idle';
};

export const usePlayerLogic = (params: {
  useOrbitControls: boolean;
  machine: any;
}) => {
  const {
    useOrbitControls,
    machine: [state, send],
  } = params;

  const { debugApp, setDebugApp } = useGameStore((state) => ({
    debugApp: state.debugApp,
    setDebugApp: state.setDebugApp,
  }));

  const playerRigidBodyReference = useRef<RapierRigidBody>(null);
  const [orientation, setOrientation] = useState(Math.PI);
  const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];

  useFrame((rootState, delta) => {
    if (!playerRigidBodyReference.current) return;

    const keys = getKeys() as unknown as Keys;
    if (keys.debug_app) {
      setDebugApp(!debugApp);
    }

    if (canTransitionState(state.value as FSMStates)) {
      send(getFSMEvent(keys));
    }

    if (canMove(state.value as FSMStates)) {
      const impulse = getPlayerImpulse(keys, delta);

      playerRigidBodyReference.current.setLinvel(impulse, false);
      updateOrientation(orientation, setOrientation, keys);
      const quaternionRotation = new Quaternion();
      quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
      playerRigidBodyReference.current.setRotation(quaternionRotation, false);

      if (state.matches('Use skill 3')) {
        const impulseVector = new Vector3(0, 0, 5);
        impulseVector.applyAxisAngle(new Vector3(0, 1, 0), orientation);
        playerRigidBodyReference.current.setLinvel(impulseVector, false);
      }
    }

    if (!useOrbitControls) {
      cameraLookAt({
        rootState,
        position: getVector3From(
          playerRigidBodyReference.current.translation(),
        ),
        rotation: getVector3From(playerRigidBodyReference.current.rotation()),
      });
    }
  });

  return {
    playerRigidBodyReference,
    orientation,
    setOrientation,
    getKeys,
  };
};
