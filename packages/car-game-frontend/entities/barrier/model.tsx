import { useGLTF } from "@react-three/drei";
import { FC } from "react";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import barrierModelFile from "../../assets/models/Barrier/Barrier.glb";

type GLTFResult = GLTF & {
  nodes: {
    BARRIER_MESH: THREE.Mesh;
    BARRIER_MESH_1: THREE.Mesh;
    BARRIER_MESH_2: THREE.Mesh;
    BARRIER_MESH_3: THREE.Mesh;
  };
  materials: {
    Road_Props_Yellow_Signal: THREE.MeshBasicMaterial;
    Road_Props_Yellow_Signal_Shade: THREE.MeshBasicMaterial;
    High_Concrete: THREE.MeshBasicMaterial;
    Concrete: THREE.MeshBasicMaterial;
  };
};
export const BarrierModel: FC<{
  props?: JSX.IntrinsicElements["group"];
}> = (props) => {
  const { nodes, materials } = useGLTF(barrierModelFile) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={[1, 0.59, 1]}>
        <mesh
          geometry={nodes.BARRIER_MESH.geometry}
          material={materials.Road_Props_Yellow_Signal}
        />
        <mesh
          geometry={nodes.BARRIER_MESH_1.geometry}
          material={materials.Road_Props_Yellow_Signal_Shade}
        />
        <mesh
          geometry={nodes.BARRIER_MESH_2.geometry}
          material={materials.High_Concrete}
        />
        <mesh
          geometry={nodes.BARRIER_MESH_3.geometry}
          material={materials.Concrete}
        />
      </group>
    </group>
  );
};

useGLTF.preload(barrierModelFile);
