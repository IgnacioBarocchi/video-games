/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/Sparks_Attachment/Grass_Attachment.glb -t -r public
*/

import * as THREE from "three";
import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import grassAttachment3DModel from "../../assets/models/Grass_Attachment.glb";
import { useFrame } from "@react-three/fiber";
import { nanoid } from "nanoid";

type GLTFResult = GLTF & {
  nodes: {
    GRASS_1: THREE.Mesh;
    GRASS_2: THREE.Mesh;
    GRASS_3: THREE.Mesh;
    GRASS_4: THREE.Mesh;
    GRASS_5: THREE.Mesh;
    GRASS_6: THREE.Mesh;
  };
  materials: {
    Grass: THREE.MeshBasicMaterial;
  };
};

export const GrassAttachment3DModel = forwardRef(
  (props: JSX.IntrinsicElements["group"], ref) => {
    const { nodes, materials } = useGLTF(grassAttachment3DModel) as GLTFResult;

    const grass1Ref = useRef();
    const grass2Ref = useRef();
    const grass3Ref = useRef();
    const grass4Ref = useRef();
    const grass5Ref = useRef();
    const grass6Ref = useRef();
    const timeRef = useRef(0);

    useFrame((_, delta) => {
      timeRef.current += delta;

      const oscillationSpeed = 40;
      const oscillationMagnitude1 = 0.05;
      const oscillationMagnitude2 = 0.07;

      const upDownOffsetPhase1 =
        Math.sin(timeRef.current * oscillationSpeed) * oscillationMagnitude1;
      const upDownOffsetPhase2 =
        Math.sin(timeRef.current * oscillationSpeed) *
        oscillationMagnitude2 *
        2;
      grass1Ref.current.position.y = upDownOffsetPhase1;
      grass2Ref.current.position.y = upDownOffsetPhase2;
      grass3Ref.current.position.y = upDownOffsetPhase1;
      grass4Ref.current.position.y = upDownOffsetPhase2;
      grass5Ref.current.position.y = upDownOffsetPhase1;
      grass6Ref.current.position.y = upDownOffsetPhase2;

      grass1Ref.current.position.x = upDownOffsetPhase2;
      grass2Ref.current.position.x = upDownOffsetPhase1;
      grass3Ref.current.position.x = upDownOffsetPhase2;
      grass4Ref.current.position.x = upDownOffsetPhase1;
      grass5Ref.current.position.x = upDownOffsetPhase2;
      grass6Ref.current.position.x = upDownOffsetPhase1;
    });

    return (
      <group ref={ref} {...props} dispose={null}>
        {[...Array(6)].map((_, i) => {
          return (
            <group
              key={nanoid(15) + " " + i}
              ref={
                [
                  grass1Ref,
                  grass2Ref,
                  grass3Ref,
                  grass4Ref,
                  grass5Ref,
                  grass6Ref,
                ][i]
              }
            >
              <mesh
                geometry={nodes["GRASS_" + (i + 1)].geometry}
                material={materials.Grass}
                position={[0.76, 0.19, -0.02]}
                scale={[0.14, 0.19, 0.33]}
              />
            </group>
          );
        })}
        {/* <mesh
          geometry={nodes.GRASS_1.geometry}
          material={materials.Grass}
          position={[0.76, 0.19, -0.02]}
          scale={[0.14, 0.19, 0.33]}
        />
        <mesh
          geometry={nodes.GRASS_2.geometry}
          material={materials.Grass}
          position={[0.76, 0.19, -0.02]}
          scale={[0.14, 0.19, 0.33]}
        />
        <mesh
          geometry={nodes.GRASS_3.geometry}
          material={materials.Grass}
          position={[0.76, 0.19, -0.02]}
          scale={[0.14, 0.19, 0.33]}
        />
        <mesh
          geometry={nodes.GRASS_4.geometry}
          material={materials.Grass}
          position={[0.76, 0.19, -0.02]}
          scale={[0.14, 0.19, 0.33]}
        />
        <mesh
          geometry={nodes.GRASS_5.geometry}
          material={materials.Grass}
          position={[0.76, 0.19, -0.02]}
          scale={[0.14, 0.19, 0.33]}
        />
        <mesh
          geometry={nodes.GRASS_6.geometry}
          material={materials.Grass}
          position={[0.76, 0.19, -0.02]}
          scale={[0.14, 0.19, 0.33]}
        /> */}
      </group>
    );
  }
);

useGLTF.preload(grassAttachment3DModel);