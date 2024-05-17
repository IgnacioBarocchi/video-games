import { forwardRef, memo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import truckModelFile from "../../assets/models/Car.glb";

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

export const CarModel = memo(
  forwardRef<{}, PlayerObjectReferences>((_, ref) => {
    const { nodes, materials } = useGLTF(truckModelFile) as GLTFResult;

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
