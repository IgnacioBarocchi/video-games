import { useContext, useRef } from "react";
import {
  InstancedMesh,
  MathUtils,
  MeshBasicMaterial,
  PlaneGeometry,
} from "three";
import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CarPlayerContext } from "characters";
import RainWorker from "../workers/rain-worker?worker";

const rainWorker = new RainWorker();
const rainHeight = 4.5;
const numDrops = 500;
// const rainDropGeometry = new PlaneGeometry(0.01, 0.1);

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

export const Rain = () => {
  const ref = useRef();
  const actor = useContext(CarPlayerContext);

  useFrame((_state, delta) => {
    const carPlayerRigidBody = actor?.getSnapshot()?.context?.rigidBody;
    if (!ref?.current?.children || !carPlayerRigidBody) {
      return;
    }

    const translation = carPlayerRigidBody.translation();
    ref.current.position.z = translation.z - 10;
    ref.current.position.x = translation.x;

    const rainDrops = [...ref.current.children].map((child) => ({
      position: child.position.clone(),
    }));

    rainWorker.postMessage({ raindrops: rainDrops, delta });

    rainWorker.onmessage = (event) => {
      const updatedDrops = event.data;
      updatedDrops.forEach((dropData, index) => {
        ref.current.children[index].position.copy(dropData.position);
      });
    };
  });

  return (
    <group ref={ref} rotation={[0, 0, MathUtils.degToRad(20)]}>
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
};

// export const RainWithWorker = () => {
//   const ref = useRef();
//   const numDrops = 1000;
//   const actor = useContext(CarPlayerContext);
//   const [positions, setPositions] = useState(
//     Array.from({ length: numDrops }).map(() => [
//       Math.random() * 30 - 5,
//       Math.random() * rainHeight * 2,
//       Math.random() * 30 - 5,
//     ])
//   );
//   const [worker, setWorker] = useState(null);

//   useEffect(() => {
//     const newWorker = new Worker(new URL("./rain-worker.js", import.meta.url));
//     setWorker(newWorker);

//     return () => {
//       if (worker) {
//         worker.terminate();
//       }
//     };
//   }, []);

//   useFrame((state, delta) => {
//     const rigi = actor?.getSnapshot()?.context?.rigidBody;
//     if (!ref?.current || !rigi || !worker) {
//       return;
//     }

//     const translation = rigi.translation();
//     ref.current.position.z = translation.z;
//     ref.current.position.x = translation.x;

//     worker.onmessage = function (event) {
//       setPositions(event.data.updatedPositions);
//     };

//     worker.postMessage({ positions, delta, numDrops });
//   });

//   // useEffect(() => {
//   //   if (worker) {
//   //     worker.onmessage = function (event) {
//   //       setPositions(event.data.updatedPositions);
//   //     };
//   //   }
//   // }, [worker]);

//   return (
//     <group ref={ref} rotation={[0, 0, MathUtils.degToRad(30)]}>
//       <Suspense>
//         {positions.map((position, index) => (
//           <RainDropWithWorker
//             key={index}
//             ref={(el) => (ref.current.children[index] = el)}
//             position={position}
//           />
//         ))}
//       </Suspense>
//     </group>
//   );
// };

// ! worker!!

// const RainDropWithWorker = React.forwardRef(({ position }, ref) => {
//   return (
//     <Plane ref={ref} args={[0.01, 0.1]} position={position}>
//       <meshBasicMaterial color="white" transparent opacity={0.5} />
//     </Plane>
//   );
// });

// export const RainWithWorker = () => {
//   const groupRef = useRef();
//   const numDrops = 1000;
//   const actor = useContext(CarPlayerContext);
//   const [positions, setPositions] = useState(
//     Array.from({ length: numDrops }).map(() => [
//       Math.random() * 30 - 5,
//       Math.random() * rainHeight * 2,
//       Math.random() * 30 - 5,
//     ])
//   );
//   const workerRef = useRef(null);

//   useEffect(() => {
//     // const worker = new Worker(
//     //   new URL("../workers/rain-worker", import.meta.url)
//     // );
//     workerRef.current = worker;

//     worker.onmessage = function (event) {
//       setPositions(event.data.updatedPositions);
//     };

//     return () => {
//       worker.terminate();
//     };
//   }, []);

//   useFrame((state, delta) => {
//     const rigi = actor?.getSnapshot()?.context?.rigidBody;
//     if (!groupRef.current || !rigi || !workerRef.current) {
//       return;
//     }

//     const translation = rigi.translation();
//     groupRef.current.position.z = translation.z;
//     groupRef.current.position.x = translation.x;

//     workerRef.current.postMessage({ positions, delta, numDrops });
//   });

//   return (
//     <group ref={groupRef} rotation={[0, 0, MathUtils.degToRad(30)]}>
//       {positions.map((position, index) => (
//         <RainDropWithWorker key={index} position={position} />
//       ))}
//     </group>
//   );
// };

// * BEFORE WORKER

// useFrame(() => {
//   const carPlayerRigidBody = actor?.getSnapshot()?.context?.rigidBody;
//   if (!ref?.current || !carPlayerRigidBody) {
//     return;
//   }

//   const translation = carPlayerRigidBody.translation();
//   ref.current.position.z = translation.z;
//   ref.current.position.x = translation.x;
// });
