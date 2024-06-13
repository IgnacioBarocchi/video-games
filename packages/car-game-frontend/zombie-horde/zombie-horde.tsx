import { NPCComposition } from "characters";
import useCarGameStore from "../store/store";
import { createOnceFunction } from "game-lib";
import { Suspense, lazy, memo, useCallback } from "react";

const ZombieImplementation = lazy(
  () => import("../zombie-implementation/zombie.tsx")
);

export const ZombieHorde = memo<{ position: [number, number, number] }>(
  ({ position }) => {
    const setTitle = useCarGameStore(
      useCallback((state) => state.setTitle, [])
    );

    const onEnterCallback = createOnceFunction(() => {
      setTitle("Entrando en zona de zombies");
    });

    return (
      <Suspense>
        <NPCComposition
          numberOfNPCs={75}
          position={position}
          gap={25}
          startCallback={onEnterCallback}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      </Suspense>
    );
  }
);
