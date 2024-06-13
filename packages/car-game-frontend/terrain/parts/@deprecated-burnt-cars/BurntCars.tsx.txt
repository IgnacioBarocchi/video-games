import { memo } from "react";
import { BurntCar } from ".";
import { EntitiesRegion } from "../../EntitiesRegion";

export const BurntCars = memo<{ isOldVersion?: boolean }>(
  ({ isOldVersion }) => {
    if (isOldVersion) {
      return (
        <>
          {[...Array(7)].map((_, i) => (
            <BurntCar
              key={i}
              position={[
                7,
                4,
                i * -Math.floor(Math.random() * (25 - 7) + 7) - 2,
              ]}
            />
          ))}
          {[...Array(7)].map((_, i) => (
            <BurntCar
              key={i}
              position={[
                -7,
                4,
                i * -Math.floor(Math.random() * (25 - 7) + 7) - 2,
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
        numberOfEntities={[7, 7]}
        Entity={BurntCar}
        spaceBetween={{ x: [26, 7], y: [2, 4] }}
      />
    );
  }
);
