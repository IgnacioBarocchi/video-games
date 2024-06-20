import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import { CAMERA_FAR, ENTITY, HIGHWAY_X_POSITIONS } from "game-constants";
import { IntersectionExitPayload } from "@react-three/rapier";
import {
  DeferredComponent,
  createOnceFunction,
  debounceFunction,
  throttleFunction,
} from "game-lib";
import { Sensors, SensorsV2, SensorsV3 } from "./Sensors";
import { Text } from "@react-three/drei";

const offset = CAMERA_FAR;
export interface NPCCompositionProps {
  numberOfNPCs: number;
  startingPosition: [number, number, number];
  gap: number;
  startCallback?: Function;
  triggerGap: number;
  Component: FC<{ position: [number, number, number] }>;
}

const NPCs = ({ gap, Component, numberOfNPCs }) => {
  const mapper = useCallback(
    (_: number, i: number) => {
      const zPos = -gap * (i + 1);
      const index = Math.floor(
        Math.random() * Object.keys(HIGHWAY_X_POSITIONS).length
      );
      const xPos = Object.values(HIGHWAY_X_POSITIONS)[index];

      return (
        <Component
          // Component={Component}
          key={i}
          position={[xPos, 0.2, zPos]}
        />
      );
    },
    [gap, Component]
  );

  const List = () =>
    useMemo(
      () => <>{[...Array(numberOfNPCs)].map(mapper)}</>,
      [gap, Component, numberOfNPCs]
    );

  return <List />;
};

export const InfiniteNPCComposition: FC<NPCCompositionProps> = memo(
  ({
    numberOfNPCs,
    startingPosition,
    gap,
    startCallback,
    triggerGap,
    Component,
  }) => {
    const canUpdatePositions = useRef(false);
    const [dynamicPositions, setDynamicPositions] = useState({
      group: startingPosition,
      activateNPCsPosition: [0, 0, triggerGap],
      inactivateNPCsPosition: [0, 0, -gap * numberOfNPCs - triggerGap],
    });

    // const updateGroupPosition = () => {
    //   if (!canUpdatePositions) {
    //     return;
    //   }

    //   setDynamicPositions((prev) => {
    //     return {
    //       ...prev,
    //       group: [prev.group[0], prev.group[1], prev.group[2] - offset],
    //       activateNPCsPosition: [
    //         prev.inactivateNPCsPosition[0],
    //         prev.inactivateNPCsPosition[1],
    //         prev.inactivateNPCsPosition[2] - offset,
    //       ],
    //       inactivateNPCsPosition: [
    //         prev.inactivateNPCsPosition[0],
    //         prev.inactivateNPCsPosition[1],
    //         prev.inactivateNPCsPosition[2] - offset,
    //       ],
    //     };
    //   });

    //   setCanUpdatePositions(false);
    // };

    //   , 200),
    //   []
    // );

    return (
      <group position={dynamicPositions.group}>
        <NPCs gap={gap} Component={Component} numberOfNPCs={numberOfNPCs} />
        <SensorsV2
          startSensorHandlers={{
            enter: () => {
              if (startCallback) {
                startCallback();
              }
            },
          }}
          endSensorHandlers={{
            enter: (payload) => {
              if (payload?.other?.rigidBodyObject?.name === ENTITY.CAR) {
                console.log("call ENTER");
                // ! no muta a tiempo ...
                canUpdatePositions.current = true;
              }
            },
            exit: (payload) => {
              if (
                payload?.other?.rigidBodyObject?.name === ENTITY.CAR &&
                canUpdatePositions
              ) {
                console.count("call!");
                canUpdatePositions.current = false;
                setDynamicPositions((prev) => {
                  return {
                    ...prev,
                    group: [
                      prev.group[0],
                      prev.group[1],
                      prev.group[2] - offset,
                    ],
                    activateNPCsPosition: [
                      prev.inactivateNPCsPosition[0],
                      prev.inactivateNPCsPosition[1],
                      prev.inactivateNPCsPosition[2] - offset,
                    ],
                    inactivateNPCsPosition: [
                      prev.inactivateNPCsPosition[0],
                      prev.inactivateNPCsPosition[1],
                      prev.inactivateNPCsPosition[2] - offset,
                    ],
                  };
                });
              }
            },
          }}
          activateEntitiesPosition={
            dynamicPositions.activateNPCsPosition as [number, number, number]
          }
          inactivateEntitiesPosition={
            dynamicPositions.inactivateNPCsPosition as [number, number, number]
          }
        />
      </group>
    );
  }
);

export const InfiniteNPCCompositionV2: FC<NPCCompositionProps> = memo(
  ({ Component, numberOfNPCs, startingPosition, gap }) => {
    const compositionZDepth = useMemo(() => gap * numberOfNPCs, []);
    const [dynamicPositions, setDynamicPositions] = useState({
      group: startingPosition,
      sensorPosition: [0, 0, -compositionZDepth / 2],
    });

    return (
      <group position={dynamicPositions.group}>
        <NPCs gap={gap} Component={Component} numberOfNPCs={numberOfNPCs} />
        <SensorsV3
          compositionZDepth={compositionZDepth}
          sensorPosition={
            dynamicPositions.sensorPosition as [number, number, number]
          }
          updatePositionCallback={debounceFunction(() => {
            setDynamicPositions((prev) => {
              return {
                ...prev,
                group: [
                  prev.group[0],
                  prev.group[1],
                  prev.group[2] - CAMERA_FAR - compositionZDepth - 2,
                ],
                sensorPosition: [
                  prev.sensorPosition[0],
                  prev.sensorPosition[1],
                  prev.sensorPosition[2] - CAMERA_FAR - compositionZDepth - 2,
                ],
              };
            });
          }, 500)}
        />
      </group>
    );
  }
);
//   startSensorHandlers={{
//     enter: () => {
//       if (startCallback) {
//         startCallback();
//       }
//     },
//   }}
//   endSensorHandlers={{
//     enter: (payload) => {
//       if (payload?.other?.rigidBodyObject?.name === ENTITY.CAR) {
//         console.log("call ENTER");
//         // ! no muta a tiempo ...
//         canUpdatePositions.current = true;
//       }
//     },
//     exit: (payload) => {
//       if (
//         payload?.other?.rigidBodyObject?.name === ENTITY.CAR &&
//         canUpdatePositions
//       ) {
//         console.count("call!");
//         canUpdatePositions.current = false;
//         setDynamicPositions((prev) => {
//           return {
//             ...prev,
//             group: [
//               prev.group[0],
//               prev.group[1],
//               prev.group[2] - offset,
//             ],
//             activateNPCsPosition: [
//               prev.inactivateNPCsPosition[0],
//               prev.inactivateNPCsPosition[1],
//               prev.inactivateNPCsPosition[2] - offset,
//             ],
//             inactivateNPCsPosition: [
//               prev.inactivateNPCsPosition[0],
//               prev.inactivateNPCsPosition[1],
//               prev.inactivateNPCsPosition[2] - offset,
//             ],
//           };
//         });
//       }
//     },
//   }}
//   activateEntitiesPosition={
//     dynamicPositions.activateNPCsPosition as [number, number, number]
//   }
//   inactivateEntitiesPosition={
//     dynamicPositions.inactivateNPCsPosition as [number, number, number]
//   }

/*
const [shouldMountComposition, setShouldMountComposition] = useState(false);
const [shouldUpdatePositions, setShouldUpdatePositions] = useState(true);
const [dynamicPositions, setDynamicPositions] = useState({
    group: startingPosition,
    start: [0, 0, triggerGap],
    end: [0, 0, -gap * numberOfNPCs - triggerGap],
});
*/

// const [shouldMountComposition, setShouldMountComposition] = useState(false);
// const [shouldUpdatePositions, setShouldUpdatePositions] = useState(true);

// useCallback(
//     throttleFunction(() => {
