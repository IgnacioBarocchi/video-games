import { Vector3 } from 'three';
import { getDistance } from '../lib/getDistance';
import { goToTarget } from '../lib/goToTarget';
import { MutableRefObject, useRef } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { Area } from '../components/Systems/EnemyRegion';
import { canTransitionState } from '../lib/FSMHelper';
import { FSMContext, FSMEvents, FSMStates } from '../lib/getBaseMachineInput';
import { State } from 'xstate';
import {
  INTERACTION_RING_RADIUS,
  NPC_SPEED,
  NPC_COMBAT_STATUS_TIME,
} from '../constants/entities';

const getRandomAttack = () =>
  ['use_skill_1', 'use_skill_2', 'use_skill_3', 'use_skill_4'][
    Number(parseInt(String(Math.random() * 4)))
  ] as FSMEvents;

export type CombatInformation = {
  selfPosition: Vector3;
  playerIsAlive: boolean;
  playerPosition: Vector3;
  distanceToPlayer: number;
  delta: number;
};

export const useEnemyNPCBehaviorHandlers = (hookParams: {
  region: { area: Area; positions: Vector3[] };
  NPCRigidBodyReference: MutableRefObject<RapierRigidBody>;
  movement: 'LINEAR VELOCITY' | 'IMPULSE';
  state: State<FSMContext>;
  send: (
    event:
      | FSMEvents
      | {
          type: 'setCombatStatus';
          combatStatus: FSMContext['combatStatus'];
        },
  ) => void;
  playerIsReachableReference?: MutableRefObject<boolean | undefined>;
}) => {
  const {
    region,
    NPCRigidBodyReference,
    movement,
    state,
    send,
    playerIsReachableReference,
  } = hookParams;

  const roamingPositionRef = useRef(region.positions[0]);
  const elapsedRoamTime = useRef(0);
  const elapsedChaseTime = useRef(0);
  const elapsedEscapeTime = useRef(0);
  const managedToEscapeOnce = useRef(false);

  const updateRoamingPosition = () => {
    roamingPositionRef.current =
      region.positions[
        Number(parseInt(String(Math.random() * region.positions.length)))
      ];
  };

  const moveTowards = (
    target: 'player' | 'position',
    params: CombatInformation,
  ) => {
    send('move');
    goToTarget({
      sourcePosition: params.selfPosition,
      targetPosition:
        target === 'player'
          ? params.playerPosition
          : roamingPositionRef.current,
      sourceRigidBody: NPCRigidBodyReference.current,
      speed: NPC_SPEED,
      style: movement,
    });
  };

  const handleRoamingState = (params: CombatInformation) => {
    // console.log('handleRoamingState');
    const { delta, selfPosition, playerPosition } = params;
    elapsedRoamTime.current += delta;

    const distanceToRoamingPoint = getDistance({
      sourcePosition: selfPosition,
      targetPosition: playerPosition,
    });

    if (
      elapsedRoamTime.current >
        NPC_COMBAT_STATUS_TIME.TIME_TO_SWITCH_POSITION ||
      distanceToRoamingPoint < INTERACTION_RING_RADIUS
    ) {
      updateRoamingPosition();
      elapsedRoamTime.current = 0;
    }

    moveTowards('position', params);
    if (playerIsReachableReference?.current) {
      send({ type: 'setCombatStatus', combatStatus: 'fighting' });
    }
  };

  const handleCombatState = (params: CombatInformation) => {
    // console.log('handleCombatState');
    const { playerIsAlive, distanceToPlayer } = params;

    const shouldStartEscaping =
      !managedToEscapeOnce.current &&
      state.context.currentHP <= 10 &&
      state.context.currentHP > 0;

    if (shouldStartEscaping) {
      send({ type: 'setCombatStatus', combatStatus: 'escaping' });
      return;
    }

    const shouldStartChasing =
      !playerIsReachableReference?.current &&
      state.context.combatStatus !== 'chasing';

    if (shouldStartChasing) {
      send({ type: 'setCombatStatus', combatStatus: 'chasing' });
    }

    if (
      distanceToPlayer < INTERACTION_RING_RADIUS &&
      canTransitionState(state.value as FSMStates)
    ) {
      send(playerIsAlive ? getRandomAttack() : 'provoke');
    } else {
      moveTowards('player', params);
    }

    const shouldStartRoaming =
      !playerIsAlive &&
      elapsedRoamTime.current >
        NPC_COMBAT_STATUS_TIME.TIME_TO_START_ROAMING_AGAIN;

    if (shouldStartRoaming) {
      elapsedRoamTime.current = 0;
      send({ type: 'setCombatStatus', combatStatus: 'roaming' });
      return;
    }
  };

  const handleEscapeState = (params: CombatInformation) => {
    // console.log('handleEscapeState');
    const { delta } = params;
    elapsedEscapeTime.current += delta;
    elapsedRoamTime.current += delta;

    if (
      elapsedEscapeTime.current > NPC_COMBAT_STATUS_TIME.TIME_TO_STOP_ESCAPING
    ) {
      elapsedEscapeTime.current = 0;
      managedToEscapeOnce.current = true;

      send({ type: 'setCombatStatus', combatStatus: 'roaming' });
      return;
    }

    if (
      elapsedRoamTime.current > NPC_COMBAT_STATUS_TIME.TIME_TO_SWITCH_POSITION
    ) {
      updateRoamingPosition();
      elapsedRoamTime.current = 0;
    }

    moveTowards('position', params);
  };

  const handleChaseState = (params: CombatInformation) => {
    // console.log('handleChaseState');
    const { playerIsAlive, distanceToPlayer, delta } = params;
    elapsedChaseTime.current += delta;

    const shouldStartRoaming =
      !playerIsAlive ||
      distanceToPlayer > 10 ||
      elapsedChaseTime.current >
        NPC_COMBAT_STATUS_TIME.TIME_TO_START_ROAMING_AGAIN;

    if (shouldStartRoaming) {
      send({ type: 'setCombatStatus', combatStatus: 'roaming' });
      elapsedChaseTime.current = 0;
    }

    const shouldStartFighting =
      playerIsAlive &&
      distanceToPlayer <= INTERACTION_RING_RADIUS &&
      playerIsReachableReference?.current;

    if (shouldStartFighting) {
      send({ type: 'setCombatStatus', combatStatus: 'fighting' });
    }

    moveTowards('player', params);
  };

  return {
    handleRoamingState,
    handleCombatState,
    handleEscapeState,
    handleChaseState,
  };
};
