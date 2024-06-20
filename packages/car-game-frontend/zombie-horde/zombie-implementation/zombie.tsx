import { ZombieNPCV2 } from "characters";
import { ZOMBIE_IMPACT_COST } from "game-constants";
import { createOnceFunction } from "game-lib";
import { memo, useCallback } from "react";
import useCarGameStore from "../../store/store";

export const ZombieImplementation = memo<{
  position: [number, number, number];
}>(({ position }) => {
  const subMoney = useCarGameStore(useCallback((state) => state.subMoney, []));
  const setCarNotification = useCarGameStore(
    useCallback((state) => state.setCarNotification, [])
  );

  const collisionCallback = useCallback(
    createOnceFunction(() => {
      setCarNotification({ type: "HIT ZOMBIE", cost: ZOMBIE_IMPACT_COST });
      subMoney({ type: "HIT ZOMBIE", cost: ZOMBIE_IMPACT_COST });
    }),
    []
  );

  return (
    <ZombieNPCV2
      playerContext="CAR"
      position={position}
      collisionCallback={collisionCallback}
    />
  );
});

export default ZombieImplementation;
