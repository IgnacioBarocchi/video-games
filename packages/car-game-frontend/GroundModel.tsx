import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import roadModelFile from "./assets/models/Road/Road.gltf";

type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube_4: THREE.Mesh;
    Cube_5: THREE.Mesh;
  };
  materials: {
    Snow: THREE.MeshStandardMaterial;
    Asphalt: THREE.MeshStandardMaterial;
    White_Paint: THREE.MeshStandardMaterial;
    Metal_Barrier: THREE.MeshPhysicalMaterial;
    Edge: THREE.MeshStandardMaterial;
  };
};

export function GroundModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(roadModelFile) as GLTFResult;

  return (
    <group scale={new THREE.Vector3(2, 2, 2000)}>
      <mesh geometry={nodes.Cube_1.geometry} material={materials.Snow} />
      <mesh geometry={nodes.Cube_2.geometry} material={materials.Asphalt} />
      <mesh geometry={nodes.Cube_3.geometry} material={materials.White_Paint} />
      <mesh
        geometry={nodes.Cube_4.geometry}
        material={materials.Metal_Barrier}
      />
      <mesh geometry={nodes.Cube_5.geometry} material={materials.Edge} />
      <mesh
        geometry={nodes.Cube_6.geometry}
        material={materials.Background_Snow}
      />
    </group>
  );
}

useGLTF.preload(roadModelFile);
