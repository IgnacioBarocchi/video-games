import { ReactNode, createContext } from "react";
import { KeyboardControls } from "@react-three/drei";
import { PlayerMachine } from "../machines/player-machine";
import { createActor } from "xstate";

const keysMap = [
  { name: "forward", keys: ["KeyW"] },
  { name: "backward", keys: ["KeyS"] },
  { name: "leftward", keys: ["KeyA"] },
  { name: "rightward", keys: ["KeyD"] },
  { name: "skill_1", keys: ["KeyJ", "4"] },
  { name: "skill_2", keys: ["KeyK", "5"] },
  { name: "skill_3", keys: ["KeyL", "6"] },
];

const playerActor = createActor(PlayerMachine);
export const Context = createContext(playerActor);

export const PlayerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <Context.Provider value={playerActor}>
      <KeyboardControls map={keysMap}>{children}</KeyboardControls>
    </Context.Provider>
  );
};
