import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { OrderedObstaclesComposition } from "characters";
import { HIGHWAY_X_POSITIONS, ROAD_LENGTH } from "game-constants";
import { DeferredComponent } from "game-lib";
import { Suspense, lazy, memo, useMemo } from "react";

const Barrier = lazy(() => import("./barrier"));

export const Barriers = () => {
  return (
    <OrderedObstaclesComposition
      numberOfObstacles={50}
      position={[0, 0.1, ROAD_LENGTH - 200]}
      gap={20}
      triggerGap={100}
      Component={Barrier}
    />
  );
  // const barriers = useMemo(() => {
  //   let selector = 0;
  //   let positionZ = 0;
  //   let offset = 1;

  //   return [...Array(count)].map((_, i) => {
  //     if (selector >= positions.length) selector = 0;
  //     const positionX = positions[selector++];
  //     positionZ -= offset * distance;
  //     if (positionX === HIGHWAY_X_POSITIONS.MIDDLE_TRACK_X) offset = -1;
  //     else offset = 1;

  //     return { positionX, positionZ };
  //   });
  // }, [count]);

  // return (
  //   <>
  //     {barriers.map(({ positionX, positionZ }, i) => (
  //       <Suspense key={i} fallback={null}>
  //         <DeferredComponent
  //           Component={Barrier}
  //           position={[positionX, 0, positionZ]}
  //         />
  //       </Suspense>
  //     ))}
  //   </>
  // );
};
