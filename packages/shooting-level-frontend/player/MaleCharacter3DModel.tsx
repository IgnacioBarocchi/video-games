import * as THREE from "three";
import React, { useMemo, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";
import character3DModelFile from "../assets/models/Male_Character.glb";
import { useGraph } from "@react-three/fiber";
import {
  IDLE_STATE,
  MOVE_STATE,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  USING_SKILL_3_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
  DEATH_STATE,
} from "../machines/fsmbeta";
import { Context } from "../providers/player-context-provider";
import { useActor } from "@xstate/react";

type GLTFResult = GLTF & {
  nodes: {
    HANDED_MAUL_MESH: THREE.Mesh;
    HANDED_MAUL_MESH_1: THREE.Mesh;
    HANDED_MAUL_MESH_2: THREE.Mesh;
    RIFLE: THREE.Mesh;
    PACKED_MAUL_MESH: THREE.Mesh;
    PACKED_MAUL_MESH_1: THREE.Mesh;
    PACKED_MAUL_MESH_2: THREE.Mesh;
    PACKED_MAUL_MESH_3: THREE.Mesh;
    MALE_BASE_MESH_1: THREE.SkinnedMesh;
    MALE_BASE_MESH_2: THREE.SkinnedMesh;
    MALE_BASE_MESH_3: THREE.SkinnedMesh;
    MALE_BASE_MESH_4: THREE.SkinnedMesh;
    MALE_BASE_MESH_5: THREE.SkinnedMesh;
    MALE_BASE_MESH_6: THREE.SkinnedMesh;
    MALE_BASE_MESH_7: THREE.SkinnedMesh;
    MALE_BASE_MESH_8: THREE.SkinnedMesh;
    MALE_BASE_MESH_9: THREE.SkinnedMesh;
    MALE_BASE_MESH_10: THREE.SkinnedMesh;
    MALE_BASE_MESH_11: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Wood: THREE.MeshBasicMaterial;
    Metal: THREE.MeshBasicMaterial;
    Metal_Shade: THREE.MeshBasicMaterial;
    Hair: THREE.MeshBasicMaterial;
    Jacket_Shade: THREE.MeshBasicMaterial;
    Skin_Base: THREE.MeshBasicMaterial;
    Skin_Shade_2: THREE.MeshBasicMaterial;
    Skin_Shade3: THREE.MeshBasicMaterial;
    Skin_Shade_4: THREE.MeshBasicMaterial;
    Jacket: THREE.MeshBasicMaterial;
    Jacket_Inside: THREE.MeshBasicMaterial;
    Jacket_Shade2: THREE.MeshBasicMaterial;
    Pants: THREE.MeshBasicMaterial;
    Pants_Shade: THREE.MeshBasicMaterial;
    Shoes: THREE.MeshBasicMaterial;
  };
};

type ActionName = "DEATH" | "IDLE" | "MAUL" | "ROLL" | "RUN" | "SHOOTING";
type GLTFActions = Record<ActionName, THREE.AnimationAction> &
  THREE.AnimationClip;

// if (!localStorage.characterFSMStates) {
//   localStorage.characterFSMStates = JSON.stringify(
//     Array.from(
//       new Map([
//         [IDLE_STATE, "IDLE"],
//         [MOVE_STATE, "RUN"],
//         [USING_SKILL_1_STATE, "SHOOTING"],
//         [USING_SKILL_2_STATE, "MAUL"],
//         [USING_SKILL_3_STATE, "ROLL"],
//         [REACTING_TO_SKILL_1_STATE, "DEATH"],
//         [REACTING_TO_SKILL_2_STATE, "DEATH"],
//         [DEATH_STATE, "DEATH"],
//       ]).entries()
//     )
//   );
// }

export const MaleCharacter3DModel = (props: JSX.IntrinsicElements["group"]) => {
  const group = useRef<THREE.Group>();
  const { scene, materials, animations } = useGLTF(
    character3DModelFile
  ) as GLTFResult;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const { actions } = useAnimations<GLTFActions>(animations, group);
  const [state, send] = useActor(Context.useActorRef().logic);

  useEffect(() => {
    const milliseconds = 1000;

    const animationNameByFSMState = new Map([
      [IDLE_STATE, "IDLE"],
      [MOVE_STATE, "RUN"],
      [USING_SKILL_1_STATE, "SHOOTING"],
      [USING_SKILL_2_STATE, "MAUL"],
      [USING_SKILL_3_STATE, "ROLL"],
      [REACTING_TO_SKILL_1_STATE, "DEATH"],
      [REACTING_TO_SKILL_2_STATE, "DEATH"],
      [DEATH_STATE, "DEATH"],
    ]);

    const characterFSMDurations = new Map([
      [IDLE_STATE, actions.IDLE?.getClip().duration! * milliseconds],
      [MOVE_STATE, actions.RUN?.getClip().duration! * milliseconds],
      [
        USING_SKILL_1_STATE,
        actions.SHOOTING?.getClip().duration! * milliseconds,
      ],
      [USING_SKILL_2_STATE, actions.MAUL?.getClip().duration! * milliseconds],
      [USING_SKILL_3_STATE, actions.ROLL?.getClip().duration! * milliseconds],
      [DEATH_STATE, actions.DEATH?.getClip().duration! * milliseconds],
    ]);

    send({
      type: "SET_CONTEXT",
      actions,
      mesh: group.current,
      animationNameByFSMState,
      characterFSMDurations: characterFSMDurations,
    });
    console.log("MD");
  }, []);

  const updateMaulPosition = React.useCallback((isHanded: boolean) => {
    const {
      HANDED_MAUL_MESH,
      HANDED_MAUL_MESH_1,
      HANDED_MAUL_MESH_2,
      PACKED_MAUL_MESH,
      PACKED_MAUL_MESH_1,
      PACKED_MAUL_MESH_2,
      PACKED_MAUL_MESH_3,
    } = nodes;

    HANDED_MAUL_MESH.visible = isHanded;
    HANDED_MAUL_MESH_1.visible = isHanded;
    HANDED_MAUL_MESH_2.visible = isHanded;
    PACKED_MAUL_MESH.visible = !isHanded;
    PACKED_MAUL_MESH_1.visible = !isHanded;
    PACKED_MAUL_MESH_2.visible = !isHanded;
    PACKED_MAUL_MESH_3.visible = !isHanded;
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="MALE_BASE_MESH">
            <skinnedMesh
              name="MALE_BASE_MESH_1"
              geometry={nodes.MALE_BASE_MESH_1.geometry}
              material={materials.Skin_Base}
              skeleton={nodes.MALE_BASE_MESH_1.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_2"
              geometry={nodes.MALE_BASE_MESH_2.geometry}
              material={materials.Skin_Shade_2}
              skeleton={nodes.MALE_BASE_MESH_2.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_3"
              geometry={nodes.MALE_BASE_MESH_3.geometry}
              material={materials.Skin_Shade3}
              skeleton={nodes.MALE_BASE_MESH_3.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_4"
              geometry={nodes.MALE_BASE_MESH_4.geometry}
              material={materials.Skin_Shade_4}
              skeleton={nodes.MALE_BASE_MESH_4.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_5"
              geometry={nodes.MALE_BASE_MESH_5.geometry}
              material={materials.Jacket}
              skeleton={nodes.MALE_BASE_MESH_5.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_6"
              geometry={nodes.MALE_BASE_MESH_6.geometry}
              material={materials.Jacket_Inside}
              skeleton={nodes.MALE_BASE_MESH_6.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_7"
              geometry={nodes.MALE_BASE_MESH_7.geometry}
              material={materials.Jacket_Shade}
              skeleton={nodes.MALE_BASE_MESH_7.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_8"
              geometry={nodes.MALE_BASE_MESH_8.geometry}
              material={materials.Jacket_Shade2}
              skeleton={nodes.MALE_BASE_MESH_8.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_9"
              geometry={nodes.MALE_BASE_MESH_9.geometry}
              material={materials.Pants}
              skeleton={nodes.MALE_BASE_MESH_9.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_10"
              geometry={nodes.MALE_BASE_MESH_10.geometry}
              material={materials.Pants_Shade}
              skeleton={nodes.MALE_BASE_MESH_10.skeleton}
            />
            <skinnedMesh
              name="MALE_BASE_MESH_11"
              geometry={nodes.MALE_BASE_MESH_11.geometry}
              material={materials.Shoes}
              skeleton={nodes.MALE_BASE_MESH_11.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(character3DModelFile);

// map = new Map(JSON.parse(localStorage.myMap));
/*
React.useEffect(() => {
    if (!localStorage.characterFSMDurations) {
      const milliseconds = 1000;
      localStorage.characterFSMStates = JSON.stringify(
        Array.from(
          new Map([
            [IDLE_STATE, actions.IDLE?.getClip().duration! * milliseconds],
            [MOVE_STATE, actions.RUN?.getClip().duration! * milliseconds],
            [
              USING_SKILL_1_STATE,
              actions.SHOOTING?.getClip().duration! * milliseconds,
            ],
            [
              USING_SKILL_2_STATE,
              actions.MAUL?.getClip().duration! * milliseconds,
            ],
            [
              USING_SKILL_3_STATE,
              actions.ROLL?.getClip().duration! * milliseconds,
            ],
            [DEATH_STATE, actions.DEATH?.getClip().duration! * milliseconds],
          ]).entries()
        )
      );
    }
  }, []);
  */
