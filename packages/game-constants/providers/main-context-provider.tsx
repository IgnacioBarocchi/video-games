import React, { createContext, useState } from "react";

const startingStage = "CAR GAME";
type Stages = "CAR GAME" | "SHOOTER GAME" | "MAIN MENU";
export const MainContext = createContext({
  gameState: startingStage,
  changeGameState: (_newState: Stages) => {},
});

export const MainProvider = ({ children }) => {
  const [gameState, setGameState] = useState(startingStage);
  const changeGameState = (newState: Stages) => {
    setGameState(newState);
  };
  return (
    <MainContext.Provider value={{ gameState, changeGameState }}>
      {children}
    </MainContext.Provider>
  );
};
