import { Trees } from "../Trees";
import { Signs } from "../entities/signs";
import { Barriers } from "../entities/barrier/Barriers";
import { BurntCars } from "../entities/burnt/BurntCars";
import { Ground } from "../ground";
import useCarGameStore from "../store/store";
import { memo, useEffect } from "react";
import { CarPlayer } from "characters";
import React from "react";
import { ZombieHorde } from "../zombie-horde/zombie-horde";

const isOldVersion = true;

const Scenario = memo(({ setWonTheGame }) => {
  return (
    <>
      <Ground setWonTheGame={setWonTheGame} />
      <ZombieHorde />
      <Trees isOldVersion={isOldVersion} />
      <Signs />
      {/* <BurntCars isOldVersion={isOldVersion} />
      <Barriers isOldVersion={isOldVersion} /> */}
    </>
  );
});

export const LVL1 = ({ setWonTheGame }) => {
  const { gameStarted, setLoading, loading } = useCarGameStore((state) => ({
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
      {/* position={[-5, 1.2, ROAD_LENGTH - 20]} */}
      <CarPlayer position={[-5, 1.2, 0]} />
    </>
  );
};
