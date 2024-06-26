/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 assets/models/Loading_Screen__Fence_Scene.glb -t -r public
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import model3DPath from "../assets/models/Loading_Screen__Fence_Scene.glb";

type GLTFResult = GLTF & {
  nodes: {
    ZOMBIE_VARIANT_MESH001: THREE.SkinnedMesh;
    ZOMBIE_VARIANT_MESH001_1: THREE.SkinnedMesh;
    ZOMBIE_VARIANT_MESH001_2: THREE.SkinnedMesh;
    ZOMBIE_VARIANT_MESH001_3: THREE.SkinnedMesh;
    ZOMBIE_VARIANT_MESH001_4: THREE.SkinnedMesh;
    ZOMBIE_VARIANT_MESH001_5: THREE.SkinnedMesh;
    ZOMBIE_VARIANT_MESH001_6: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_VARIANT_MESH001: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_VARIANT_MESH001_1: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_VARIANT_MESH001_2: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_VARIANT_MESH001_3: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_VARIANT_MESH001_4: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_VARIANT_MESH001_5: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_VARIANT_MESH001_6: THREE.SkinnedMesh;
    ZOMBIE_MESH001: THREE.SkinnedMesh;
    ZOMBIE_MESH001_1: THREE.SkinnedMesh;
    ZOMBIE_MESH001_2: THREE.SkinnedMesh;
    ZOMBIE_MESH001_3: THREE.SkinnedMesh;
    ZOMBIE_MESH001_4: THREE.SkinnedMesh;
    ZOMBIE_MESH001_5: THREE.SkinnedMesh;
    ZOMBIE_MESH001_6: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_MESH001: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_MESH001_1: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_MESH001_2: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_MESH001_3: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_MESH001_4: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_MESH001_5: THREE.SkinnedMesh;
    FEMALE_ZOMBIE_MESH001_6: THREE.SkinnedMesh;
    GROUND_MESH: THREE.Mesh;
    GROUND_MESH_1: THREE.Mesh;
    GROUND_MESH_2: THREE.Mesh;
    GROUND_MESH_3: THREE.Mesh;
    FENCE_MESH: THREE.Mesh;
    FENCE_MESH_1: THREE.Mesh;
    FENCE_MESH_2: THREE.Mesh;
    BLOOD_POOL: THREE.Mesh;
    FLESH_MESH: THREE.Mesh;
    FLESH_MESH_1: THREE.Mesh;
    FLESH_MESH_2: THREE.Mesh;
    mixamorigHips: THREE.Bone;
    mixamorigHips_1: THREE.Bone;
    mixamorigHips_2: THREE.Bone;
    mixamorigHips_3: THREE.Bone;
  };
  materials: {
    Zombie_base: THREE.MeshBasicMaterial;
    Zombie_2: THREE.MeshBasicMaterial;
    Zombie_3: THREE.MeshBasicMaterial;
    Zombie_Light: THREE.MeshBasicMaterial;
    Blood: THREE.MeshBasicMaterial;
    Blood_shade: THREE.MeshBasicMaterial;
    Zombie_shade_4: THREE.MeshBasicMaterial;
    Socket: THREE.MeshBasicMaterial;
    Light: THREE.MeshBasicMaterial;
    Shade_1: THREE.MeshBasicMaterial;
    Shade_2: THREE.MeshBasicMaterial;
    Dark: THREE.MeshBasicMaterial;
    Rust_shade: THREE.MeshBasicMaterial;
    Rust_Base: THREE.MeshBasicMaterial;
    Fence_light: THREE.MeshBasicMaterial;
    Blood: THREE.MeshBasicMaterial;
    Blood_shade: THREE.MeshBasicMaterial;
    Bone: THREE.MeshBasicMaterial;
  };
};

type ActionName =
  | "FENCE_MOVE"
  | "MZV_PUNCH"
  | "MZV_ATTACK"
  | "MZ_EATING"
  | "FM_SCREAMING";
type GLTFActions = Record<ActionName, THREE.AnimationAction> &
  THREE.AnimationClip;

export const AnimatedScene = (props: JSX.IntrinsicElements["group"]) => {
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF(model3DPath) as GLTFResult;
  const { actions } = useAnimations<GLTFActions>(animations, group);

  React.useEffect(() => {
    actions.MZV_PUNCH.play();
    actions.MZV_ATTACK.play();
    actions.MZ_EATING.play();
    actions.FM_SCREAMING.play();
    actions.FENCE_MOVE.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="ANIMATED_MALE_ZOMBIE_VARIANT"
          position={[-0.45, 0, -0.52]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips} />
          <group name="ZOMBIE_VARIANT001">
            <skinnedMesh
              name="ZOMBIE_VARIANT_MESH001"
              geometry={nodes.ZOMBIE_VARIANT_MESH001.geometry}
              material={materials.Zombie_base}
              skeleton={nodes.ZOMBIE_VARIANT_MESH001.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_VARIANT_MESH001_1"
              geometry={nodes.ZOMBIE_VARIANT_MESH001_1.geometry}
              material={materials.Zombie_2}
              skeleton={nodes.ZOMBIE_VARIANT_MESH001_1.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_VARIANT_MESH001_2"
              geometry={nodes.ZOMBIE_VARIANT_MESH001_2.geometry}
              material={materials.Zombie_3}
              skeleton={nodes.ZOMBIE_VARIANT_MESH001_2.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_VARIANT_MESH001_3"
              geometry={nodes.ZOMBIE_VARIANT_MESH001_3.geometry}
              material={materials.Zombie_Light}
              skeleton={nodes.ZOMBIE_VARIANT_MESH001_3.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_VARIANT_MESH001_4"
              geometry={nodes.ZOMBIE_VARIANT_MESH001_4.geometry}
              material={materials.Blood}
              skeleton={nodes.ZOMBIE_VARIANT_MESH001_4.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_VARIANT_MESH001_5"
              geometry={nodes.ZOMBIE_VARIANT_MESH001_5.geometry}
              material={materials.Blood_shade}
              skeleton={nodes.ZOMBIE_VARIANT_MESH001_5.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_VARIANT_MESH001_6"
              geometry={nodes.ZOMBIE_VARIANT_MESH001_6.geometry}
              material={materials.Zombie_shade_4}
              skeleton={nodes.ZOMBIE_VARIANT_MESH001_6.skeleton}
            />
          </group>
        </group>
        <group
          name="ANIMATED_FEMALE_ZOMBIE_VARIANT"
          position={[0.95, 0, -0.42]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips_1} />
          <group name="FEMALE_ZOMBIE_VARIANT001">
            <skinnedMesh
              name="FEMALE_ZOMBIE_VARIANT_MESH001"
              geometry={nodes.FEMALE_ZOMBIE_VARIANT_MESH001.geometry}
              material={materials.Zombie_base}
              skeleton={nodes.FEMALE_ZOMBIE_VARIANT_MESH001.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_VARIANT_MESH001_1"
              geometry={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_1.geometry}
              material={materials.Zombie_2}
              skeleton={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_1.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_VARIANT_MESH001_2"
              geometry={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_2.geometry}
              material={materials.Zombie_3}
              skeleton={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_2.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_VARIANT_MESH001_3"
              geometry={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_3.geometry}
              material={materials.Zombie_Light}
              skeleton={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_3.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_VARIANT_MESH001_4"
              geometry={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_4.geometry}
              material={materials.Blood}
              skeleton={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_4.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_VARIANT_MESH001_5"
              geometry={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_5.geometry}
              material={materials.Blood_shade}
              skeleton={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_5.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_VARIANT_MESH001_6"
              geometry={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_6.geometry}
              material={materials.Zombie_shade_4}
              skeleton={nodes.FEMALE_ZOMBIE_VARIANT_MESH001_6.skeleton}
            />
          </group>
        </group>
        <group
          name="MZ"
          position={[0.59, 0.01, -1.72]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips_2} />
          <group name="ZOMBIE001">
            <skinnedMesh
              name="ZOMBIE_MESH001"
              geometry={nodes.ZOMBIE_MESH001.geometry}
              material={materials.Zombie_base}
              skeleton={nodes.ZOMBIE_MESH001.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH001_1"
              geometry={nodes.ZOMBIE_MESH001_1.geometry}
              material={materials.Zombie_2}
              skeleton={nodes.ZOMBIE_MESH001_1.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH001_2"
              geometry={nodes.ZOMBIE_MESH001_2.geometry}
              material={materials.Zombie_3}
              skeleton={nodes.ZOMBIE_MESH001_2.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH001_3"
              geometry={nodes.ZOMBIE_MESH001_3.geometry}
              material={materials.Zombie_shade_4}
              skeleton={nodes.ZOMBIE_MESH001_3.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH001_4"
              geometry={nodes.ZOMBIE_MESH001_4.geometry}
              material={materials.Socket}
              skeleton={nodes.ZOMBIE_MESH001_4.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH001_5"
              geometry={nodes.ZOMBIE_MESH001_5.geometry}
              material={materials.Blood}
              skeleton={nodes.ZOMBIE_MESH001_5.skeleton}
            />
            <skinnedMesh
              name="ZOMBIE_MESH001_6"
              geometry={nodes.ZOMBIE_MESH001_6.geometry}
              material={materials.Blood_shade}
              skeleton={nodes.ZOMBIE_MESH001_6.skeleton}
            />
          </group>
        </group>
        <group
          name="FZ"
          position={[0.07, 0, -2.66]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive object={nodes.mixamorigHips_3} />
          <group name="FEMALE_ZOMBIE001">
            <skinnedMesh
              name="FEMALE_ZOMBIE_MESH001"
              geometry={nodes.FEMALE_ZOMBIE_MESH001.geometry}
              material={materials.Zombie_base}
              skeleton={nodes.FEMALE_ZOMBIE_MESH001.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_MESH001_1"
              geometry={nodes.FEMALE_ZOMBIE_MESH001_1.geometry}
              material={materials.Zombie_2}
              skeleton={nodes.FEMALE_ZOMBIE_MESH001_1.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_MESH001_2"
              geometry={nodes.FEMALE_ZOMBIE_MESH001_2.geometry}
              material={materials.Zombie_3}
              skeleton={nodes.FEMALE_ZOMBIE_MESH001_2.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_MESH001_3"
              geometry={nodes.FEMALE_ZOMBIE_MESH001_3.geometry}
              material={materials.Zombie_shade_4}
              skeleton={nodes.FEMALE_ZOMBIE_MESH001_3.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_MESH001_4"
              geometry={nodes.FEMALE_ZOMBIE_MESH001_4.geometry}
              material={materials.Socket}
              skeleton={nodes.FEMALE_ZOMBIE_MESH001_4.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_MESH001_5"
              geometry={nodes.FEMALE_ZOMBIE_MESH001_5.geometry}
              material={materials.Blood}
              skeleton={nodes.FEMALE_ZOMBIE_MESH001_5.skeleton}
            />
            <skinnedMesh
              name="FEMALE_ZOMBIE_MESH001_6"
              geometry={nodes.FEMALE_ZOMBIE_MESH001_6.geometry}
              material={materials.Blood_shade}
              skeleton={nodes.FEMALE_ZOMBIE_MESH001_6.skeleton}
            />
          </group>
        </group>
        <group
          name="GROUND"
          position={[0.01, 0, -2.55]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={3.61}
        >
          <mesh
            name="GROUND_MESH"
            geometry={nodes.GROUND_MESH.geometry}
            material={materials.Light}
          />
          <mesh
            name="GROUND_MESH_1"
            geometry={nodes.GROUND_MESH_1.geometry}
            material={materials.Shade_1}
          />
          <mesh
            name="GROUND_MESH_2"
            geometry={nodes.GROUND_MESH_2.geometry}
            material={materials.Shade_2}
          />
          <mesh
            name="GROUND_MESH_3"
            geometry={nodes.GROUND_MESH_3.geometry}
            material={materials.Dark}
          />
        </group>
        <group
          name="FENCE"
          position={[0.01, 0.01, 0.54]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[2.37, 4.75, 1.48]}
        >
          <mesh
            name="FENCE_MESH"
            geometry={nodes.FENCE_MESH.geometry}
            material={materials.Rust_shade}
          />
          <mesh
            name="FENCE_MESH_1"
            geometry={nodes.FENCE_MESH_1.geometry}
            material={materials.Rust_Base}
          />
          <mesh
            name="FENCE_MESH_2"
            geometry={nodes.FENCE_MESH_2.geometry}
            material={materials.Fence_light}
          />
        </group>
        <mesh
          name="BLOOD_POOL"
          geometry={nodes.BLOOD_POOL.geometry}
          material={materials.Blood}
          position={[-0.06, -0.97, -1.8]}
        />
        <group name="FLESH" position={[0.29, 0.1, -1.39]} scale={0.04}>
          <mesh
            name="FLESH_MESH"
            geometry={nodes.FLESH_MESH.geometry}
            material={materials.Blood_shade}
          />
          <mesh
            name="FLESH_MESH_1"
            geometry={nodes.FLESH_MESH_1.geometry}
            material={materials.Blood}
          />
          <mesh
            name="FLESH_MESH_2"
            geometry={nodes.FLESH_MESH_2.geometry}
            material={materials.Bone}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(model3DPath);
