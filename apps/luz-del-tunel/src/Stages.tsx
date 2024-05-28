import { CarGameFrontend } from "car-game-frontend";
import useGameContext from "game-constants/hooks/use-game-context";
import { Hub } from "hub-screen-frontend";
import { Shooter3DScene } from "shooting-level-frontend";

export const Stages = () => {
  const { gameState } = useGameContext();

  if (gameState === "MAIN MENU") {
    return <Hub />;
  }

  if (gameState === "CAR GAME") {
    return <CarGameFrontend />;
  }

  if (gameState === "SHOOTER GAME") {
    return <Shooter3DScene />;
  }

  return null;
};
