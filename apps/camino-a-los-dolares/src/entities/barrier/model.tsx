import { useGLTF } from "@react-three/drei";
import { FC } from "react";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import barrierModelFile from "../../assets/models/Barrier/Barrier.gltf";

type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh;
    Cube_2: THREE.Mesh;
    Cube_3: THREE.Mesh;
    Cube_4: THREE.Mesh;
  };
  materials: {
    Concrete: THREE.MeshBasicMaterial;
    Alert: THREE.MeshBasicMaterial;
    High_Alert: THREE.MeshStandardMaterial;
    High_Concrete: THREE.MeshBasicMaterial;
  };
};

export const BarrierModel: FC<{
  props?: JSX.IntrinsicElements["group"];
}> = (props) => {
  const { nodes, materials } = useGLTF(barrierModelFile) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={2}>
      <mesh geometry={nodes.Cube_1.geometry} material={materials.Concrete} />
      <mesh geometry={nodes.Cube_2.geometry} material={materials.Alert} />
      <mesh geometry={nodes.Cube_3.geometry} material={materials.High_Alert} />
      <mesh
        geometry={nodes.Cube_4.geometry}
        material={materials.High_Concrete}
      />
      <mesh geometry={nodes.Cube_1.geometry} material={materials.Concrete} />
      <mesh geometry={nodes.Cube_2.geometry} material={materials.Alert} />
      <mesh geometry={nodes.Cube_3.geometry} material={materials.High_Alert} />
      <mesh
        geometry={nodes.Cube_4.geometry}
        material={materials.High_Concrete}
      />
    </group>
  );
};

useGLTF.preload(barrierModelFile);
