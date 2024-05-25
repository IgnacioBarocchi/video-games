import { Trees } from "../Trees";
// import { Zombies } from "../Zombies";
import { Signs } from "../entities/signs";
import { Barriers } from "../entities/barrier/Barriers";
import { BurntCars } from "../entities/burnt/BurntCars";
import { Ground } from "../ground";
import useGameStore from "../store/store";
import { memo, useEffect } from "react";
import { CarPlayer, HumanPlayer, ZombieHorde, ZombieNPC } from "characters";
import { ZOMBIE_IMPACT_COST } from "game-constants";

const isOldVersion = true;

const Scenario = memo(({ setWonTheGame }) => {
  const { setCarNotification, subMoney } = useGameStore((gameState) => ({
    setCarNotification: gameState.setCarNotification,
    subMoney: gameState.subMoney,
  }));

  return (
    <>
      <Ground setWonTheGame={setWonTheGame} />
      <ZombieHorde
        startZOffset={900}
        Zend={1900}
        numberOfZombies={50}
        collisionCallback={() => {
          setCarNotification({
            type: "HIT ZOMBIE",
            cost: ZOMBIE_IMPACT_COST,
          });
          subMoney(ZOMBIE_IMPACT_COST);
        }}
      />
      <Trees isOldVersion={isOldVersion} />
      <Signs isOldVersion={isOldVersion} />
      <BurntCars isOldVersion={isOldVersion} />
      <Barriers isOldVersion={isOldVersion} />
      {/* <ZombieNPC position={[0, 0, -500]} /> */}
      {/* <Barriers isOldVersion={isOldVersion} /> */}
      {/* <Zombies
        startZOffset={900}
        Zend={1900}
        numberOfZombies={50}
        isOldVersion={isOldVersion}
      /> */}
      {/*
      <Trees isOldVersion={isOldVersion} /> */}
    </>
  );
});

export const LVL1 = ({ setWonTheGame }) => {
  const { gameStarted, setLoading, loading } = useGameStore((state) => ({
    gameStarted: state.gameStarted,
    setLoading: state.setLoading,
    loading: state.loading,
  }));

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  if (!gameStarted) return null;

  return (
    <>
      <Scenario setWonTheGame={setWonTheGame} />
      <CarPlayer />
    </>
  );
};
