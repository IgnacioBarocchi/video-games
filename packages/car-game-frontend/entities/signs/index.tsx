import { FC } from "react";
import { EntitiesRegion } from "../../EntitiesRegion";
import { SignModel } from "./model/Sign";

export const Signs: FC<{ isOldVersion?: boolean }> = ({ isOldVersion }) => {
  if (isOldVersion) {
    return (
      <>
        {[...Array(10)].map((_, i) => (
          <SignModel key={i} position={[0, 0, i * -500]} />
        ))}
      </>
    );
  }

  return (
    <EntitiesRegion
      name="Signs"
      depth={2000}
      ZOffset={400}
      numberOfEntities={10}
      Entity={SignModel}
      spaceBetween={{ x: 0, y: 0 }}
    />
  );
};
//
// );
