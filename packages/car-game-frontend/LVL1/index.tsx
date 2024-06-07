import { useCallback, useEffect } from "react";

import { CarPlayer } from "characters";
// import { OrbitControls } from "three-stdlib";
import { ROAD_LENGTH } from "game-constants";
import { Terrain } from "../terrain";
import { ZombieHorde } from "../zombie-horde/zombie-horde";
import useCarGameStore from "../store/store";

const Scenario = () => {
  return (
    <>
      <Terrain />
      <ZombieHorde />
    </>
  );
};

export const LVL1 = () => {
  const gameOver = useCarGameStore((state) => state.gameOver);
  const setLoading = useCarGameStore(
    useCallback((state) => state.setLoading, [])
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Scenario />
      <CarPlayer
        position={[0, 0.1, ROAD_LENGTH - 50]}
        isRaining={true}
        controlled={!gameOver}
      />
    </>
  );
};
