import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { ENTITY, ROAD_LENGTH } from "game-constants";
import { FC, useCallback } from "react";
import { MathUtils, Vector3 } from "three";

import { BarrierModel } from "../barriers/barriers";
import { GroundModel } from "./GroundModel";
import useCarGameStore from "../../../store/store";

const BARRIER_WIDTH = 0.05;
const BARRIER_HEIGHT = 1;
const SLOPE_HEIGHT = 1;
const SLOPE_ROTATION_ANGLE = -60;
const GRASS_WIDTH = 7;
const BARRIER_POSITION_X = 9.7;
const SLOPE_POSITION_X = 10.7;
const GRASS_POSITION_X = 18.5;
const POSITION_Y = 1;
const SLOPE_POSITION_Y = 0.5;

function createOnceFunction(callback: Function) {
  let hasBeenCalled = false;

  return function () {
    if (!hasBeenCalled) {
      callback();
      hasBeenCalled = true;
    }
  };
}

const Colliders: FC<{ side: "right" | "left" }> = ({ side }) => {
  return (
    <>
      <CuboidCollider
        name={`barrier ${side}`}
        args={[BARRIER_WIDTH, BARRIER_HEIGHT, ROAD_LENGTH]}
        position={[
          (side === "left" ? -1 : 1) * BARRIER_POSITION_X,
          POSITION_Y,
          0,
        ]}
      />
      <CuboidCollider
        name={`slope ${side}`}
        args={[0, SLOPE_HEIGHT, ROAD_LENGTH]}
        position={[
          (side === "left" ? -1 : 1) * SLOPE_POSITION_X,
          SLOPE_POSITION_Y,
          0,
        ]}
        rotation={[0, 0, MathUtils.degToRad(SLOPE_ROTATION_ANGLE)]}
      />
      <CuboidCollider
        name={`grass ${side}`}
        args={[GRASS_WIDTH, 0, ROAD_LENGTH]}
        position={[
          (side === "left" ? -1 : 1) * GRASS_POSITION_X,
          POSITION_Y,
          0,
        ]}
      />
    </>
  );
};

const TerrainLimitBarriers = () => {
  return (
    <>
      <RigidBody
        type="fixed"
        position={[0, 0, ROAD_LENGTH - 20]}
        colliders="cuboid"
      >
        <BarrierModel scale={new Vector3(10, 1, 1)} />
      </RigidBody>
    </>
  );
};

const Alert = () => {
  const setTitle = useCarGameStore(useCallback((state) => state.setTitle, []));

  const collisionCallback = createOnceFunction(() => {
    setTitle("Entrando en zona de zombies");
  });

  return (
    <CuboidCollider
      sensor
      // todo move to zombie horde
      name="zombie alert"
      args={[10, 0, 10]}
      position={[0, 0, 1100]}
      onIntersectionEnter={(payload) => {
        if (payload.other.rigidBodyObject!.name === ENTITY.CAR) {
          collisionCallback();
        }
      }}
    />
  );
};

export const HighWay = () => {
  return (
    <>
      <RigidBody type="fixed" name="Ground" colliders={false}>
        <CuboidCollider
          name="ground"
          args={[10, 0, ROAD_LENGTH]}
          position={[0, 0, 0]}
        />
        <Alert />
        <Colliders side="left" />
        <Colliders side="right" />
        <GroundModel />
      </RigidBody>
      <TerrainLimitBarriers />
    </>
  );
};
