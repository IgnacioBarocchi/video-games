import React, { FC } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Shop } from "./entities/shop";
import { GroundModel } from "./GroundModel";
import { ROAD_LENGTH } from "game-constants";
import { MathUtils } from "three";

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

export const HighWay = () => {
  return (
    <RigidBody type="fixed" name="Ground" colliders={false}>
      <CuboidCollider
        name="ground"
        args={[10, 0, ROAD_LENGTH]}
        position={[0, 0, 0]}
      />
      <Colliders side="left" />
      <Colliders side="right" />
      <GroundModel />
    </RigidBody>
  );
};

export function Ground({ setWonTheGame }) {
  return (
    <group>
      <HighWay />
      <Shop setWonTheGame={setWonTheGame} />
    </group>
  );
}

/* 
<CuboidCollider args={[0.2, 2, 10000]} position={[11.25, 1, -10000]} />
<CuboidCollider args={[0.2, 2, 10000]} position={[-11.25, 1, -10000]} />
<CuboidCollider
  name="Background Side Left"
  args={[1, 5, 10000]}
  position={[-12.25, 1, -10000]}
  rotation={[0, 0, Math.PI / 3]}
/>
<CuboidCollider
  name="Background Side Right"
  args={[1, 5, 10000]}
  position={[12.25, 1, -10000]}
  rotation={[0, 0, -Math.PI / 3]}
/>
<RigidBody type="fixed" name="left-over-highway" friction={ 1}>
  <CuboidCollider args={[2, 0, 10000]} position={[-9.5, 0, -10000]} />
</RigidBody>
<RigidBody type="fixed" name="left-road" friction={ 1}>
  <CuboidCollider args={[3.25, 0, 10000]} position={[-4.25, 0, -10000]} />
</RigidBody>
<RigidBody type="fixed" name="middle-road" friction={ 1}>
  <CuboidCollider args={[1, 0, 10000]} position={[0, 0, -10000]} />
</RigidBody>
<RigidBody type="fixed" name="right-road" friction={ 1}>
  <CuboidCollider args={[3.25, 0, 10000]} position={[4.25, 0, -10000]} />
</RigidBody>
<RigidBody type="fixed" name="right-over-highway" friction={ 1}>
  <CuboidCollider args={[1, 0, 10000]} position={[9.5, 0, -10000]} />
</RigidBody> */
