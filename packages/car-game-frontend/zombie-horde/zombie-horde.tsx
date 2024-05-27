import React, { memo, useCallback } from "react";
import { ZombieNPCV2, NPCComposition, ZombieHordeProps } from "characters";
import { ZOMBIE_IMPACT_COST } from "game-constants";
import useCarGameStore from "../store/store";

function createOnceFunction(callback: Function) {
  let hasBeenCalled = false;

  return function () {
    if (!hasBeenCalled) {
      callback();
      hasBeenCalled = true;
    }
  };
}

const ZombieImplementation = memo<{
  position: [number, number, number];
}>(({ position }) => {
  const subMoney = useCarGameStore(useCallback((state) => state.subMoney, []));
  const setCarNotification = useCarGameStore(
    useCallback((state) => state.setCarNotification, [])
  );

  const collisionCallback = createOnceFunction(() => {
    setCarNotification({ type: "HIT ZOMBIE", cost: ZOMBIE_IMPACT_COST });
    subMoney(ZOMBIE_IMPACT_COST);
  });

  return (
    <ZombieNPCV2
      playerContext="CAR"
      position={position}
      collisionCallback={collisionCallback}
    />
  );
});

export const ZombieHorde = () => {
  return (
    <NPCComposition
      numberOfZombies={70}
      Zend={1900}
      Component={({ position }) => <ZombieImplementation position={position} />}
    />
  );
};
