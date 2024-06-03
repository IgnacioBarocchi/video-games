/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/Water_Attachment/Water_Attachment.glb -t -r public
*/

import * as THREE from "three";
import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import waterAttachment3DModel from "../../assets/models/Water_Attachment.glb";

type GLTFResult = GLTF & {
  nodes: {
    WATER_6: THREE.Mesh;
    WATER_3: THREE.Mesh;
    WATER_2: THREE.Mesh;
    WATER_5: THREE.Mesh;
    WATER_4: THREE.Mesh;
    WATER_1: THREE.Mesh;
  };
  materials: {
    Water: THREE.MeshBasicMaterial;
  };
};

useGLTF.preload(waterAttachment3DModel);

export const WaterAttachment3DModel = forwardRef(
  (props: JSX.IntrinsicElements["group"], ref) => {
    const { nodes, materials } = useGLTF(waterAttachment3DModel) as GLTFResult;

    const water1Ref = useRef();
    const water2Ref = useRef();
    const water3Ref = useRef();
    const water4Ref = useRef();
    const water5Ref = useRef();
    const water6Ref = useRef();
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
      water1Ref.current.position.y = upDownOffsetPhase1;
      water2Ref.current.position.y = upDownOffsetPhase2;
      water3Ref.current.position.y = upDownOffsetPhase1;
      water4Ref.current.position.y = upDownOffsetPhase2;
      water5Ref.current.position.y = upDownOffsetPhase1;
      water6Ref.current.position.y = upDownOffsetPhase2;

      water1Ref.current.position.x = upDownOffsetPhase2;
      water2Ref.current.position.x = upDownOffsetPhase1;
      water3Ref.current.position.x = upDownOffsetPhase2;
      water4Ref.current.position.x = upDownOffsetPhase1;
      water5Ref.current.position.x = upDownOffsetPhase2;
      water6Ref.current.position.x = upDownOffsetPhase1;
    });

    return (
      <group ref={ref} {...props} dispose={null}>
        {[...Array(6)].map((_, i) => {
          return (
            <group
              ref={
                [
                  water1Ref,
                  water2Ref,
                  water3Ref,
                  water4Ref,
                  water5Ref,
                  water6Ref,
                ][i]
              }
            >
              <mesh
                geometry={nodes["WATER_" + (i + 1)].geometry}
                material={materials.Water}
                scale={[0.51, 0.43, 0.28]}
              />
            </group>
          );
        })}
      </group>
    );
  }
);