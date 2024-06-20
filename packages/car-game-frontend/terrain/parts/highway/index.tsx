import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { ENTITY, ROAD_LENGTH } from "game-constants";
import { FC, useRef } from "react";
import { MathUtils, Vector3 } from "three";
import { GroundModel } from "./GroundModel";
import { BarrierLowRes3DModel } from "../barriers/barrier-low-res-3D-model";
import { SparksAttachment3DModel } from "./SparksAttachment3DModel";

const BARRIER_WIDTH = 0.05;
const BARRIER_HEIGHT = 10;
const SLOPE_HEIGHT = 1;
const SLOPE_ROTATION_ANGLE = -60;
const GRASS_WIDTH = 7;
const BARRIER_POSITION_X = 9.7;
const SLOPE_POSITION_X = 10.7;
const GRASS_POSITION_X = 18.5;
const POSITION_Y = 1;
const SLOPE_POSITION_Y = 0.5;

const Colliders: FC<{ side: "right" | "left" }> = ({ side }) => {
  const group = useRef(null);
  return (
    <>
      <CuboidCollider
        name="roof"
        restitution={2}
        args={[10, 0, ROAD_LENGTH]}
        position={[0, 5, 0]}
      />

      <CuboidCollider
        friction={200}
        restitution={0.5}
        name={`barrier ${side}`}
        args={[BARRIER_WIDTH, BARRIER_HEIGHT, ROAD_LENGTH]}
        position={[
          (side === "left" ? -1 : 1) * BARRIER_POSITION_X,
          BARRIER_HEIGHT,
          0,
        ]}
        onContactForce={(payload) => {
          if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) {
            return;
          }

          group.current.position.z =
            payload.other.rigidBody.translation().z - 2;
        }}
        onCollisionEnter={(payload) => {
          if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) {
            return;
          }

          group.current.visible = true;
        }}
        onCollisionExit={(payload) => {
          if (payload?.other?.rigidBodyObject?.name !== ENTITY.CAR) {
            return;
          }

          group.current.visible = false;
        }}
      />
      <SparksAttachment3DModel
        ref={group}
        position={
          new Vector3((side === "left" ? -1 : 1) * BARRIER_POSITION_X, 0.65, 0)
        }
        rotation={[0, side === "left" ? MathUtils.degToRad(180) : 0, 0]}
        visible={false}
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
        restitution={5}
      >
        <BarrierLowRes3DModel scale={new Vector3(10, 1, 1)} />
      </RigidBody>
    </>
  );
};

export const HighWay = () => {
  const deviation = useRef(0);

  return (
    <>
      <RigidBody
        type="fixed"
        name={ENTITY.GRASS}
        colliders={false}
        friction={120}
      >
        <CuboidCollider
          name="Grass Boulevard"
          args={[1.7, 0, ROAD_LENGTH]}
          position={[0, 0, 0]}
        />
      </RigidBody>
      <RigidBody type="fixed" name={ENTITY.ASPHALT} colliders={false}>
        <CuboidCollider
          name="Asphalt left"
          args={[4, 0, ROAD_LENGTH]}
          position={[-5.55, 0, 0]}
        />
        <CuboidCollider
          name="Asphalt right"
          args={[4, 0, ROAD_LENGTH]}
          position={[5.55, 0, 0]}
        />
        <Colliders side="left" />
        <Colliders side="right" />
        <GroundModel />
      </RigidBody>
      <TerrainLimitBarriers />
    </>
  );
};

// onContactForce={(payload) => {
//   if (
//     payload.other.rigidBodyObject?.name !== ENTITY.CAR &&
//     Math.abs(payload.other.rigidBody.linvel().z) < 35
//   ) {
//     return;
//   }

//   deviation.current += 0.1;

//   const clampedValue = (Math.round(deviation.current * 1) % 2) - 1;
//   console.log(clampedValue);

//   const { y, z } = payload.other.rigidBody.linvel();
//   payload.other.rigidBody.setLinvel(
//     {
//       x: clampedValue,
//       y,
//       z,
//     },
//     true
//   );

//   // const { x, z, w } = payload.other.rigidBody.rotation();
//   // const newY = MathUtils.degToRad(clampedValue);
//   // payload.other.rigidBody.setRotation(
//   //   {
//   //     x,
//   //     y: newY,
//   //     z,
//   //     w,
//   //   },
//   //   true
//   // );
// }}
// function createOnceFunction(callback: Function) {
//   let hasBeenCalled = false;

//   return function () {
//     if (!hasBeenCalled) {
//       callback();
//       hasBeenCalled = true;
//     }
//   };
// }

//
// z.current = payload.other.rigidBody.translation().z;

// console.log(z.current);
// const visible = useRef(null);
// const z = useRef(0);
