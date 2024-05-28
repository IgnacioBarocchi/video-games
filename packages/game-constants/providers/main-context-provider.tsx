import { createContext, useState } from "react";

type Stages = "CAR GAME" | "SHOOTER GAME" | "MAIN MENU";
export const MainContext = createContext({
  gameState: "MAIN MENU",
  changeGameState: (_newState: Stages) => {},
});

export const MainProvider = ({ children }) => {
  const [gameState, setGameState] = useState("MAIN MENU");
  const changeGameState = (newState: Stages) => {
    setGameState(newState);
  };
  return (
    <MainContext.Provider value={{ gameState, changeGameState }}>
      {children}
    </MainContext.Provider>
  );
};

/* <button onClick={() => changeGameState('CAR GAME')}>Switch to Car Game</button>
<button onClick={() => changeGameState('SHOOTER GAME')}>Switch to Shooter Game</button>
<button onClick={() => changeGameState('MAIN MENU')}>Back to Main Menu</button> */
