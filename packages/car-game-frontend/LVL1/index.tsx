import { Trees } from "../Trees";
import { Signs } from "../entities/signs";
import { Barriers } from "../entities/barrier/Barriers";
import { BurntCars } from "../entities/burnt/BurntCars";
import { Ground } from "../ground";
import useGameStore from "../store/store";
import { memo, useEffect } from "react";
import { CarPlayer, HumanPlayer, ZombieHorde, ZombieNPC } from "characters";
import { ROAD_LENGTH, ZOMBIE_IMPACT_COST } from "game-constants";
import React from "react";

const isOldVersion = true;

const Scenario = memo(({ setWonTheGame }) => {
  // const { setCarNotification, subMoney } = useGameStore((gameState) => ({
  //   setCarNotification: gameState.setCarNotification,
  //   subMoney: gameState.subMoney,
  // }));

  return (
    <>
      <Ground setWonTheGame={setWonTheGame} />
      <ZombieHorde
        startZOffset={0}
        Zend={1900}
        numberOfZombies={70}
        // collisionCallback={() => {
        //   setCarNotification({
        //     type: "HIT ZOMBIE",
        //     cost: ZOMBIE_IMPACT_COST,
        //   });
        //   subMoney(ZOMBIE_IMPACT_COST);
        // }}
      />
      {/* <ZombieNPC position={[0, 0, -50]} /> */}
      <Trees isOldVersion={isOldVersion} />
      <Signs />
      {/* <BurntCars isOldVersion={isOldVersion} />
      <Barriers isOldVersion={isOldVersion} /> */}
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
      <CarPlayer position={[-5, 1.2, ROAD_LENGTH - 20]} />
    </>
  );
};

//  <ZombieNPC position={[0, 0, -500]} />
//  <Barriers isOldVersion={isOldVersion} />
//  <Zombies
//   startZOffset={900}
//   Zend={1900}
//   numberOfZombies={50}
//   isOldVersion={isOldVersion}
// />
// <Trees isOldVersion={isOldVersion} />
