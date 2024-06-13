import { useFrame } from "@react-three/fiber";
import { CarPlayerContext } from "characters";
import { useContext, useRef } from "react";
import * as THREE from "three";
// todo: remove from main thread
export const RainV2 = () => {
  const ref = useRef();
  const actor = useContext(CarPlayerContext);

  const numParticles = 500;
  const range = 20;
  const particles = new Float32Array(numParticles * 3);

  for (let i = 0; i < particles.length; i += 3) {
    particles[i] = (Math.random() - 0.5) * range * 2;
    particles[i + 1] = (Math.random() - 0.5) * range;
    particles[i + 2] = (Math.random() - 0.5) * range;
  }

  useFrame((_state, delta) => {
    const carPlayerRigidBody = actor?.getSnapshot()?.context?.rigidBody;
    if (!ref?.current?.geometry?.attributes?.position || !carPlayerRigidBody) {
      return;
    }
    const translation = carPlayerRigidBody.translation();
    ref.current.position.z = translation.z;
    // ref.current.position.x = translation.x;

    for (let i = 0; i < particles.length; i += 3) {
      particles[i + 1] -= delta * 3.3; // Adjust the falling speed (lower values = slower)

      if (particles[i + 1] < -3) {
        particles[i + 1] = 1.5; // Reset the particle to the top when it falls below the range
        //  particles[i + 1] += delta * 2.5
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true; // Update the position attribute to apply the changes
  });

  return (
    <points
      ref={ref}
      rotation={[0, 0, THREE.MathUtils.degToRad(1)]}
      position={[0, 4.5, 0]}
    >
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={numParticles}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.11}
        color="white"
        alphaTest={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// /*

// import { useContext, useRef } from "react";
// import {
//   InstancedMesh,
//   MathUtils,
//   MeshBasicMaterial,
//   PlaneGeometry,
//   Vector3,
// } from "three";
// import { Plane } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import { CarPlayerContext } from "characters";

// const rainWorker = new Worker("../workers/rain-worker.js");
// const rainHeight = 4.5;
// const numDrops = 500;
// const rainDropGeometry = new PlaneGeometry(0.01, 0.1);

// const rainMesh = new InstancedMesh(
//   rainDropGeometry,
//   new MeshBasicMaterial({ color: "white", transparent: true, opacity: 0.5 }),
//   numDrops
// );

// export const Rain = () => {
//   const ref = useRef();
//   const actor = useContext(CarPlayerContext);

//   const rainDropPositions = new Float32Array(
//     numDrops * 3 /* 3 for x, y, z coordinates */
//     );

//     // Initialize random rain drop positions
//     for (let i = 0; i < numDrops * 3; i += 3) {
//       rainDropPositions[i] = Math.random() * 30 - 5;
//       rainDropPositions[i + 1] = Math.random() * rainHeight * 2;
//       rainDropPositions[i + 2] = Math.random() * 30 - 5;
//     }

//     useFrame((_state, delta) => {
//       const carPlayerRigidBody = actor?.getSnapshot()?.context?.rigidBody;
//       if (!ref?.current || !carPlayerRigidBody) {
//         return;
//       }

//       const translation = carPlayerRigidBody.translation();
//       ref.current.position.z = translation.z;
//       ref.current.position.x = translation.x;
//       const rainDrops = new Array(numDrops).fill(null).map((_, index) => ({
//         position: new Vector3(
//           rainDropPositions[index * 3],
//           rainDropPositions[index * 3 + 1],
//           rainDropPositions[index * 3 + 2]
//         ),
//       }));

//       // Update rain drop positions based on your rain simulation logic
//       rainDrops.forEach((dropData, index) => {
//         const i = index * 3;
//         rainDropPositions[i + 1] -= delta * 5; // Update y position for falling effect
//         if (rainDropPositions[i + 1] <= 0) {
//           rainDropPositions[i] = Math.random() * 30 - 5;
//           rainDropPositions[i + 1] = Math.random() * rainHeight * 2;
//           rainDropPositions[i + 2] = Math.random() * 30 - 5;
//         }

//         dropData.position.x = 1;
//         dropData.position.y = 2;
//         dropData.position.z = -10;
//       });

//       rainMesh.geometry.attributes.position.needsUpdate = true;
//       console.log(rainDropPositions[0]);
//       // You can uncomment worker communication if needed
//       // rainWorker.postMessage({ raindrops: rainDrops, delta });

//       // rainWorker.onmessage = (event) => {
//       //   const updatedDrops = event.data;
//       //   updatedDrops.forEach((dropData, index) => {
//       //     rainDropPositions[index * 3] = dropData.position.x;
//       //     rainDropPositions[index * 3 + 1] = dropData.position.y;
//       //     rainDropPositions[index * 3 + 2] = dropData.position.z;
//       //   });
//       // };
//     });

//     return (
//       <group ref={ref} rotation={[0, 0, MathUtils.degToRad(30)]}>
//         <instancedMesh ref={rainMesh} />
//       </group>
//     );
//   };

// */
