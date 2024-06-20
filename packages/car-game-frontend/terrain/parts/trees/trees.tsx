import { register } from "react-worker-components";
import * as THREE from "three";
import { memo } from "react";

import { ROAD_LENGTH } from "game-constants";
import { Tree3DModel } from "./tree-3d-model";
import { DeferredComponent } from "game-lib";

const MIN_X = 11;
const MAX_X = 20;
const MIN_Y = 0;
const MAX_Y = 2;

export const Trees = memo(() => {
  return (
    <group position={[0, 0, ROAD_LENGTH - 50]}>
      {[...Array(50)].map((_, i) => (
        <DeferredComponent
          Component={Tree3DModel}
          rotation={[0, THREE.MathUtils.degToRad(Math.random() * 180), 0]}
          dispose={null}
          key={i + "R"}
          position={[
            Math.floor(Math.random() * (MAX_X - MIN_X) + MIN_X),
            Math.floor(Math.random() * (MAX_Y - MIN_Y) + MIN_Y),
            i * -Math.floor(Math.random() * (100 - 50) + 50) - 2,
          ]}
        />
      ))}
      {[...Array(50)].map((_, i) => (
        <DeferredComponent
          Component={Tree3DModel}
          rotation={[0, THREE.MathUtils.degToRad(Math.random() * 180), 0]}
          dispose={null}
          key={i + "L"}
          position={[
            -Math.floor(Math.random() * (MAX_X - MIN_X) + MIN_X),
            Math.floor(Math.random() * (MAX_Y - MIN_Y) + MIN_Y),
            i * -Math.floor(Math.random() * (100 - 50) + 50) - 2,
          ]}
        />
      ))}
    </group>
  );
});

register(Trees, "Trees");
