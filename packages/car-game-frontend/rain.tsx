import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder, Plane, Sphere } from "@react-three/drei";

function RainDrop({ position }) {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y = 0;
    ref.current.position.y -= 0.5; // Adjust the speed of falling drops here
    if (ref.current.position.y < -5) {
      ref.current.position.y = 20; // Reset drop position when it falls out of view
    }
  });

  return (
    <Plane ref={ref} args={[0.05, 0.1]} position={position}>
      <meshStandardMaterial color="white" transparent opacity={0.5} />
    </Plane>
  );
}

export function Rain() {
  const numDrops = 1000;

  return (
    <>
      {Array.from({ length: numDrops }).map((_, index) => (
        <RainDrop
          key={index}
          position={[
            Math.random() * 30 - 5,
            Math.random() * 20,
            Math.random() * 30 - 5,
          ]}
        />
      ))}
    </>
  );
}
