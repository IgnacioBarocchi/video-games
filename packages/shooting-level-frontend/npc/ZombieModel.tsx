import * as THREE from "three";
import React, { forwardRef, MutableReference } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import zombieMFile from "../assets/models/Zombie_Male.glb";

type GLTFResult = GLTF & {
  nodes: {
    ZOMBIE_MESH004: THREE.SkinnedMesh;
    ZOMBIE_MESH004_1: THREE.SkinnedMesh;
    ZOMBIE_MESH004_2: THREE.SkinnedMesh;
    ZOMBIE_MESH004_3: THREE.SkinnedMesh;
    ZOMBIE_MESH004_4: THREE.SkinnedMesh;
    ZOMBIE_MESH004_5: THREE.SkinnedMesh;
    ZOMBIE_MESH004_6: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Zombie_base: THREE.MeshBasicMaterial;
    Zombie_2: THREE.MeshBasicMaterial;
    Zombie_3: THREE.MeshBasicMaterial;
    Zombie_shade_4: THREE.MeshBasicMaterial;
    Socket: THREE.MeshBasicMaterial;
    Blood: THREE.MeshBasicMaterial;
    Blood_shade: THREE.MeshBasicMaterial;
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
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export const ZombieModel = forwardRef<{
  props: JSX.IntrinsicElements["group"];
  group: MutableReference<Group>;
}>((props, group) => {
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={props.nodes.mixamorigHips} />
          <group name="ZOMBIE">
            <skinnedMesh
              name="ZOMBIE_MESH004"
              geometry={props.nodes.ZOMBIE_MESH004.geometry}
              material={props.materials.Zombie_base}
              skeleton={props.nodes.ZOMBIE_MESH004.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH004_1"
              geometry={props.nodes.ZOMBIE_MESH004_1.geometry}
              material={props.materials.Zombie_2}
              skeleton={props.nodes.ZOMBIE_MESH004_1.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH004_2"
              geometry={props.nodes.ZOMBIE_MESH004_2.geometry}
              material={props.materials.Zombie_3}
              skeleton={props.nodes.ZOMBIE_MESH004_2.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH004_3"
              geometry={props.nodes.ZOMBIE_MESH004_3.geometry}
              material={props.materials.Zombie_shade_4}
              skeleton={props.nodes.ZOMBIE_MESH004_3.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH004_4"
              geometry={props.nodes.ZOMBIE_MESH004_4.geometry}
              material={props.materials.Socket}
              skeleton={props.nodes.ZOMBIE_MESH004_4.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH004_5"
              geometry={props.nodes.ZOMBIE_MESH004_5.geometry}
              material={props.materials.Blood}
              skeleton={props.nodes.ZOMBIE_MESH004_5.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH004_6"
              geometry={props.nodes.ZOMBIE_MESH004_6.geometry}
              material={props.materials.Blood_shade}
              skeleton={props.nodes.ZOMBIE_MESH004_6.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload(zombieMFile);
