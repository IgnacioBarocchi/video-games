export interface Keys {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  skill_1: boolean;
  skill_2: boolean;
  skill_3: boolean;
  skill_4: boolean;
  debug_app: boolean;
}

// todo: rename to user input
export const PlayerInputActions = {
  forward: 'forward',
  backward: 'backward',
  leftward: 'leftward',
  rightward: 'rightward',
  skill_1: 'skill_1',
  skill_2: 'skill_2',
  skill_4: 'skill_4',
  skill_3: 'skill_3',
  debug_app: 'debug_app',
} as const;

const {
  forward,
  backward,
  leftward,
  rightward,
  skill_1,
  skill_2,
  skill_3,
  skill_4,
  debug_app,
} = PlayerInputActions;

const keysMap = [
  { name: forward, keys: ['KeyW'] },
  { name: backward, keys: ['KeyS'] },
  { name: leftward, keys: ['KeyA'] },
  { name: rightward, keys: ['KeyD'] },
  { name: skill_1, keys: ['KeyJ', '4'] },
  { name: skill_2, keys: ['KeyK', '5'] },
  { name: skill_3, keys: ['KeyL', '6'] },
  { name: skill_4, keys: ['KeyI', '8'] },
  { name: debug_app, keys: ['Space'] },
];

export default keysMap;
