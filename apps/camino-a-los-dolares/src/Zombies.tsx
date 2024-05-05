import { memo } from "react";
import { Zombie } from "./entities/zombie";
import useGameStore from "./store/store";
import { EntitiesRegion } from "./EntitiesRegion";

// : FC<{ isOldVersion?: boolean }>
export const Zombies = memo<{ isOldVersion?: boolean }>(({ isOldVersion }) => {
  const haveZombies = useGameStore((state) => state.haveZombies);

  if (!haveZombies) return null;
  if (isOldVersion) {
    return (
      <>
        {[...Array(50)].map((_, i) => (
          <Zombie key={i} position={[Math.random() * 21 - 10, 1, i * -50]} />
        ))}
      </>
    );
  }

  return (
    <>
      <EntitiesRegion
        name="Zombie Horde"
        depth={400}
        ZOffset={400}
        numberOfEntities={[25, 25]}
        Entity={Zombie}
        spaceBetween={{ x: [10, 21], y: 1 }}
      />
    </>
  );
});
// (i * -Math.floor(Math.random() * (50 - 25) + 25) - 2) / 2,
