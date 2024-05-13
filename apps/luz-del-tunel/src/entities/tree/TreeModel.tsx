/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 src/assets/Tree/Tree.glb -t -r public
*/

import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { useGraph } from "@react-three/fiber";
import treeModelFile from "../../assets/models/Tree/Tree.glb";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder: THREE.Mesh;
    Cylinder_1: THREE.Mesh;
    Cylinder_2: THREE.Mesh;
    Icosphere010: THREE.Mesh;
    Icosphere010_1: THREE.Mesh;
  };
  materials: {
    Tree_Mid: THREE.MeshBasicMaterial;
    Tree_High: THREE.MeshBasicMaterial;
    Tree_Dark: THREE.MeshBasicMaterial;
    Tree_Leaves_Dark: THREE.MeshBasicMaterial;
    Tree_Leaves_High: THREE.MeshBasicMaterial;
  };
};

export function TreeModel(props: JSX.IntrinsicElements["group"]) {
  const { scene, materials } = useGLTF(treeModelFile) as GLTFResult;

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <>
      <group {...props} dispose={null}>
        <group position={[0, 1.03, 0]}>
          <mesh
            geometry={nodes.Cylinder.geometry}
            material={materials.Tree_Mid}
          />
          <mesh
            geometry={nodes.Cylinder_1.geometry}
            material={materials.Tree_High}
          />
          <mesh
            geometry={nodes.Cylinder_2.geometry}
            material={materials.Tree_Dark}
          />
        </group>
        <group position={[-7.09, 21.23, -0.97]} scale={[-2.81, -1.09, -2.81]}>
          <mesh
            geometry={nodes.Icosphere010.geometry}
            material={materials.Tree_Leaves_Dark}
          />
          <mesh
            geometry={nodes.Icosphere010_1.geometry}
            material={materials.Tree_Leaves_High}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload(treeModelFile);