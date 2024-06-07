/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/Arrow/Arrow.glb -t -r public
*/

import * as THREE from "three";

import { GLTF } from "three-stdlib";
import arrow3DModelFile from "../../../assets/models/Arrow/Arrow.glb";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    ARROW: THREE.Mesh;
    PLATFORM: THREE.Mesh;
  };
  materials: {
    Arrow: THREE.MeshBasicMaterial;
  };
};

export function Arrow3DModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(arrow3DModelFile) as GLTFResult;
  const arrowRef = useRef();
  useFrame((_, delta) => {
    arrowRef.current.rotation.y += delta * 0.5;
  });

  return (
    <group {...props} dispose={null}>
      <group ref={arrowRef}>
        <mesh
          geometry={nodes.ARROW.geometry}
          material={materials.Arrow}
          position={[0, 1.88, 0]}
          scale={0.11}
        />
      </group>
      <mesh
        geometry={nodes.PLATFORM.geometry}
        material={materials.Arrow}
        position={[0, 0, -0.04]}
        scale={[1, 1, 2.4]}
      />
    </group>
  );
}

useGLTF.preload(arrow3DModelFile);