import { KeyboardControls } from '@react-three/drei';

export enum Controls {
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  JUMP = 'JUMP',
  SPRINT = 'SPRINT',
}

const keymap = [
  { name: Controls.FORWARD, keys: ['ArrowUp', 'W', 'w', 'I', 'i'] },
  // { name: Controls.BACKWARD, keys: ["ArrowDown", "S", "s", "K", "k"] },
  { name: Controls.LEFT, keys: ['ArrowLeft', 'A', 'a', 'J', 'j'] },
  { name: Controls.RIGHT, keys: ['ArrowRight', 'D', 'd', 'L', 'l'] },
  // { name: Controls.JUMP, keys: ['Space'] },
  { name: Controls.SPRINT, keys: ['ShiftLeft', 'ShiftRight'] },
];

// Single reference
export const input = Object.keys(Controls).reduce(
  (soFar, key) => ({ ...soFar, [key]: false }),
  {} as Input,
);

// Can go anywhere
export function InputControls() {
  return (
    <KeyboardControls
      map={keymap}
      children={null}
      onChange={(control, engaged) => {
        input[control as Controls] = engaged;
      }}
    />
  );
}

type ControlsState<T extends string = string> = { [K in T]: boolean };
export type Input = ControlsState<Controls>;
