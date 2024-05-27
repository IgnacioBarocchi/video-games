import React from "react";
import { ZombieNPCV2, NPCComposition } from "characters";
import { ZOMBIE_IMPACT_COST } from "game-constants";
import useCarGameStore from "../store/store";

const ZombieImplementation = ({ position }) => {
  const { setCarNotification, subMoney } = useCarGameStore((state) => ({
    setCarNotification: state.setCarNotification,
    subMoney: state.subMoney,
  }));

  return (
    <ZombieNPCV2
      playerContext="CAR"
      position={position}
      collisionCallback={() => {
        // setCarNotification({ type: "HIT ZOMBIE", cost: ZOMBIE_IMPACT_COST });
        // subMoney(ZOMBIE_IMPACT_COST);
      }}
    />
  );
};

export const ZombieHorde = () => {
  return (
    <NPCComposition
      numberOfZombies={70}
      Zend={1900}
      Component={({ position }) => <ZombieImplementation position={position} />}
    />
  );
};
