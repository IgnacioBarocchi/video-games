/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/CarWSkin.glb -t -r public
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    CAR_BODY: THREE.Mesh;
    FRONT_WHEEL: THREE.Mesh;
    BACK_WHEELS: THREE.Mesh;
  };
  materials: {
    Skin: THREE.MeshBasicMaterial;
    Wheel_Skin: THREE.MeshBasicMaterial;
  };
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/../assets/models/CarWSkin.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.CAR_BODY.geometry} material={materials.Skin} />
      <mesh
        geometry={nodes.FRONT_WHEEL.geometry}
        material={materials.Wheel_Skin}
        position={[0, 0.36, 1.4]}
      />
      <mesh
        geometry={nodes.BACK_WHEELS.geometry}
        material={materials.Wheel_Skin}
        position={[0, 0.36, -1.53]}
      />
    </group>
  );
}

useGLTF.preload("/../assets/models/CarWSkin.glb");