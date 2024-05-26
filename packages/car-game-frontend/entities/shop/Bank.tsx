import React, { FC } from "react";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Bank3DModel } from "./Bank3DModel";
import { ROAD_LENGTH } from "game-constants";
import { MathUtils } from "three";

const BANK_WIDTH = 25;
const BANK_LENGTH = 13;

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

const RoadChunk: FC<{ side: "right" | "left" }> = ({ side }) => {
  return (
    <>
      <CuboidCollider
        name={`barrier ${side}`}
        args={[BARRIER_WIDTH, BARRIER_HEIGHT, 0.6]}
        position={[
          (side === "left" ? -1 : 1) * BARRIER_POSITION_X,
          POSITION_Y,
          -0.6,
        ]}
      />
      <CuboidCollider
        name={`slope ${side}`}
        args={[0, SLOPE_HEIGHT, 0.6]}
        position={[
          (side === "left" ? -1 : 1) * SLOPE_POSITION_X,
          SLOPE_POSITION_Y,
          -0.6,
        ]}
        rotation={[0, 0, MathUtils.degToRad(SLOPE_ROTATION_ANGLE)]}
      />
      <CuboidCollider
        name={`grass ${side}`}
        args={[GRASS_WIDTH, 0, 0.6]}
        position={[
          (side === "left" ? -1 : 1) * GRASS_POSITION_X,
          POSITION_Y,
          -0.6,
        ]}
      />
    </>
  );
};

const Border: FC<{ side: "right" | "left" }> = ({ side }) => {
  return (
    <>
      <CuboidCollider
        name={`a`}
        args={[6, 1, 13]}
        position={[(side === "left" ? -1 : 1) * 19, POSITION_Y, -14]}
      />
    </>
  );
};

const Building = () => {
  return (
    <>
      <CuboidCollider
        name="main building"
        args={[15, 1, 4]}
        position={[-10, 1, -14]}
      />
      <CuboidCollider
        name="main building"
        args={[3, 1, 3]}
        position={[7, 1, -20.5]}
      />

      <CuboidCollider
        name="main building"
        args={[25, 1, 0]}
        position={[0, 1, -26]}
      />
    </>
  );
};

export const Bank = () => {
  return (
    <RigidBody type="fixed" position={[0, 0, -ROAD_LENGTH]} colliders={false}>
      <CuboidCollider
        args={[BANK_WIDTH, 0, BANK_LENGTH]}
        position={[0, 0, -BANK_LENGTH]}
      />
      <RoadChunk side="right" />
      <RoadChunk side="left" />
      <Border side="right" />
      <Border side="left" />
      <Building />
      <Bank3DModel />
    </RigidBody>
  );
};
