import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import backpack3DModelFile from "../../../assets/models/Backpack.glb";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube_4: THREE.Mesh;
    Cube_5: THREE.Mesh;
  };
  materials: {
    Backpack_Base: THREE.MeshBasicMaterial;
    Backpack_Stripes: THREE.MeshBasicMaterial;
    Backpack_Details: THREE.MeshBasicMaterial;
    Backpack_Shade: THREE.MeshBasicMaterial;
    Backpack_High: THREE.MeshBasicMaterial;
  };
};

export const Backpack3DModel = () => {
  const { nodes, materials } = useGLTF(backpack3DModelFile) as GLTFResult;

  return (
    <group dispose={null}>
      <group position={[0, 0.25, 0]} scale={0.2}>
        <mesh
          geometry={nodes.Cube_1.geometry}
          material={materials.Backpack_Base}
        />
        <mesh
          geometry={nodes.Cube_2.geometry}
          material={materials.Backpack_Stripes}
        />
        <mesh
          geometry={nodes.Cube_3.geometry}
          material={materials.Backpack_Details}
        />
        <mesh
          geometry={nodes.Cube_4.geometry}
          material={materials.Backpack_Shade}
        />
        <mesh
          geometry={nodes.Cube_5.geometry}
          material={materials.Backpack_High}
        />
      </group>
    </group>
  );
};

useGLTF.preload(backpack3DModelFile);
