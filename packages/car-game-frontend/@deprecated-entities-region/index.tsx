import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { FC, useState } from "react";
// import { payloadIsThePlayer } from "../lib/rigibBodyHelper";
import { Vector3 } from "three";
import { Text } from "@react-three/drei";

const randomRange = (lower: number, upper: number) => {
  return Math.floor(Math.random() * (upper - lower) + lower);
};

export interface EntitiesProps {
  name: string;
  quantity: number;
  side: "LEFT" | "RIGHT";
  spaceBetween: {
    x: [number, number] | number;
    y: [number, number] | number;
  };
  ZLimit: number;
  Entity: FC<{ props: JSX.IntrinsicElements["group"] }>;
}

export interface EntitiesRegionProps
  extends Omit<EntitiesProps, "side" | "quantity"> {
  ZOffset: number;
  depth: number;
  numberOfEntities: [number, number] | number;
}

const Entities: FC<EntitiesProps> = ({
  Entity,
  name,
  spaceBetween,
  side,
  quantity,
  ZLimit,
}) => {
  const zStep = (ZLimit * 2) / quantity; // Calculate step size for even distribution

  return (
    <>
      {[...Array(quantity)].map((_, i) => {
        // Calculate position with randomness
        const xPos =
          (side === "LEFT" ? -1 : 1) *
          (Array.isArray(spaceBetween.x)
            ? randomRange(spaceBetween.x[0], spaceBetween.x[1])
            : spaceBetween.x);

        const yPos =
          (side === "LEFT" ? -1 : 1) *
          (Array.isArray(spaceBetween.y)
            ? randomRange(spaceBetween.y[0], spaceBetween.y[1])
            : spaceBetween.y);

        const zPos = -ZLimit + zStep * i + Math.random() * zStep * 0.5; // Adjusted for negative ZLimit
        return <Entity key={"left" + name + i} position={[xPos, yPos, zPos]} />;
      })}
    </>
  );
};

export const EntitiesRegion: FC<EntitiesRegionProps> = ({
  name,
  depth,
  ZOffset,
  numberOfEntities,
  spaceBetween,
  Entity,
}) => {
  const [display, setDisplay] = useState(false);

  return (
    <RigidBody
      name={name}
      colliders={false}
      type="fixed"
      position={[0, 0, -(depth / 2 + ZOffset)]}
    >
      {/* <Text position={[0, 3, 0]} fontSize={40}>
        {name + "!"}
      </Text> */}
      <CuboidCollider
        args={[50, 5, depth]}
        sensor
        name={name + "Entrance"}
        // onIntersectionEnter={(payload) => {
        //   if (payloadIsThePlayer(payload)) {
        //     setDisplay(true);
        //   }
        // }}
        // onIntersectionExit={(payload) => {
        //   if (payloadIsThePlayer(payload)) {
        //     setDisplay(false);
        //   }
        // }}
      />
      {display && Array.isArray(numberOfEntities) ? (
        <>
          <Entities
            Entity={Entity}
            name={name}
            side={"LEFT"}
            spaceBetween={spaceBetween}
            ZLimit={depth}
            quantity={numberOfEntities[0]}
          />
          <Entities
            Entity={Entity}
            name={name}
            side={"RIGHT"}
            spaceBetween={spaceBetween}
            ZLimit={depth}
            quantity={numberOfEntities[1]}
          />
        </>
      ) : (
        <Entities
          Entity={Entity}
          name={name}
          side={"RIGHT"}
          spaceBetween={spaceBetween}
          ZLimit={depth}
          quantity={numberOfEntities as number}
        />
      )}
    </RigidBody>
  );
};
