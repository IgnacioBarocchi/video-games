import { KeyboardControls } from "@react-three/drei";

export enum Controls {
  FORWARD = "FORWARD",
  BACKWARD = "BACKWARD",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  SPRINT = "SPRINT",
  TOGGLE_CAR = "TOGGLE_CAR",
  USE_SKILL_1 = "USE_SKILL_1",
  USE_SKILL_2 = "USE_SKILL_2",
  USE_SKILL_3 = "USE_SKILL_3",
}

const keymap = [
  { name: Controls.SPRINT, keys: ["Shift", "Shift"] },
  { name: Controls.FORWARD, keys: ["W", "w"] },
  { name: Controls.BACKWARD, keys: ["S", "s"] },
  { name: Controls.LEFT, keys: ["A", "a"] },
  { name: Controls.RIGHT, keys: ["D", "d"] },
  { name: Controls.FORWARD, keys: ["W", "w"] },
  { name: Controls.BACKWARD, keys: ["S", "s"] },
  { name: Controls.USE_SKILL_1, keys: ["KeyJ", "J", "j"] },
  { name: Controls.USE_SKILL_2, keys: ["KeyK", "K", "k"] },
  { name: Controls.USE_SKILL_3, keys: ["KeyL", "L", "l"] },
  { name: Controls.TOGGLE_CAR, keys: ["F", "f"] },
];

// Single reference
export const input = Object.keys(Controls).reduce(
  (soFar, key) => ({ ...soFar, [key]: false }),
  {} as Input
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
