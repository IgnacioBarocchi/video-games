/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 src/assets/models/Sign/Sign.gltf -t -r public
*/

import * as THREE from "three";

import { GLTF, SkeletonUtils } from "three-stdlib";
import { useMemo } from "react";

import signModelFile from "../../../assets/models/Sign/Sign.gltf";
import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder002: THREE.Mesh;
    Cylinder002_1: THREE.Mesh;
    Cylinder002_2: THREE.Mesh;
    Cylinder002_3: THREE.Mesh;
    Cylinder002_4: THREE.Mesh;
    Cylinder002_5: THREE.Mesh;
  };
  materials: {
    Pipe_Base: THREE.MeshBasicMaterial;
    Pipe_shade: THREE.MeshBasicMaterial;
    Pipe_Dark: THREE.MeshBasicMaterial;
    Sign: THREE.MeshBasicMaterial;
    Letters: THREE.MeshBasicMaterial;
    Back: THREE.MeshBasicMaterial;
  };
};

export function Sign3DModel(props: JSX.IntrinsicElements["group"]) {
  const { scene, materials } = useGLTF(signModelFile) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  return (
    <group {...props} dispose={null} scale={0.5}>
      <group>
        <mesh
          geometry={nodes.Cylinder002.geometry}
          material={materials.Pipe_Base}
        />
        <mesh
          geometry={nodes.Cylinder002_1.geometry}
          material={materials.Pipe_shade}
        />
        <mesh
          geometry={nodes.Cylinder002_2.geometry}
          material={materials.Pipe_Dark}
        />
        <mesh
          geometry={nodes.Cylinder002_3.geometry}
          material={materials.Sign}
        />
        <mesh
          geometry={nodes.Cylinder002_4.geometry}
          material={materials.Letters}
        />
        <mesh
          geometry={nodes.Cylinder002_5.geometry}
          material={materials.Back}
        />
      </group>
    </group>
  );
}

useGLTF.preload(signModelFile);
