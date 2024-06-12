import { forwardRef, memo, useRef } from "react";
import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import carModelFile from "../../assets/models/Car.glb";
import { useFrame } from "@react-three/fiber";
import { PlayerObjectReferences } from "../car-player/car-player";

export type GLTFResult = GLTF & {
  nodes: {
    CAR_BODY_MESH: THREE.Mesh;
    CAR_BODY_MESH_1: THREE.Mesh;
    CAR_BODY_MESH_2: THREE.Mesh;
    CAR_BODY_MESH_3: THREE.Mesh;
    CAR_BODY_MESH_4: THREE.Mesh;
    CAR_BODY_MESH_5: THREE.Mesh;
    CAR_BODY_MESH_6: THREE.Mesh;
    CAR_BODY_MESH_7: THREE.Mesh;
    CAR_BODY_MESH_8: THREE.Mesh;
    CAR_BODY_MESH_9: THREE.Mesh;
    MIRRORS_MESH: THREE.Mesh;
    MIRRORS_MESH_1: THREE.Mesh;
    MIRRORS_MESH_2: THREE.Mesh;
    MIRRORS_MESH_3: THREE.Mesh;
    MIRRORS_MESH_4: THREE.Mesh;
    MIRRORS_MESH_5: THREE.Mesh;
    MIRRORS_MESH_6: THREE.Mesh;
    FRONT_WHEELS_MESH: THREE.Mesh;
    FRONT_WHEELS_MESH_1: THREE.Mesh;
    FRONT_WHEELS_MESH_2: THREE.Mesh;
    FRONT_WHEELS_MESH_3: THREE.Mesh;
    FRONT_WHEELS_MESH_4: THREE.Mesh;
    BACK_WHEELS_MESH: THREE.Mesh;
    BACK_WHEELS_MESH_1: THREE.Mesh;
    BACK_WHEELS_MESH_2: THREE.Mesh;
    BACK_WHEELS_MESH_3: THREE.Mesh;
    BACK_WHEELS_MESH_4: THREE.Mesh;
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
    Car_Wheel_Chrome_Base: THREE.MeshBasicMaterial;
    Car_Wheel_Chrome_Shade: THREE.MeshBasicMaterial;
    Car_Wheel_Chrome_Shade_2: THREE.MeshBasicMaterial;
    Car_Wheel_Red: THREE.MeshBasicMaterial;
    Car_Wheel_Rubber: THREE.MeshBasicMaterial;
  };
};

const Wheels = forwardRef(
  ({ nodes, materials }, ref: PlayerObjectReferences) => {
    const frontWheelsRef = useRef();
    const backWheelsRef = useRef();

    useFrame((_, delta) => {
      if (!ref?.current?.rigidbody?.current) {
        return;
      }

      const forwardAxisSpeed = ref?.current?.rigidbody?.current.linvel().z;

      const wheelRotationX = forwardAxisSpeed * delta;

      if (backWheelsRef.current) {
        backWheelsRef.current.rotation.x += wheelRotationX;
      }

      if (frontWheelsRef.current) {
        frontWheelsRef.current.rotation.x += wheelRotationX;
      }
    });

    return (
      <>
        <group
          position={[0, 0.36, 1.4]}
          scale={[0.13, 0.35, 0.35]}
          ref={frontWheelsRef}
        >
          <mesh
            geometry={nodes.FRONT_WHEELS_MESH.geometry}
            material={materials.Car_Wheel_Chrome_Base}
          />
          <mesh
            geometry={nodes.FRONT_WHEELS_MESH_1.geometry}
            material={materials.Car_Wheel_Chrome_Shade}
          />
          <mesh
            geometry={nodes.FRONT_WHEELS_MESH_2.geometry}
            material={materials.Car_Wheel_Chrome_Shade_2}
          />
          <mesh
            geometry={nodes.FRONT_WHEELS_MESH_3.geometry}
            material={materials.Car_Wheel_Red}
          />
          <mesh
            geometry={nodes.FRONT_WHEELS_MESH_4.geometry}
            material={materials.Car_Wheel_Rubber}
          />
        </group>
        <group
          position={[0, 0.36, -1.53]}
          scale={[0.13, 0.35, 0.35]}
          ref={backWheelsRef}
        >
          <mesh
            geometry={nodes.BACK_WHEELS_MESH.geometry}
            material={materials.Car_Wheel_Chrome_Base}
          />
          <mesh
            geometry={nodes.BACK_WHEELS_MESH_1.geometry}
            material={materials.Car_Wheel_Chrome_Shade}
          />
          <mesh
            geometry={nodes.BACK_WHEELS_MESH_2.geometry}
            material={materials.Car_Wheel_Chrome_Shade_2}
          />
          <mesh
            geometry={nodes.BACK_WHEELS_MESH_3.geometry}
            material={materials.Car_Wheel_Red}
          />
          <mesh
            geometry={nodes.BACK_WHEELS_MESH_4.geometry}
            material={materials.Car_Wheel_Rubber}
          />
        </group>
      </>
    );
  }
);

const CarBody = forwardRef(
  ({ nodes, materials }, ref: PlayerObjectReferences) => {
    const carBodyRef = useRef();
    const timeRef = useRef(0);

    useFrame((_, delta) => {
      if (!ref?.current?.rigidbody?.current) {
        return;
      }

      // Update time
      timeRef.current += delta;

      // Oscillation effect using sine or cosine function
      const oscillationSpeed = 5; // Speed of the oscillation
      const oscillationMagnitude = 0.025; // Magnitude of the oscillation

      const upDownOffset =
        Math.sin(timeRef.current * oscillationSpeed) * oscillationMagnitude;
      const frontBackOffset =
        Math.cos(timeRef.current * oscillationSpeed) * oscillationMagnitude;

      const sidesAxisSpeed = THREE.MathUtils.degToRad(
        THREE.MathUtils.clamp(
          ref?.current?.rigidbody?.current.linvel().x,
          -3,
          3
        )
      );

      if (carBodyRef.current) {
        carBodyRef.current.rotation.z = sidesAxisSpeed;
        carBodyRef.current.position.y = 0.55 + upDownOffset;
        carBodyRef.current.position.z = 2.05 + frontBackOffset;
      }
    });

    return (
      <group
        position={[0, 0.55, 2.05]}
        scale={[0.24, 0.32, 0.24]}
        ref={carBodyRef}
      >
        <mesh
          geometry={nodes.CAR_BODY_MESH.geometry}
          material={materials.Car_High}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_1.geometry}
          material={materials.Car_Base}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_2.geometry}
          material={materials.Car_Plastic}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_3.geometry}
          material={materials.Car_Shade}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_4.geometry}
          material={materials.Car_Shade_2}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_5.geometry}
          material={materials.Frontlight_1}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_6.geometry}
          material={materials.Car_window}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_7.geometry}
          material={materials.Car_Interior}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_8.geometry}
          material={materials.Car_Window_Shade}
        />
        <mesh
          geometry={nodes.CAR_BODY_MESH_9.geometry}
          material={materials.Backlight}
        />
        <group
          position={[0, -1.74, -8.63]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.26, 0.26, 0.24]}
        >
          <mesh
            geometry={nodes.MIRRORS_MESH.geometry}
            material={materials.Car_window}
          />
          <mesh
            geometry={nodes.MIRRORS_MESH_1.geometry}
            material={materials.Car_Base}
          />
          <mesh
            geometry={nodes.MIRRORS_MESH_2.geometry}
            material={materials.Frontlight_1}
          />
          <mesh
            geometry={nodes.MIRRORS_MESH_3.geometry}
            material={materials.Car_Plastic}
          />
          <mesh
            geometry={nodes.MIRRORS_MESH_4.geometry}
            material={materials.Car_High}
          />
          <mesh
            geometry={nodes.MIRRORS_MESH_5.geometry}
            material={materials.Car_Shade}
          />
          <mesh
            geometry={nodes.MIRRORS_MESH_6.geometry}
            material={materials.Car_Base}
          />
        </group>
      </group>
    );
  }
);

export const CarModel = memo(
  forwardRef<{}, PlayerObjectReferences>((_, ref) => {
    const { nodes, materials } = useGLTF(carModelFile) as GLTFResult;

    return (
      <>
        {/* <Html distanceFactor={10}>
          <div>
            hello <br />
            world
          </div>
        </Html> */}
        <group ref={ref.current.modelRef} dispose={null}>
          <CarBody nodes={nodes} materials={materials} ref={ref} />
          <Wheels nodes={nodes} materials={materials} ref={ref} />
        </group>
      </>
    );
  })
);

useGLTF.preload(carModelFile);

/*
  import { MathUtils } from "three";
  const sidesAxisSpeed = ref?.current?.rigidbody?.current.linvel().x;
  if (false) {
    const wheelRotationY = sidesAxisSpeed * delta;
    const currentQuaternion = frontWheelsRef.current.quaternion.clone();
    const xQuaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      wheelRotationX
    );
    const yQuaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      wheelRotationY
    );

    currentQuaternion.multiplyQuaternions(yQuaternion, currentQuaternion);
    currentQuaternion.multiplyQuaternions(xQuaternion, currentQuaternion);

    const euler = new THREE.Euler().setFromQuaternion(
      currentQuaternion,
      "XYZ"
    );
    euler.y = MathUtils.clamp(
      euler.y,
      MathUtils.degToRad(-30),
      MathUtils.degToRad(30)
    );

    frontWheelsRef.current.quaternion.setFromEuler(euler);
  }
*/
