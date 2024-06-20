/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/Zombie_Male_NPC_WSkin.glb -t -r public
*/

import * as THREE from "three";
import React, { MutableRefObject, forwardRef, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import zombieMWSkinFile from "../../assets/models/Zombie_Male_NPC_WSkin.glb";

type GLTFResult = GLTF & {
  nodes: {
    ZOMBIE: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Skin: THREE.MeshBasicMaterial;
  };
};

type ActionName =
  | "ATTACK"
  | "BITE"
  | "DEATH"
  | "HEAD_HIT"
  | "RUN"
  | "SHOT"
  | "SCREAM";
export type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export const Zombie3DModelWithSkin = forwardRef<{
  props: JSX.IntrinsicElements["group"];
  group: MutableRefObject<THREE.Group>;
}>((props, group) => {
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={props.nodes.mixamorigHips} />
          <skinnedMesh
            name="ZOMBIE"
            geometry={props.nodes.ZOMBIE.geometry}
            material={props.materials.Skin}
            skeleton={props.nodes.ZOMBIE.skeleton}
          />
        </group>
      </group>
    </group>
  );
});

useGLTF.preload(zombieMWSkinFile);
