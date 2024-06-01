/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 src/assets/models/linux/Tux.glb -t -r public
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import tux3DModelFile from "../../assets/models/linux/Tux.glb";
import { GroupProps, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useTurnTable } from "../../hooks/use-turn-table";

type GLTFResult = GLTF & {
  nodes: {
    BODY_MESH: THREE.Mesh;
    BODY_MESH_1: THREE.Mesh;
    BODY_MESH_2: THREE.Mesh;
    BODY_MESH_3: THREE.Mesh;
    BODY_MESH_4: THREE.Mesh;
    BODY_MESH_5: THREE.Mesh;
    BODY_MESH_6: THREE.Mesh;
  };
  materials: {
    Zombie_Skin: THREE.MeshBasicMaterial;
    Zombie_Skin_Shade2: THREE.MeshBasicMaterial;
    Yellow_Skin: THREE.MeshBasicMaterial;
    Blood: THREE.MeshBasicMaterial;
    Eyes: THREE.MeshBasicMaterial;
    Zombie_Skin_Light: THREE.MeshBasicMaterial;
    Blood_Shade: THREE.MeshBasicMaterial;
  };
};
export function Tux3DModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(tux3DModelFile) as GLTFResult;
  const { group } = useTurnTable();

  return (
    <group {...props} dispose={null} ref={group}>
      <group position={[0, 0, -0.06]} scale={1.36}>
        <mesh
          geometry={nodes.BODY_MESH.geometry}
          material={materials.Zombie_Skin}
        />
        <mesh
          geometry={nodes.BODY_MESH_1.geometry}
          material={materials.Zombie_Skin_Shade2}
        />
        <mesh
          geometry={nodes.BODY_MESH_2.geometry}
          material={materials.Yellow_Skin}
        />
        <mesh
          geometry={nodes.BODY_MESH_3.geometry}
          material={materials.Blood}
        />
        <mesh geometry={nodes.BODY_MESH_4.geometry} material={materials.Eyes} />
        <mesh
          geometry={nodes.BODY_MESH_5.geometry}
          material={materials.Zombie_Skin_Light}
        />
        <mesh
          geometry={nodes.BODY_MESH_6.geometry}
          material={materials.Blood_Shade}
        />
      </group>
    </group>
  );
}

useGLTF.preload(tux3DModelFile);
