import { memo, useCallback, Suspense } from "react";
import { ROAD_LENGTH } from "game-constants";
import { InfiniteNPCCompositionV2 } from "characters";
import useCarGameStore from "../store/store";
import ZombieImplementation from "./zombie-implementation/zombie";
import { createOnceFunction } from "game-lib";

export const ZombieHorde = memo(() => {
  const setTitle = useCarGameStore(useCallback((state) => state.setTitle, []));

  const onEnterCallback = useCallback(
    createOnceFunction(() => {
      setTitle("Entrando en zona de zombies");
    }),
    [setTitle]
  );

  return (
    <Suspense>
      <InfiniteNPCCompositionV2
        startingPosition={[0, 0, ROAD_LENGTH - 200]}
        startCallback={onEnterCallback}
        gap={5}
        triggerGap={5}
        numberOfNPCs={10}
        Component={({ position }) => (
          <ZombieImplementation position={position} />
        )}
      />
    </Suspense>
  );
});
