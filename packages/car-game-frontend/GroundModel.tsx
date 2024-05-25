import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import roadModelFile from "./assets/models/Road/Road.glb";
import { ROAD_LENGTH } from "game-constants";

type GLTFResult = GLTF & {
  nodes: {
    ROAD_1: THREE.Mesh;
    ROAD_2: THREE.Mesh;
    ROAD_3: THREE.Mesh;
    ROAD_4: THREE.Mesh;
    ROAD_5: THREE.Mesh;
  };
  materials: {
    Concrete_1: THREE.MeshBasicMaterial;
    Concrete_2: THREE.MeshBasicMaterial;
    Concrete_4: THREE.MeshBasicMaterial;
    Grass: THREE.MeshBasicMaterial;
    Concrete_5: THREE.MeshBasicMaterial;
  };
};

export function GroundModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(roadModelFile) as GLTFResult;

  return (
    <group
      {...props}
      dispose={null}
      scale={new THREE.Vector3(1, 1, ROAD_LENGTH)}
    >
      <mesh geometry={nodes.ROAD_1.geometry} material={materials.Concrete_1} />
      <mesh geometry={nodes.ROAD_2.geometry} material={materials.Concrete_2} />
      <mesh geometry={nodes.ROAD_3.geometry} material={materials.Concrete_4} />
      <mesh geometry={nodes.ROAD_4.geometry} material={materials.Grass} />
      <mesh geometry={nodes.ROAD_5.geometry} material={materials.Concrete_5} />
    </group>
  );
}

useGLTF.preload(roadModelFile);
