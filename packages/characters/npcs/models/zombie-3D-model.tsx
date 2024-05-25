import { forwardRef, MutableRefObject } from "react";
import {
  Bone,
  SkinnedMesh,
  MeshBasicMaterial,
  AnimationAction,
  Group,
} from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import zombieMFile from "../../assets/models/Zombie_Male.glb";

export type GLTFResult = GLTF & {
  nodes: {
    ZOMBIE_MESH004: SkinnedMesh;
    ZOMBIE_MESH004_1: SkinnedMesh;
    ZOMBIE_MESH004_2: SkinnedMesh;
    ZOMBIE_MESH004_3: SkinnedMesh;
    ZOMBIE_MESH004_4: SkinnedMesh;
    ZOMBIE_MESH004_5: SkinnedMesh;
    ZOMBIE_MESH004_6: SkinnedMesh;
    mixamorigHips: Bone;
  };
  materials: {
    Zombie_base: MeshBasicMaterial;
    Zombie_2: MeshBasicMaterial;
    Zombie_3: MeshBasicMaterial;
    Zombie_shade_4: MeshBasicMaterial;
    Socket: MeshBasicMaterial;
    Blood: MeshBasicMaterial;
    Blood_shade: MeshBasicMaterial;
  };
};

export type ActionName =
  | "ATTACK"
  | "BITE"
  | "DEATH"
  | "HEAD_HIT"
  | "RUN"
  | "SHOT"
  | "SCREAM";

export type GLTFActions = Record<ActionName, AnimationAction>;

export const Zombie3DModel = forwardRef<{
  props: JSX.IntrinsicElements["group"];
  group: MutableRefObject<Group>;
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
