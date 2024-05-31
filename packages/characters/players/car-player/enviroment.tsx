import { forwardRef, useRef } from "react";

import { MathUtils } from "three";
import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
const rainHeight = 4.5;

function RainDrop({ position }) {
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.y = 0;
    ref.current.position.y -= delta * 5;
    if (ref.current.position.y <= 0) {
      ref.current.position.y = rainHeight;
    }
  });

  return (
    <>
      <Plane ref={ref} args={[0.01, 0.1]} position={position}>
        <meshBasicMaterial color="white" transparent opacity={0.5} />
      </Plane>
    </>
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
    <group ref={ref} rotation={[0, 0, MathUtils.degToRad(30)]}>
      {Array.from({ length: numDrops }).map((_, index) => (
        <RainDrop
          key={index}
          position={[
            Math.random() * 30 - 5,
            Math.random() * rainHeight * 2,
            Math.random() * 30 - 5,
          ]}
        />
      ))}
    </group>
  );
});
