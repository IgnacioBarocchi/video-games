import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { forwardRef, memo, useState } from "react";
import { GLTF } from "three-stdlib";
import { PlayerObjectReferences } from ".";
import truckModelFile from "../assets/models/Car/Car.glb";

export type GLTFResult = GLTF & {
  nodes: {
    CAR_MESH: THREE.Mesh;
    CAR_MESH_1: THREE.Mesh;
    CAR_MESH_2: THREE.Mesh;
    CAR_MESH_3: THREE.Mesh;
    CAR_MESH_4: THREE.Mesh;
    CAR_MESH_5: THREE.Mesh;
    CAR_MESH_6: THREE.Mesh;
    CAR_MESH_7: THREE.Mesh;
    CAR_MESH_8: THREE.Mesh;
    CAR_MESH_9: THREE.Mesh;
  };
  materials: {
    Car_High: THREE.MeshBasicMaterial;
    Car_Base: THREE.MeshBasicMaterial;
    Car_Plastic: THREE.MeshBasicMaterial;
    Car_Shade: THREE.MeshBasicMaterial;
    Car_Shade_2: THREE.MeshBasicMaterial;
    Frontlight_1: THREE.MeshBasicMaterial;
    Car_window: THREE.MeshBasicMaterial;
    Car_Interior: THREE.MeshBasicMaterial;
    Car_Window_Shade: THREE.MeshBasicMaterial;
    Backlight: THREE.MeshBasicMaterial;
  };
};

type ActionName =
  | "Engine_Running"
  | "Front_Wheels_Turn_Right"
  | "Front_Wheels_Running"
  | "Front_Wheels_Turn_left"
  | "Back_Wheels_Running";

export type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export const CarModel = memo(
  forwardRef<{}, PlayerObjectReferences>((_, ref) => {
    const [carDrivingState, setCarDrivingState] = useState("STOP");
    const { nodes, materials, animations } = useGLTF(
      truckModelFile
    ) as GLTFResult;

    return (
      // TODO: FIX SCALE
      <group ref={ref.current.modelRef} scale={2.5} dispose={null}>
        <group position={[0, 0.89, -0.18]} scale={[0.24, 0.32, 0.24]}>
          <mesh
            geometry={nodes.CAR_MESH.geometry}
            material={materials.Car_High}
          />
          <mesh
            geometry={nodes.CAR_MESH_1.geometry}
            material={materials.Car_Base}
          />
          <mesh
            geometry={nodes.CAR_MESH_2.geometry}
            material={materials.Car_Plastic}
          />
          <mesh
            geometry={nodes.CAR_MESH_3.geometry}
            material={materials.Car_Shade}
          />
          <mesh
            geometry={nodes.CAR_MESH_4.geometry}
            material={materials.Car_Shade_2}
          />
          <mesh
            geometry={nodes.CAR_MESH_5.geometry}
            material={materials.Frontlight_1}
          />
          <mesh
            geometry={nodes.CAR_MESH_6.geometry}
            material={materials.Car_window}
          />
          <mesh
            geometry={nodes.CAR_MESH_7.geometry}
            material={materials.Car_Interior}
          />
          <mesh
            geometry={nodes.CAR_MESH_8.geometry}
            material={materials.Car_Window_Shade}
          />
          <mesh
            geometry={nodes.CAR_MESH_9.geometry}
            material={materials.Backlight}
          />
        </group>
      </group>
    );
  })
);

useGLTF.preload(truckModelFile);

// const turnWheels = (side: 'L' | 'R', actions: GLTFActions) => {
//   if (
//     actions[`FL_Wheel_Turn_${side}`].isRunning() ||
//     actions[`FR_Wheel_Turn_${side}`].isRunning()
//   ) {
//     return;
//   }

//   actions[`FL_Wheel_Turn_${side}`].reset().play();
//   actions[`FR_Wheel_Turn_${side}`].reset().play();
// };

// const swingCar = (side: 'L' | 'R', actions: GLTFActions) => {
//   if (
//     actions[`Exterior_Turn_${side}`].isRunning() ||
//     actions[`Backlights_Turn_${side}`].isRunning()
//   ) {
//     return;
//   }

//   // actions[`Exterior_Turn_${side}`].setLoop(THREE.LoopOnce, 1);
//   // actions[`Exterior_Turn_${side}`].clampWhenFinished = true;
//   // actions[`Exterior_Turn_${side}`].enabled = true;
//   actions[`Exterior_Turn_${side}`].reset().play();

//   // actions[`Backlights_Turn_${side}`].setLoop(THREE.LoopOnce, 1);
//   // actions[`Backlights_Turn_${side}`].clampWhenFinished = true;
//   // actions[`Backlights_Turn_${side}`].enabled = true;
//   actions[`Backlights_Turn_${side}`].reset().play();
// };

// const { actions } = useAnimations<GLTFActions>(
//   animations,
//   ref.current.modelRef
// );

// const animator = useMemo(
//   () =>
//     new Animator({
//       rigidbody: ref.current.rigidbody,
//       actions,
//       setCarDrivingState,
//     }),
//   [ref.current.rigidbody, actions]
// );

// useFrame(() => {
//   if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
//     return;
//   }
//   animator.watchCarMovement();
// });

// useEffect(() => {
//   if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
//     return;
//   }

//   // if (carDrivingState.includes('LEFT')) {
//   //   actions.Front_Wheels_Turn_Left?.reset().play();
//   // } else {
//   //   actions.Front_Wheels_Turn_Left?.crossFadeTo(
//   //     actions.Front_Wheels_Running,
//   //     1,
//   //     true,
//   //   ).stop();
//   // }

//   // if (carDrivingState.includes('RIGHT')) {
//   //   actions.Front_Wheels_Turn_Right.timeScale = 0.5;
//   //   actions.Front_Wheels_Turn_Right.reset().play();
//   // } else {
//   //   actions.Front_Wheels_Turn_Right?.crossFadeTo(
//   //     actions.Front_Wheels_Running,
//   //     1,
//   //     true,
//   //   ).stop();
//   // }

//   if (carDrivingState === "STOP") {
//     actions.Front_Wheels_Running.stop();
//     actions.Back_Wheels_Running.stop();
//   } else {
//     actions.Engine_Running.reset().play();
//     actions.Front_Wheels_Running.play();
//     actions.Back_Wheels_Running.play();
//   }
// }, [carDrivingState, ref.current.rigidbody]);
