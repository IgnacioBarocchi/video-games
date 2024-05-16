import { memo } from "react";
import { BurntCar } from ".";
import { EntitiesRegion } from "../../EntitiesRegion";

export const BurntCars = memo<{ isOldVersion?: boolean }>(
  ({ isOldVersion }) => {
    if (isOldVersion) {
      return (
        <>
          {[...Array(25)].map((_, i) => (
            <BurntCar
              key={i}
              position={[
                25,
                4,
                i * -Math.floor(Math.random() * (50 - 25) + 25) - 2,
              ]}
            />
          ))}
          {[...Array(25)].map((_, i) => (
            <BurntCar
              key={i}
              position={[
                -25,
                4,
                i * -Math.floor(Math.random() * (50 - 25) + 25) - 2,
              ]}
            />
          ))}
        </>
      );
    }

    return (
      <EntitiesRegion
        name="Burnt Cars"
        depth={2000}
        ZOffset={400}
        numberOfEntities={[25, 25]}
        Entity={BurntCar}
        spaceBetween={{ x: [26, 25], y: [2, 4] }}
      />
    );
  }
);
