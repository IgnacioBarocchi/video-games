import { memo, useState, useMemo, useCallback, Suspense } from "react";
import { ROAD_LENGTH } from "game-constants";
import { NPCComposition } from "characters";
import useCarGameStore from "../store/store";
import ZombieImplementation from "./zombie-implementation/zombie";

export const ZombieHorde = memo(() => {
  const setTitle = useCarGameStore(useCallback((state) => state.setTitle, []));

  const onEnterCallback = useCallback(() => {
    setTitle("Entrando en zona de zombies");
  }, [setTitle]);

  const wavesPositions: [number, number, number][] = useMemo(
    () => [
      [0, 0, ROAD_LENGTH - 500],
      [0, 0, ROAD_LENGTH - 800],
      [0, 0, ROAD_LENGTH - 1500],
      [0, 0, ROAD_LENGTH - 2000],
      [0, 0, ROAD_LENGTH - 3200],
      [0, 0, 0],
      [0, 0, 500],
      [0, 0, 1500],
      [0, 0, 2000],
      [0, 0, 3000],
      [0, 0, 4000],
    ],
    []
  );

  const [renderWaves, setRenderWaves] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  const handleEndCallback = useCallback((index) => {
    setRenderWaves((prev) => {
      const newRenderWaves = [...prev];
      newRenderWaves[index] = false;
      return newRenderWaves;
    });
  }, []);

  return (
    <Suspense>
      {renderWaves[0] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[0]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(0)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[1] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[1]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(1)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[2] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[2]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(2)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[3] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[3]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(3)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[4] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[4]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(4)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[5] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[5]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(5)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[6] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[6]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(6)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[7] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[7]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(7)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[8] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[8]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(8)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[9] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[9]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(9)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
      {renderWaves[10] && (
        <NPCComposition
          numberOfNPCs={75}
          position={wavesPositions[10]}
          gap={25}
          startCallback={onEnterCallback}
          endCallback={() => handleEndCallback(10)}
          triggerGap={51}
          Component={({ position }) => (
            <ZombieImplementation position={position} />
          )}
        />
      )}
    </Suspense>
  );
});
