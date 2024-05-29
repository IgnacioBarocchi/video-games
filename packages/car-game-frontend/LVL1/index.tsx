import { Trees } from "../Trees";
import { Signs } from "../entities/signs";
import { Barriers } from "../entities/barrier/Barriers";
import { BurntCars } from "../entities/burnt/BurntCars";
import { Ground } from "../ground";
import useCarGameStore from "../store/store";
import { useCallback, useEffect } from "react";
import { CarPlayer } from "characters";
import React from "react";
import { ROAD_LENGTH } from "game-constants";
import { ZombieHorde } from "../zombie-horde/zombie-horde";
import { OrbitControls } from "three-stdlib";

const Scenario = ({ setWonTheGame }) => {
  return (
    <>
      <Ground setWonTheGame={setWonTheGame} />
      <ZombieHorde />
      <Trees />
      <Signs />
      <Barriers />
      {/* <BurntCars isOldVersion={isOldVersion} />
       */}
    </>
  );
};

export const LVL1 = ({ setWonTheGame }) => {
  const setLoading = useCarGameStore(
    useCallback((state) => state.setLoading, [])
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Scenario setWonTheGame={setWonTheGame} />
      {/*  */}
      <CarPlayer position={[-5, 1.2, ROAD_LENGTH - 50]} isRaining={true} />
    </>
  );
};
