import * as THREE from "three";
import { FC, forwardRef, memo, useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import zombieModelFile from "../../assets/models/Zombie/Zombie.gltf";
import {
  ATTACKING_STATE,
  CHASING_STATE,
  HIT_STATE,
} from "./machine/zombie-machine";

type GLTFResult = GLTF & {
  nodes: {
    Zombie1_Cube001mesh002: THREE.SkinnedMesh;
    Zombie1_Cube001mesh002_1: THREE.SkinnedMesh;
    Zombie1_Cube001mesh002_2: THREE.SkinnedMesh;
    Zombie1_Cube001mesh002_3: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Skin: THREE.MeshStandardMaterial;
    Clothes: THREE.MeshStandardMaterial;
    Bone: THREE.MeshStandardMaterial;
    Pants: THREE.MeshStandardMaterial;
  };
};

export const ZombieModel = memo<{
  state: typeof CHASING_STATE | typeof ATTACKING_STATE | typeof HIT_STATE;
}>(
  forwardRef(({ nodes, materials }, references) => {
    return (
      <group ref={references.current.zombieModel} dispose={null}>
        <group name="Scene">
          <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips} />
            <group name="Ribs">
              <skinnedMesh
                name="Plane008"
                geometry={nodes.Plane008.geometry}
                material={materials.Bone}
                skeleton={nodes.Plane008.skeleton}
              />
              <skinnedMesh
                name="Plane008_1"
                geometry={nodes.Plane008_1.geometry}
                material={materials.Blood}
                skeleton={nodes.Plane008_1.skeleton}
              />
            </group>
            <group name="Skull">
              <skinnedMesh
                name="Plane009"
                geometry={nodes.Plane009.geometry}
                material={materials.Bone}
                skeleton={nodes.Plane009.skeleton}
              />
              <skinnedMesh
                name="Plane009_1"
                geometry={nodes.Plane009_1.geometry}
                material={materials.Blood}
                skeleton={nodes.Plane009_1.skeleton}
              />
            </group>
            <group name="Zombie1">
              <skinnedMesh
                name="Zombie1_Cube001mesh004"
                geometry={nodes.Zombie1_Cube001mesh004.geometry}
                material={materials.Light_Skin}
                skeleton={nodes.Zombie1_Cube001mesh004.skeleton}
              />
              <skinnedMesh
                name="Zombie1_Cube001mesh004_1"
                geometry={nodes.Zombie1_Cube001mesh004_1.geometry}
                material={materials.Dark_Skin}
                skeleton={nodes.Zombie1_Cube001mesh004_1.skeleton}
              />
              <skinnedMesh
                name="Zombie1_Cube001mesh004_2"
                geometry={nodes.Zombie1_Cube001mesh004_2.geometry}
                material={materials.Mid_Skin}
                skeleton={nodes.Zombie1_Cube001mesh004_2.skeleton}
              />
              <skinnedMesh
                name="Zombie1_Cube001mesh004_3"
                geometry={nodes.Zombie1_Cube001mesh004_3.geometry}
                material={materials.Clothes}
                skeleton={nodes.Zombie1_Cube001mesh004_3.skeleton}
              />
              <skinnedMesh
                name="Zombie1_Cube001mesh004_4"
                geometry={nodes.Zombie1_Cube001mesh004_4.geometry}
                material={materials.Bone}
                skeleton={nodes.Zombie1_Cube001mesh004_4.skeleton}
              />
              <skinnedMesh
                name="Zombie1_Cube001mesh004_5"
                geometry={nodes.Zombie1_Cube001mesh004_5.geometry}
                material={materials.Blood}
                skeleton={nodes.Zombie1_Cube001mesh004_5.skeleton}
              />
              <skinnedMesh
                name="Zombie1_Cube001mesh004_6"
                geometry={nodes.Zombie1_Cube001mesh004_6.geometry}
                material={materials.Dark_Clothes}
                skeleton={nodes.Zombie1_Cube001mesh004_6.skeleton}
              />
              <skinnedMesh
                name="Zombie1_Cube001mesh004_7"
                geometry={nodes.Zombie1_Cube001mesh004_7.geometry}
                material={materials.Pants}
                skeleton={nodes.Zombie1_Cube001mesh004_7.skeleton}
              />
              <skinnedMesh
                name="Zombie1_Cube001mesh004_8"
                geometry={nodes.Zombie1_Cube001mesh004_8.geometry}
                material={materials.Dark_Pants}
                skeleton={nodes.Zombie1_Cube001mesh004_8.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    );
  })
);

useGLTF.preload(zombieModelFile);

/*
  useEffect(() => {
    if (isHit) return;

    if (state === 'Running') {
      actions.Run?.stop().reset().fadeIn(0.2).play();
    }

    if (state === 'Attacking') {
      actions.Run?.stop();
      actions.Attack?.stop().reset().fadeIn(0.2).play();
    }

    if (state === 'Hit') {
      actions.Run?.stop();
      actions['Hit By Car']?.stop().reset().fadeIn(0.2).play();
      setTimeout(() => {
        actions['Hit By Car']?.stop();
        setIsHit(true);
      }, actions['Hit By Car']?.getClip().duration! * 1000);
    }

    return () => {
      actions.Run?.fadeOut(0.2);
      actions.Attack?.fadeOut(0.2);
    };
  }, [state, isHit]);

  */
