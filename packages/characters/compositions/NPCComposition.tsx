import { FC, memo, useCallback, useMemo, useState } from "react";
import { ENTITY, HIGHWAY_X_POSITIONS } from "game-constants";
import {
  CuboidCollider,
  IntersectionExitPayload,
  RigidBody,
} from "@react-three/rapier";
import { Text } from "@react-three/drei";
import { DeferredComponent, createOnceFunction } from "game-lib";

export interface SensorsProps {}
export interface NPCCompositionProps {
  numberOfNPCs: number;
  position: [number, number, number];
  gap: number;
  startCallback?: Function;
  endCallback?: Function;
  triggerGap: number;
  Component: FC<{ position: [number, number, number] }>;
}
export interface SensorsProps {
  handleMount: (payload: IntersectionExitPayload) => void;
  handleUnmount: (payload: IntersectionExitPayload) => void;
  activateNPCsPosition: [number, number, number];
  inactivateNPCsPosition: [number, number, number];
}

const Sensors = memo<SensorsProps>(
  ({
    handleMount,
    handleUnmount,
    activateNPCsPosition,
    inactivateNPCsPosition,
  }) => {
    return (
      <RigidBody type="fixed" name="NPC visibility control">
        <CuboidCollider
          name="Start"
          args={[10, 1, 0]}
          sensor
          onIntersectionExit={handleMount}
          position={activateNPCsPosition}
        />
        <CuboidCollider
          name="End"
          args={[10, 1, 0]}
          sensor
          onIntersectionExit={handleUnmount}
          position={inactivateNPCsPosition}
        />
      </RigidBody>
    );
  }
);

export const NPCComposition: FC<NPCCompositionProps> = memo(
  ({
    numberOfNPCs,
    position,
    gap,
    startCallback,
    endCallback,
    triggerGap,
    Component,
  }) => {
    const [shouldMountComposition, setShouldMountComposition] = useState(false);
    const [shouldMountComponent, setShouldMountComponent] = useState(true);

    const activateNPCsPosition: [number, number, number] = useMemo(
      () => [position[0], position[1], position[2] + triggerGap],
      [triggerGap]
    );

    const inactivateNPCsPosition: [number, number, number] = useMemo(
      () => [
        position[0],
        position[1],
        position[2] - gap * numberOfNPCs - triggerGap,
      ],
      [triggerGap]
    );

    const mapper = useCallback(
      (_: number, i: number) => {
        const zPos = -gap * (i + 1);
        const index = Math.floor(
          Math.random() * Object.keys(HIGHWAY_X_POSITIONS).length
        );

        const xPos = Object.values(HIGHWAY_X_POSITIONS)[index];

        return (
          <DeferredComponent
            Component={Component}
            key={i}
            position={[xPos, 1, zPos]}
          />
        );
      },
      [numberOfNPCs]
    );

    const handleMount = useCallback((payload: IntersectionExitPayload) => {
      if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) {
        return;
      }

      const handler = createOnceFunction(() => {
        if (!shouldMountComposition) {
          setShouldMountComposition(true);
        }

        if (startCallback) {
          startCallback();
        }
      });

      handler();
    }, []);

    const handleUnmount = useCallback((payload: IntersectionExitPayload) => {
      if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) {
        return;
      }
      const handler = createOnceFunction(() => {
        setShouldMountComponent(false);

        if (endCallback) {
          endCallback();
        }
      });

      handler();
    }, []);

    if (!shouldMountComponent) {
      return null;
    }

    return (
      <group position={position}>
        <Text position={[activateNPCsPosition[0], 2, activateNPCsPosition[2]]}>
          **STARTING ZONE**
        </Text>
        {shouldMountComposition && <>{[...Array(numberOfNPCs)].map(mapper)}</>}
        <Sensors
          handleMount={handleMount}
          handleUnmount={handleUnmount}
          activateNPCsPosition={activateNPCsPosition}
          inactivateNPCsPosition={inactivateNPCsPosition}
        />
      </group>
    );
  }
);
{
  /* <Text
position={[activateNPCsPosition[0], 2, activateNPCsPosition[2]]}
>
activate Z: {activateNPCsPosition[2]}
</Text>
<Text
position={[inactivateNPCsPosition[0], 2, inactivateNPCsPosition[2]]}
>
inactivate Z: {inactivateNPCsPosition[2]}
</Text> */
}
