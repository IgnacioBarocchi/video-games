import { FC } from "react";
import { Barrier } from ".";
import { EntitiesRegion } from "../../EntitiesRegion";

export const Barriers: FC<{ isOldVersion?: boolean }> = ({ isOldVersion }) => {
  if (isOldVersion) {
    return (
      <>
        {[...Array(25)].map((_, i) => (
          <Barrier
            key={i}
            position={[
              Math.random() > 0.5 ? 14 : 7,
              0,
              i * -Math.floor(Math.random() * (50 - 25) + 25) - 2,
            ]}
          />
        ))}
        {[...Array(25)].map((_, i) => (
          <Barrier
            key={i}
            position={[
              Math.random() > 0.5 ? -14 : -7,
              0,
              i * -Math.floor(Math.random() * (50 - 25) + 25) - 2,
            ]}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <EntitiesRegion
        name="Barriers"
        depth={2000}
        ZOffset={400}
        numberOfEntities={[10, 10]}
        Entity={Barrier}
        spaceBetween={{ x: [-15, 15], y: 0 }}
      />
    </>
  );
};
