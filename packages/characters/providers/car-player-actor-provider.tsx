import { ReactNode, createContext } from "react";
import { createActor } from "xstate";
import { InputControls } from "../controls/input";
import { carPlayerMachine } from "../machines/car-player-machine";

const carPlayerActor = createActor(carPlayerMachine);
export const CarPlayerContext = createContext(carPlayerActor);

export const CarPlayerActorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <CarPlayerContext.Provider value={carPlayerActor}>
      <InputControls />
      {children}
    </CarPlayerContext.Provider>
  );
};
