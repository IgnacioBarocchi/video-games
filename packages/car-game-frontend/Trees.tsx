import { memo } from "react";
import { TreeModel } from "./entities/tree/TreeModel";
import { EntitiesRegion } from "./EntitiesRegion";

export const Trees = memo<{ isOldVersion?: boolean }>(({ isOldVersion }) => {
  if (isOldVersion) {
    return (
      <>
        {[...Array(50)].map((_, i) => (
          <TreeModel
            scale={Math.floor(Math.random() * (1.5 - 0.5) + 0.5)}
            dispose={null}
            key={i + "R"}
            position={[
              Math.floor(Math.random() * (41 - 25) + 25),
              Math.floor(Math.random() * (2 - 0) + 0),
              i * -Math.floor(Math.random() * (100 - 50) + 50) - 2,
            ]}
          />
        ))}
        {[...Array(50)].map((_, i) => (
          <TreeModel
            scale={Math.floor(Math.random() * (1.5 - 0.5) + 0.5)}
            dispose={null}
            key={i + "L"}
            position={[
              -Math.floor(Math.random() * (41 - 25) + 25),
              Math.floor(Math.random() * (2 - 0) + 0),
              i * -Math.floor(Math.random() * (100 - 50) + 50) - 2,
            ]}
          />
        ))}
      </>
    );
  }

  return (
    <EntitiesRegion
      name="Trees"
      depth={2000}
      ZOffset={400}
      numberOfEntities={[25, 25]}
      Entity={TreeModel}
      spaceBetween={{ x: [30, 25], y: [2, 0] }}
    />
  );
});
