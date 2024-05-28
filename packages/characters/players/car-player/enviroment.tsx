import React, { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder, Plane, Sphere } from "@react-three/drei";

function RainDrop({ position }) {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y = 0;
    ref.current.position.y -= 0.2; // Adjust the speed of falling drops here
    if (ref.current.position.y < -5) {
      ref.current.position.y = 20; // Reset drop position when it falls out of view
    }
  });

  return (
    <Plane ref={ref} args={[0.01, 0.1]} position={position}>
      <meshBasicMaterial color="white" transparent opacity={0.5} />
    </Plane>
  );
}

export const Rain = forwardRef(({}, carRigidBodyReference) => {
  const ref = useRef();
  const numDrops = 1000;

  useFrame(() => {
    if (!ref?.current || !carRigidBodyReference?.current) {
      return;
    }

    const translation = carRigidBodyReference.current.translation();
    ref.current.position.z = translation.z;
    ref.current.position.x = translation.x;
  });

  return (
    <group ref={ref}>
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
    </group>
  );
});
