import { RapierRigidBody } from '@react-three/rapier';
import { AnimationAction, Group, Object3DEventMap } from 'three';
import { State, StateValue, assign } from 'xstate';
import {
  blendAnimationTransition,
  easeOutAnimation,
  playFinalAnimation,
  playOneShotAnimation,
  stopAll,
} from './animationHelper';
import { EntityRecord } from '../data/types';

export const FSMSkills = [
  'Use skill 1',
  'Use skill 2',
  'Use skill 3',
  'Use skill 4',
];

export const FSMReactions = [
  'React to skill 1',
  'React to skill 2',
  'React to skill 3',
  'React to skill 4',
];

export type FSMStates = (
  | 'Idle'
  | 'Move'
  | 'Use skill 1'
  | 'Use skill 2'
  | 'Use skill 3'
  | 'Use skill 4'
  | 'React to skill 1'
  | 'React to skill 2'
  | 'React to skill 3'
  | 'React to skill 4'
  | 'Engage'
  | 'Provoke'
  | 'Death'
) &
  StateValue;

export type FSMEvents =
  | 'idle'
  | 'engage'
  | 'move'
  | 'provoke'
  | 'death'
  | 'use_skill_1'
  | 'use_skill_2'
  | 'use_skill_3'
  | 'use_skill_4'
  | 'react_to_skill_1'
  | 'react_to_skill_2'
  | 'react_to_skill_3'
  | 'react_to_skill_4';

export type FSMContext = {
  initialHP: number;
  currentHP: number;
  damageTaken: number;
  rigidBody: RapierRigidBody | null;
  mesh: Group<Object3DEventMap> | null;
  actions: { [x: string]: AnimationAction } | null;
  combatStatus:
    | 'roaming'
    | 'escaping'
    | 'chasing'
    | 'fighting'
    | 'user controlled';
};

export type BaseFSM = [
  state: State<FSMContext>,
  send: (
    event:
      | FSMEvents
      | {
          type: 'setCombatStatus';
          combatStatus: FSMContext['combatStatus'];
        }
      | { type: 'setActions'; actions: { [x: string]: AnimationAction | null } }
      | { type: 'set3DMesh'; mesh: Group<Object3DEventMap> | null }
      | { type: 'setRigidBody'; rigidBody: RapierRigidBody }
      | {
          type:
            | 'react_to_skill_1'
            | 'react_to_skill_2'
            | 'react_to_skill_3'
            | 'react_to_skill_4';
          damageTaken: number;
        },
  ) => void,
];

export const getMachineInput = (params: {
  id: string;
  description: string;
  entityRecord: EntityRecord;
}) => {
  const {
    id = 'Base',
    description = 'Super type that respects LSP',
    entityRecord: {
      animationDurationByFSMState,
      animationNameByFSMState,
      soundPathByFSMState,
    },
  } = params;

  const getSkillOrReactionEntry =
    (state: FSMStates) => (context: FSMContext) => {
      if (context.actions) {
        const action =
          context.actions[animationNameByFSMState.get(state)!] ??
          context.actions[animationNameByFSMState.get('Idle')!];

        // if (!action) {
        // alert(description);
        // }

        easeOutAnimation(context.actions[animationNameByFSMState.get('Idle')!]);
        easeOutAnimation(context.actions[animationNameByFSMState.get('Move')!]);
        playOneShotAnimation(action);
        const stateAudio = new Audio(soundPathByFSMState.get(state));
        stateAudio.play();
        setTimeout(() => {
          easeOutAnimation(action);
        }, animationDurationByFSMState.get(state));
      }
    };

  const setCombatStatus = {
    actions: assign({
      combatStatus: (
        _,
        event: { combatStatus: FSMContext['combatStatus'] },
      ) => {
        return event.combatStatus;
      },
    }),
  };

  const setRigidBody = {
    actions: assign({
      rigidBody: (_, event: { rigidBody: RapierRigidBody }) => {
        return event.rigidBody;
      },
    }),
  };

  const setActions = {
    actions: assign({
      actions: (_, event: FSMContext) => {
        if (event.actions) {
          event.actions[animationNameByFSMState.get('Idle')!]?.play();
          return event.actions;
        }
      },
    }),
  };

  const set3DMesh = {
    actions: assign({
      mesh: (_, event: FSMContext) => {
        if (event.mesh) {
          return event.mesh;
        }
      },
    }),
  };

  const getTransitions = (blockedEvents: FSMEvents[]) => {
    const states = {
      idle: {
        target: 'Idle',
      },
      engage: {
        target: 'Engage',
      },
      move: {
        target: 'Move',
      },
      provoke: {
        target: 'Provoke',
      },
      death: {
        target: 'Death',
      },
      use_skill_1: {
        target: 'Use skill 1',
      },
      use_skill_2: {
        target: 'Use skill 2',
      },
      use_skill_3: {
        target: 'Use skill 3',
      },
      use_skill_4: {
        target: 'Use skill 4',
      },
      react_to_skill_1: {
        target: 'React to skill 1',
      },
      react_to_skill_2: {
        target: 'React to skill 2',
      },
      react_to_skill_3: {
        target: 'React to skill 3',
      },
      react_to_skill_4: {
        target: 'React to skill 4',
      },
      setRigidBody,
      setCombatStatus,
      setActions,
      set3DMesh,
    };

    blockedEvents.forEach((state) => {
      delete states[state];
    });

    return states;
  };

  const getOutboundInteractionsChildNodes = (state: FSMStates) => {
    return {
      entry: getSkillOrReactionEntry(state),
      on: {
        react_to_skill_1: {
          target: 'React to skill 1',
        },
        react_to_skill_2: {
          target: 'React to skill 2',
        },
        react_to_skill_3: {
          target: 'React to skill 3',
        },
        react_to_skill_4: {
          target: 'React to skill 4',
        },
        setCombatStatus,
      },
      after: {
        [animationDurationByFSMState.get(state)!]: 'Idle',
      },
    };
  };

  const getInboundInteractionsChildNodes = (state: FSMStates) => {
    return {
      // todo: Fix this
      entry: [
        `reactToSkill${state[15]}`,
        assign({
          currentHP: (context: FSMContext, event: FSMContext) => {
            context.damageTaken = event.damageTaken;
            return context.currentHP - event.damageTaken;
          },
        }),
      ],
      on: {
        use_skill_1: {
          target: 'Use skill 1',
        },
        use_skill_2: {
          target: 'Use skill 2',
        },
        use_skill_3: {
          target: 'Use skill 3',
        },
        use_skill_4: {
          target: 'Use skill 4',
        },
        setCombatStatus,
      },
      always: [
        {
          target: 'Death',
          cond: (context: FSMContext) => context.currentHP <= 0,
        },
      ],
      after: {
        [animationDurationByFSMState.get(state)!]: 'Idle',
      },
    };
  };

  const getMoveOrIdleChildNodes = (state: 'Move' | 'Idle') => {
    const outgoingStatus = state === 'Idle' ? 'Move' : 'Idle';

    return {
      entry: (context: FSMContext) => {
        if (context.actions) {
          const action = context.actions[animationNameByFSMState.get(state)!];
          blendAnimationTransition(action);
          easeOutAnimation(
            context.actions[animationNameByFSMState.get(outgoingStatus)!],
          );
        }
      },
      on: getTransitions([state.toLocaleLowerCase() as FSMEvents]),
    };
  };

  const getFinalChildNode = () => ({
    entry: (context: FSMContext) => {
      if (context.actions) {
        stopAll(
          [
            ...FSMSkills,
            ...FSMReactions,
            'Move',
            'Idle',
            'Provoke',
            'Engage',
          ].map(
            (state) =>
              context.actions![
                animationNameByFSMState.get(state as FSMStates)!
              ],
          ),
        );

        playFinalAnimation(
          context.actions[animationNameByFSMState.get('Death')!],
        );
      }
    },
    type: 'final',
    description: 'The character has died and is no longer active in the game.',
  });

  const machineInput = {
    predictableActionArguments: true,
    context: {
      initialHP: 100,
      currentHP: 100,
      damageTaken: 0,
      rigidBody: null,
      actions: null,
      combatStatus: 'roaming',
    },
    id,
    description,
    initial: 'Idle',
    states: {
      Idle: getMoveOrIdleChildNodes('Idle'),
      Move: getMoveOrIdleChildNodes('Move'),
      'Use skill 1': getOutboundInteractionsChildNodes('Use skill 1'),
      'Use skill 2': getOutboundInteractionsChildNodes('Use skill 2'),
      'Use skill 3': getOutboundInteractionsChildNodes('Use skill 3'),
      'Use skill 4': getOutboundInteractionsChildNodes('Use skill 4'),
      Engage: getOutboundInteractionsChildNodes('Engage'),
      Provoke: getOutboundInteractionsChildNodes('Provoke'),
      'React to skill 1': getInboundInteractionsChildNodes('React to skill 1'),
      'React to skill 2': getInboundInteractionsChildNodes('React to skill 2'),
      'React to skill 3': getInboundInteractionsChildNodes('React to skill 3'),
      'React to skill 4': getInboundInteractionsChildNodes('React to skill 4'),
      Death: getFinalChildNode(),
    },
  };

  const config = {
    actions: {
      reactToSkill1: (context: FSMContext) => {
        const audio = new Audio(soundPathByFSMState.get('React To Skill 1')!);
        audio.play();
        stopAll(
          FSMSkills.map(
            (skill) =>
              context.actions![
                animationNameByFSMState.get(skill as FSMStates)!
              ],
          ),
        );
        getSkillOrReactionEntry('React to skill 1')(context);
      },
      reactToSkill2: (context: FSMContext) => {
        const audio = new Audio(soundPathByFSMState.get('React To Skill 2')!);
        audio.play();
        stopAll(
          FSMSkills.map(
            (skill) =>
              context.actions![
                animationNameByFSMState.get(skill as FSMStates)!
              ],
          ),
        );
        getSkillOrReactionEntry('React to skill 2')(context);
      },
      reactToSkill3: (context: FSMContext) => {
        const audio = new Audio(soundPathByFSMState.get('React To Skill 3')!);
        audio.play();
        stopAll(
          FSMSkills.map(
            (skill) =>
              context.actions![
                animationNameByFSMState.get(skill as FSMStates)!
              ],
          ),
        );
        getSkillOrReactionEntry('React to skill 3')(context);
      },
      reactToSkill4: (context: FSMContext) => {
        const audio = new Audio(soundPathByFSMState.get('React To Skill 4')!);
        audio.play();
        stopAll(
          FSMSkills.map(
            (skill) =>
              context.actions![
                animationNameByFSMState.get(skill as FSMStates)!
              ],
          ),
        );
        getSkillOrReactionEntry('React to skill 4')(context);
      },
    },
  };

  return { machineInput, config };
};
