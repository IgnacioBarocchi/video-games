import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, memo, useEffect, useMemo, useState } from "react";
import { GLTF } from "three-stdlib";
import { PlayerObjectReferences } from ".";
import { Animator } from "./Animator";
import { useFrame } from "@react-three/fiber";
import { DriverModel } from "./model/Driver";
import truckModelFile from "../assets/models/Car/Car_V2.gltf";

export type GLTFResult = GLTF & {
  nodes: {
    Truck_1: THREE.Mesh;
    Truck_2: THREE.Mesh;
    Truck_3: THREE.Mesh;
    Truck_4: THREE.Mesh;
    Truck_5: THREE.Mesh;
    Truck_6: THREE.Mesh;
    Truck_7: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube001_1: THREE.Mesh;
    BL: THREE.Mesh;
    Cube002: THREE.Mesh;
    Cube002_1: THREE.Mesh;
    Cube002_2: THREE.Mesh;
    Cube002_3: THREE.Mesh;
    Cube002_4: THREE.Mesh;
    FL: THREE.Mesh;
    Interior: THREE.Mesh;
    Seats_1: THREE.Mesh;
    Seats_2: THREE.Mesh;
    Cube: THREE.Mesh;
    Cube_1: THREE.Mesh;
    Cube004: THREE.Mesh;
    Cube004_1: THREE.Mesh;
    Cube004_2: THREE.Mesh;
    Cube004_3: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cube008_1: THREE.Mesh;
    Cube008_2: THREE.Mesh;
    Cube008_3: THREE.Mesh;
    Cylinder005: THREE.Mesh;
    Cylinder005_1: THREE.Mesh;
    Cylinder005_2: THREE.Mesh;
    Cylinder005_3: THREE.Mesh;
    Cylinder005_4: THREE.Mesh;
    Cylinder005_5: THREE.Mesh;
    Cylinder001: THREE.Mesh;
    Cylinder001_1: THREE.Mesh;
    Cylinder001_2: THREE.Mesh;
    Cylinder001_3: THREE.Mesh;
    Cylinder001_4: THREE.Mesh;
    Cylinder001_5: THREE.Mesh;
  };
  materials: {
    Dark: THREE.MeshBasicMaterial;
    Mid: THREE.MeshBasicMaterial;
    High: THREE.MeshBasicMaterial;
    Rust: THREE.MeshBasicMaterial;
    Detail: THREE.MeshBasicMaterial;
    Blood: THREE.MeshBasicMaterial;
    Shade: THREE.MeshBasicMaterial;
    Bag_Details: THREE.MeshStandardMaterial;
    Break_Lights: THREE.MeshBasicMaterial;
    Base: THREE.MeshBasicMaterial;
    Black: THREE.MeshBasicMaterial;
    Dark_Bumper: THREE.MeshBasicMaterial;
    Yellow_Shade: THREE.MeshBasicMaterial;
    Front_Lights: THREE.MeshBasicMaterial;
    Seat_High: THREE.MeshStandardMaterial;
    Seat_Shade: THREE.MeshStandardMaterial;
    Mid_Chrome: THREE.MeshBasicMaterial;
    Dark_Chrome: THREE.MeshBasicMaterial;
    White: THREE.MeshBasicMaterial;
    Light_Blue: THREE.MeshBasicMaterial;
    Yellow: THREE.MeshBasicMaterial;
    Wood: THREE.MeshBasicMaterial;
    Wood_Shadow: THREE.MeshBasicMaterial;
    Wood_Shade: THREE.MeshBasicMaterial;
    Rubber: THREE.MeshBasicMaterial;
    ["Rubber.001"]: THREE.MeshBasicMaterial;
    ["Mid_Chrome.001"]: THREE.MeshBasicMaterial;
    ["Dark_Chrome.001"]: THREE.MeshBasicMaterial;
    ["Rust.001"]: THREE.MeshBasicMaterial;
    ["Blood.001"]: THREE.MeshBasicMaterial;
    ["Dark.001"]: THREE.MeshBasicMaterial;
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

    const { actions } = useAnimations<GLTFActions>(
      animations,
      ref.current.modelRef
    );

    const animator = useMemo(
      () =>
        new Animator({
          rigidbody: ref.current.rigidbody,
          actions,
          setCarDrivingState,
        }),
      [ref.current.rigidbody, actions]
    );

    useFrame(() => {
      if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
        return;
      }
      animator.watchCarMovement();
    });

    useEffect(() => {
      if (!ref.current?.modelRef?.current || !ref.current?.rigidbody) {
        return;
      }

      // if (carDrivingState.includes('LEFT')) {
      //   actions.Front_Wheels_Turn_Left?.reset().play();
      // } else {
      //   actions.Front_Wheels_Turn_Left?.crossFadeTo(
      //     actions.Front_Wheels_Running,
      //     1,
      //     true,
      //   ).stop();
      // }

      // if (carDrivingState.includes('RIGHT')) {
      //   actions.Front_Wheels_Turn_Right.timeScale = 0.5;
      //   actions.Front_Wheels_Turn_Right.reset().play();
      // } else {
      //   actions.Front_Wheels_Turn_Right?.crossFadeTo(
      //     actions.Front_Wheels_Running,
      //     1,
      //     true,
      //   ).stop();
      // }

      if (carDrivingState === "STOP") {
        actions.Front_Wheels_Running.stop();
        actions.Back_Wheels_Running.stop();
      } else {
        actions.Engine_Running.reset().play();
        actions.Front_Wheels_Running.play();
        actions.Back_Wheels_Running.play();
      }
    }, [carDrivingState, ref.current.rigidbody]);

    return (
      <group ref={ref.current.modelRef} dispose={null} scale={1.2}>
        <group name="Scene">
          <group
            name="Truck"
            position={[-0.04, 0.76, 0.05]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[-1.7, -2.64, -1.61]}
          >
            <mesh
              name="Truck_1"
              geometry={nodes.Truck_1.geometry}
              material={materials.Dark}
            />
            <mesh
              name="Truck_2"
              geometry={nodes.Truck_2.geometry}
              material={materials.Mid}
            />
            <mesh
              name="Truck_3"
              geometry={nodes.Truck_3.geometry}
              material={materials.High}
            />
            <mesh
              name="Truck_4"
              geometry={nodes.Truck_4.geometry}
              material={materials.Rust}
            />
            <mesh
              name="Truck_5"
              geometry={nodes.Truck_5.geometry}
              material={materials.Detail}
            />
            <mesh
              name="Truck_6"
              geometry={nodes.Truck_6.geometry}
              material={materials.Blood}
            />
            <mesh
              name="Truck_7"
              geometry={nodes.Truck_7.geometry}
              material={materials.Shade}
            />
            <mesh
              name="Truck_8"
              geometry={nodes.Truck_8.geometry}
              material={materials.Base}
            />
            <mesh
              name="Truck_9"
              geometry={nodes.Truck_9.geometry}
              material={materials.Black}
            />
            <mesh
              name="Truck_10"
              geometry={nodes.Truck_10.geometry}
              material={materials.Dark_Bumper}
            />
            <mesh
              name="Truck_11"
              geometry={nodes.Truck_11.geometry}
              material={materials.Yellow_Shade}
            />
            <group
              name="Bag"
              position={[-0.78, -0.01, 2.07]}
              rotation={[2.89, -0.11, 1.59]}
              scale={[0.41, 0.23, 0.24]}
            >
              <mesh
                name="Cube001"
                geometry={nodes.Cube001.geometry}
                material={materials.Dark}
              />
              <mesh
                name="Cube001_1"
                geometry={nodes.Cube001_1.geometry}
                material={materials.Bag_Details}
              />
            </group>
            <mesh
              name="BL"
              geometry={nodes.BL.geometry}
              material={materials.Break_Lights}
              position={[-0.37, -0.38, 2.75]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.07, 0.11, 0.12]}
            />
            <mesh
              name="FL"
              geometry={nodes.FL.geometry}
              material={materials.Front_Lights}
              position={[-0.52, 0.58, -2.97]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.06, 0.09, 0.09]}
            />
            <mesh
              name="Interior"
              geometry={nodes.Interior.geometry}
              material={materials.Dark}
              position={[-0.84, 0, 0.02]}
              rotation={[0, 0, -Math.PI]}
              scale={[-0.17, -0.11, -1.48]}
            >
              <group
                name="Seats"
                position={[3.73, 0.12, -1.22]}
                rotation={[Math.PI / 2, Math.PI / 2, 0]}
                scale={[3.55, 0.42, 3.55]}
              >
                <mesh
                  name="Seats_1"
                  geometry={nodes.Seats_1.geometry}
                  material={materials.Seat_High}
                />
                <mesh
                  name="Seats_2"
                  geometry={nodes.Seats_2.geometry}
                  material={materials.Seat_Shade}
                />
              </group>
            </mesh>
            <group
              name="Ladder"
              position={[-0.8, -0.62, 0.01]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.03, 0.46, 0.33]}
            >
              <mesh
                name="Cube"
                geometry={nodes.Cube.geometry}
                material={materials.Mid_Chrome}
              />
              <mesh
                name="Cube_1"
                geometry={nodes.Cube_1.geometry}
                material={materials.Dark_Chrome}
              />
            </group>
            <group
              name="Plate"
              position={[-0.41, 0, 2.81]}
              rotation={[-0.02, -0.03, -1.52]}
              scale={[-0.13, -0.1, -0.01]}
            >
              <mesh
                name="Cube004"
                geometry={nodes.Cube004.geometry}
                material={materials.Black}
              />
              <mesh
                name="Cube004_1"
                geometry={nodes.Cube004_1.geometry}
                material={materials.White}
              />
              <mesh
                name="Cube004_2"
                geometry={nodes.Cube004_2.geometry}
                material={materials.Light_Blue}
              />
              <mesh
                name="Cube004_3"
                geometry={nodes.Cube004_3.geometry}
                material={materials.Yellow}
              />
            </group>
            <group
              name="Wood"
              position={[0.45, 0.01, 0.03]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[0.05, 1.05, 0.02]}
            >
              <mesh
                name="Cube008"
                geometry={nodes.Cube008.geometry}
                material={materials.Wood}
              />
              <mesh
                name="Cube008_1"
                geometry={nodes.Cube008_1.geometry}
                material={materials.Wood_Shadow}
              />
              <mesh
                name="Cube008_2"
                geometry={nodes.Cube008_2.geometry}
                material={materials.Dark_Chrome}
              />
              <mesh
                name="Cube008_3"
                geometry={nodes.Cube008_3.geometry}
                material={materials.Wood_Shade}
              />
            </group>
          </group>
          <group
            name="Front_Wheels"
            position={[-0.02, 0.81, 3.32]}
            scale={[-0.73, -0.45, -0.73]}
          >
            <mesh
              name="Cylinder005"
              geometry={nodes.Cylinder005.geometry}
              material={materials.Rubber}
            />
            <mesh
              name="Cylinder005_1"
              geometry={nodes.Cylinder005_1.geometry}
              material={materials.Mid_Chrome}
            />
            <mesh
              name="Cylinder005_2"
              geometry={nodes.Cylinder005_2.geometry}
              material={materials.Dark_Chrome}
            />
            <mesh
              name="Cylinder005_3"
              geometry={nodes.Cylinder005_3.geometry}
              material={materials.Rust}
            />
            <mesh
              name="Cylinder005_4"
              geometry={nodes.Cylinder005_4.geometry}
              material={materials.Blood}
            />
            <mesh
              name="Cylinder005_5"
              geometry={nodes.Cylinder005_5.geometry}
              material={materials.Dark}
            />
          </group>
          <group
            name="Back_Wheels"
            position={[-0.02, 0.81, -3.17]}
            scale={[-0.73, -0.45, -0.73]}
          >
            <mesh
              name="Cylinder001"
              geometry={nodes.Cylinder001.geometry}
              material={materials["Rubber.001"]}
            />
            <mesh
              name="Cylinder001_1"
              geometry={nodes.Cylinder001_1.geometry}
              material={materials["Mid_Chrome.001"]}
            />
            <mesh
              name="Cylinder001_2"
              geometry={nodes.Cylinder001_2.geometry}
              material={materials["Dark_Chrome.001"]}
            />
            <mesh
              name="Cylinder001_3"
              geometry={nodes.Cylinder001_3.geometry}
              material={materials["Rust.001"]}
            />
            <mesh
              name="Cylinder001_4"
              geometry={nodes.Cylinder001_4.geometry}
              material={materials["Blood.001"]}
            />
            <mesh
              name="Cylinder001_5"
              geometry={nodes.Cylinder001_5.geometry}
              material={materials["Dark.001"]}
            />
          </group>
          <DriverModel carDrivingState={carDrivingState} />
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
