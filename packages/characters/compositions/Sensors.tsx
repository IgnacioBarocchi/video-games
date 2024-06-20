import {
  IntersectionExitPayload,
  CuboidCollider,
  RigidBody,
  IntersectionEnterPayload,
} from "@react-three/rapier";
import { ENTITY } from "game-constants";
import { memo } from "react";

export interface SensorsProps {
  handleMount: (payload: IntersectionExitPayload) => void;
  handleUnmount: (payload: IntersectionExitPayload) => void;
  activateEntitiesPosition: [number, number, number];
  inactivateEntitiesPosition: [number, number, number];
}

export const Sensors = memo<SensorsProps>(
  ({
    handleMount,
    handleUnmount,
    activateEntitiesPosition,
    inactivateEntitiesPosition,
  }) => (
    <RigidBody type="fixed" name="Entities visibility control">
      <CuboidCollider
        name="Start"
        args={[10, 1, 0]}
        sensor
        onIntersectionExit={handleMount}
        position={activateEntitiesPosition}
      />
      <CuboidCollider
        name="End"
        args={[10, 1, 0]}
        sensor
        onIntersectionExit={handleUnmount}
        position={inactivateEntitiesPosition}
      />
    </RigidBody>
  )
);

export interface SensorsPropsV2 {
  startSensorHandlers?: {
    enter?: (payload: IntersectionEnterPayload) => void;
    exit?: (payload: IntersectionExitPayload) => void;
  };
  endSensorHandlers?: {
    enter?: (payload: IntersectionEnterPayload) => void;
    exit?: (payload: IntersectionExitPayload) => void;
  };
  activateEntitiesPosition: [number, number, number];
  inactivateEntitiesPosition: [number, number, number];
}

export const SensorsV2 = memo<SensorsPropsV2>(
  ({
    startSensorHandlers,
    endSensorHandlers,
    activateEntitiesPosition,
    inactivateEntitiesPosition,
  }) => (
    <RigidBody type="fixed" name="Entities visibility control">
      <CuboidCollider
        name="Start"
        args={[10, 1, 0.1]}
        sensor
        onIntersectionEnter={startSensorHandlers?.enter}
        onIntersectionExit={startSensorHandlers?.exit}
        position={activateEntitiesPosition}
      />
      <CuboidCollider
        name="End"
        args={[10, 1, 0.1]}
        sensor
        onIntersectionEnter={endSensorHandlers?.enter}
        onIntersectionExit={endSensorHandlers?.exit}
        position={inactivateEntitiesPosition}
      />
    </RigidBody>
  )
);

export interface SensorsPropsV3 {
  compositionZDepth: number;
  sensorPosition: [number, number, number];
  updatePositionCallback: Function;
}

export const SensorsV3 = memo<SensorsPropsV3>(
  ({ compositionZDepth, updatePositionCallback, sensorPosition }) => (
    <RigidBody type="fixed" name="Entities visibility control">
      <CuboidCollider
        position={sensorPosition}
        name="Sensor"
        args={[10, 1.5, compositionZDepth / 2]}
        sensor
        onIntersectionExit={(payload) => {
          if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) {
            return;
          }

          updatePositionCallback();
        }}
      />
    </RigidBody>
  )
);
