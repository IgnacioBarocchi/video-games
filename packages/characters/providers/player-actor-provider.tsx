import { ReactNode, createContext } from "react";
import { PlayerMachine } from "../machines/player-machine";
import { createActor } from "xstate";
import { InputControls } from "../controls/input";

const playerActor = createActor(PlayerMachine);
export const Context = createContext(playerActor);

export const PlayerActorProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Context.Provider value={playerActor}>
      <InputControls />
      {children}
    </Context.Provider>
  );
};
