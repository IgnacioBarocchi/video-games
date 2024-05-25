import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import character3DModelFile from "../../assets/models/Male_Character.glb";
import { Group, Mesh, SkinnedMesh, Bone, MeshBasicMaterial } from "three";

export type GLTFResult = GLTF & {
  nodes: {
    HANDED_MAUL_MESH: Mesh;
    HANDED_MAUL_MESH_1: Mesh;
    HANDED_MAUL_MESH_2: Mesh;
    RIFLE: Mesh;
    PACKED_MAUL_MESH: Mesh;
    PACKED_MAUL_MESH_1: Mesh;
    PACKED_MAUL_MESH_2: Mesh;
    PACKED_MAUL_MESH_3: Mesh;
    MALE_BASE_MESH_1: SkinnedMesh;
    MALE_BASE_MESH_2: SkinnedMesh;
    MALE_BASE_MESH_3: SkinnedMesh;
    MALE_BASE_MESH_4: SkinnedMesh;
    MALE_BASE_MESH_5: SkinnedMesh;
    MALE_BASE_MESH_6: SkinnedMesh;
    MALE_BASE_MESH_7: SkinnedMesh;
    MALE_BASE_MESH_8: SkinnedMesh;
    MALE_BASE_MESH_9: SkinnedMesh;
    MALE_BASE_MESH_10: SkinnedMesh;
    MALE_BASE_MESH_11: SkinnedMesh;
    BULLET_TRAIL_MESH: SkinnedMesh;
    BULLET_TRAIL_MESH_1: SkinnedMesh;
    BACKPACK_MESH: Mesh;
    BACKPACK_MESH_1: Mesh;
    BACKPACK_MESH_2: Mesh;
    BACKPACK_MESH_3: Mesh;
    BACKPACK_MESH_4: Mesh;
    mixamorigHips: Bone;
  };
  materials: {
    Wood: MeshBasicMaterial;
    Metal: MeshBasicMaterial;
    Metal_Shade: MeshBasicMaterial;
    Hair: MeshBasicMaterial;
    Jacket_Shade: MeshBasicMaterial;
    Skin_Base: MeshBasicMaterial;
    Skin_Shade_2: MeshBasicMaterial;
    Skin_Shade3: MeshBasicMaterial;
    Skin_Shade_4: MeshBasicMaterial;
    Jacket: MeshBasicMaterial;
    Jacket_Inside: MeshBasicMaterial;
    Jacket_Shade2: MeshBasicMaterial;
    Pants: MeshBasicMaterial;
    Pants_Shade: MeshBasicMaterial;
    Shoes: MeshBasicMaterial;
    Smoke: MeshBasicMaterial;
    Fire: MeshBasicMaterial;
    Backpack_Base: MeshBasicMaterial;
    Backpack_Stripes: MeshBasicMaterial;
    Backpack_Details: MeshBasicMaterial;
    Backpack_Shade: MeshBasicMaterial;
    Backpack_High: MeshBasicMaterial;
  };
};

type ActionName = "DEATH" | "IDLE" | "MAUL" | "ROLL" | "RUN" | "SHOOTING";
export type GLTFActions = Record<ActionName, AnimationAction> & AnimationClip;

export const MaleCharacter3DModel = forwardRef<{
  props: JSX.IntrinsicElements["group"];
  group: MutableReference<Group>;
}>((props, group) => {
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={props.nodes.mixamorigHips} />
          <group name="MALE_BASE_MESH">
            <skinnedMesh
              name="MALE_BASE_MESH_1"
              geometry={props.nodes.MALE_BASE_MESH_1.geometry}
              material={props.materials.Skin_Base}
              skeleton={props.nodes.MALE_BASE_MESH_1.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_2"
              geometry={props.nodes.MALE_BASE_MESH_2.geometry}
              material={props.materials.Skin_Shade_2}
              skeleton={props.nodes.MALE_BASE_MESH_2.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_3"
              geometry={props.nodes.MALE_BASE_MESH_3.geometry}
              material={props.materials.Skin_Shade3}
              skeleton={props.nodes.MALE_BASE_MESH_3.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_4"
              geometry={props.nodes.MALE_BASE_MESH_4.geometry}
              material={props.materials.Skin_Shade_4}
              skeleton={props.nodes.MALE_BASE_MESH_4.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_5"
              geometry={props.nodes.MALE_BASE_MESH_5.geometry}
              material={props.materials.Jacket}
              skeleton={props.nodes.MALE_BASE_MESH_5.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_6"
              geometry={props.nodes.MALE_BASE_MESH_6.geometry}
              material={props.materials.Jacket_Inside}
              skeleton={props.nodes.MALE_BASE_MESH_6.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_7"
              geometry={props.nodes.MALE_BASE_MESH_7.geometry}
              material={props.materials.Jacket_Shade}
              skeleton={props.nodes.MALE_BASE_MESH_7.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_8"
              geometry={props.nodes.MALE_BASE_MESH_8.geometry}
              material={props.materials.Jacket_Shade2}
              skeleton={props.nodes.MALE_BASE_MESH_8.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_9"
              geometry={props.nodes.MALE_BASE_MESH_9.geometry}
              material={props.materials.Pants}
              skeleton={props.nodes.MALE_BASE_MESH_9.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_10"
              geometry={props.nodes.MALE_BASE_MESH_10.geometry}
              material={props.materials.Pants_Shade}
              skeleton={props.nodes.MALE_BASE_MESH_10.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_11"
              geometry={props.nodes.MALE_BASE_MESH_11.geometry}
              material={props.materials.Shoes}
              skeleton={props.nodes.MALE_BASE_MESH_11.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload(character3DModelFile);
