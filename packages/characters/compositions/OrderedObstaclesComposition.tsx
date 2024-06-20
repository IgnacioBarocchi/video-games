import { Text } from "@react-three/drei";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { Sensors } from "./Sensors";
import { IntersectionExitPayload } from "@react-three/rapier";
import { ENTITY, HIGHWAY_X_POSITIONS } from "game-constants";
import { DeferredComponent, createOnceFunction } from "game-lib";

export interface OrderedObstaclesCompositionProps {
  numberOfObstacles: number;
  position: [number, number, number];
  gap: number; // same as distance in Barriers
  startCallback?: Function;
  endCallback?: Function;
  triggerGap: number;
  Component: FC<{ position: [number, number, number] }>;
}

export const OrderedObstaclesComposition: FC<OrderedObstaclesCompositionProps> =
  memo(
    ({
      numberOfObstacles,
      position,
      gap,
      startCallback,
      endCallback,
      triggerGap,
      Component,
    }) => {
      const [shouldMountComposition, setShouldMountComposition] =
        useState(false);
      const [shouldMountComponent, setShouldMountComponent] = useState(true);

      const activateObstaclesPosition: [number, number, number] = useMemo(
        () => [0, 0, triggerGap],
        [triggerGap]
      );

      const inactivateObstaclesPosition: [number, number, number] = useMemo(
        () => [0, 0, -gap * numberOfObstacles - triggerGap],
        [gap, numberOfObstacles, triggerGap]
      );

      // const activateObstaclesPosition: [number, number, number] = useMemo(
      //   () => [position[0], position[1], position[2] + triggerGap],
      //   [position, triggerGap]
      // );

      // const inactivateObstaclesPosition: [number, number, number] = useMemo(
      //   () => [
      //     position[0],
      //     position[1],
      //     position[2] - gap * numberOfObstacles - triggerGap,
      //   ],
      //   [position, gap, numberOfObstacles, triggerGap]
      // );

      const mapper = useCallback(() => {
        let selector = 0;
        let positionZ = 0;
        let offset = 1;
        const positions = Object.values(HIGHWAY_X_POSITIONS);

        return [...Array(numberOfObstacles)].map((_, i) => {
          if (selector >= positions.length) selector = 0;
          const positionX = positions[selector++];
          positionZ -= offset * gap;
          if (positionX === HIGHWAY_X_POSITIONS.MIDDLE_TRACK_X) offset = -1;
          else offset = 1;

          return (
            <DeferredComponent
              Component={Component}
              key={i}
              position={[positionX, 1, positionZ]}
            />
          );
        });
      }, [gap, numberOfObstacles, Component]);

      const handleMount = useCallback(
        (payload: IntersectionExitPayload) => {
          if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) return;

          createOnceFunction(() => {
            if (!shouldMountComposition) setShouldMountComposition(true);
            if (startCallback) startCallback();
          })();
        },
        [shouldMountComposition, startCallback]
      );

      const handleUnmount = useCallback(
        (payload: IntersectionExitPayload) => {
          if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) return;

          createOnceFunction(() => {
            setShouldMountComponent(false);
            if (endCallback) endCallback();
          })();
        },
        [endCallback]
      );

      if (!shouldMountComponent) return null;

      return (
        <group position={position}>
          {/* <Text
            position={[
              activateObstaclesPosition[0],
              2,
              activateObstaclesPosition[2],
            ]}
          >
            // **STARTING ZONE** //{" "}
          </Text>

          <Text
            position={[
              inactivateObstaclesPosition[0],
              2,
              inactivateObstaclesPosition[2],
            ]}
          >
            // **ENDING ZONE** //{" "}
          </Text> */}

          {shouldMountComposition && mapper()}
          <Sensors
            handleMount={handleMount}
            handleUnmount={handleUnmount}
            activateEntitiesPosition={activateObstaclesPosition}
            inactivateEntitiesPosition={inactivateObstaclesPosition}
          />
        </group>
      );
    }
  );
