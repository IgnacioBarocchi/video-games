import { ReactNode } from "react";
import { createActorContext } from "@xstate/react";
import { KeyboardControls } from "@react-three/drei";
import { characterMachine } from "../machines/fsmbeta";

const keysMap = [
  { name: "forward", keys: ["KeyW"] },
  { name: "backward", keys: ["KeyS"] },
  { name: "leftward", keys: ["KeyA"] },
  { name: "rightward", keys: ["KeyD"] },
  { name: "skill_1", keys: ["KeyJ", "4"] },
  { name: "skill_2", keys: ["KeyK", "5"] },
  { name: "skill_3", keys: ["KeyL", "6"] },
];

export const Context = createActorContext(characterMachine);

export const PlayerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Context.Provider>
      <KeyboardControls map={keysMap}>{children}</KeyboardControls>
    </Context.Provider>
  );
};
