import { register } from "react-worker-components";
import { ROAD_LENGTH } from "game-constants";
import { DeferredComponent } from "game-lib";
import { Sign3DModel } from "./sign-3d-model";
import { memo } from "react";

export const Signs = memo(() => {
  return (
    <group position={[0, 0, ROAD_LENGTH - 50]}>
      {[...Array(10)].map((_, i) => (
        <Sign3DModel
          //DeferredComponent
          //Component={Sign3DModel}
          key={i}
          position={[0, 0, i * -500]}
        />
      ))}
    </group>
  );
});

register(Signs, "Signs");
