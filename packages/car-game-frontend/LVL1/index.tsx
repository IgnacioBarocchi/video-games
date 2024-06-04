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
      {/* <ZombieHorde /> */}
    </>
  );
};

export const LVL1 = () => {
  const setLoading = useCarGameStore(
    useCallback((state) => state.setLoading, [])
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Scenario />
      <CarPlayer position={[-5, 1.2, 0]} isRaining={true} />
    </>
  );
};
