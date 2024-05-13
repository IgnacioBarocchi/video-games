import { Group, AnimationAction, AnimationClip } from "three";
import {
  MutableReference,
  forwardRef,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
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
import { Mesh, SkinnedMesh, Bone, MeshBasicMaterial } from "three";
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
  };
};

type ActionName = "DEATH" | "IDLE" | "MAUL" | "ROLL" | "RUN" | "SHOOTING";
export type GLTFActions = Record<ActionName, AnimationAction> & AnimationClip;
// const group = useRef<Group>();

export const MaleCharacter3DModel = forwardRef<{
  props: JSX.IntrinsicElements["group"];
  group: MutableReference<Group>;
}>((props, group) => {
  // const { scene, materials, animations } = useGLTF(
  //   character3DModelFile
  // ) as GLTFResult;
  // const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // const { nodes } = useGraph(clone);
  // const { actions } = useAnimations<GLTFActions>(animations, group);
  // const [_, send] = useActor(Context.useActorRef().logic);

  // const updateMaulPosition = useCallback((isHanded: boolean) => {
  //   const {
  //     HANDED_MAUL_MESH,
  //     HANDED_MAUL_MESH_1,
  //     HANDED_MAUL_MESH_2,
  //     PACKED_MAUL_MESH,
  //     PACKED_MAUL_MESH_1,
  //     PACKED_MAUL_MESH_2,
  //     PACKED_MAUL_MESH_3,
  //   } = props.nodes;

  //   HANDED_MAUL_MESH.visible = isHanded;
  //   HANDED_MAUL_MESH_1.visible = isHanded;
  //   HANDED_MAUL_MESH_2.visible = isHanded;
  //   PACKED_MAUL_MESH.visible = !isHanded;
  //   PACKED_MAUL_MESH_1.visible = !isHanded;
  //   PACKED_MAUL_MESH_2.visible = !isHanded;
  //   PACKED_MAUL_MESH_3.visible = !isHanded;
  // }, []);

  // useEffect(() => {
  //   if (group?.current) {
  //     updateMaulPosition(false);

  //     const milliseconds = 1000;
  //     const animationNameByFSMState = new Map([
  //       [IDLE_STATE, "IDLE"],
  //       [MOVE_STATE, "RUN"],
  //       [USING_SKILL_1_STATE, "SHOOTING"],
  //       [USING_SKILL_2_STATE, "MAUL"],
  //       [USING_SKILL_3_STATE, "ROLL"],
  //       [REACTING_TO_SKILL_1_STATE, "DEATH"],
  //       [REACTING_TO_SKILL_2_STATE, "DEATH"],
  //       [DEATH_STATE, "DEATH"],
  //     ]);

  //     const characterFSMDurations = new Map([
  //       [IDLE_STATE, actions.IDLE?.getClip().duration! * milliseconds],
  //       [MOVE_STATE, actions.RUN?.getClip().duration! * milliseconds],
  //       [
  //         USING_SKILL_1_STATE,
  //         actions.SHOOTING?.getClip().duration! * milliseconds,
  //       ],
  //       [USING_SKILL_2_STATE, actions.MAUL?.getClip().duration! * milliseconds],
  //       [USING_SKILL_3_STATE, actions.ROLL?.getClip().duration! * milliseconds],
  //       [DEATH_STATE, actions.DEATH?.getClip().duration! * milliseconds],
  //     ]);

  //     send({
  //       type: "SET_CONTEXT",
  //       actions,
  //       mesh: group.current,
  //       animationNameByFSMState,
  //       characterFSMDurations: characterFSMDurations,
  //       callback: updateMaulPosition,
  //     });
  //   }
  // }, []);

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

// console.log("MD");

// if (state.context.actions) {
//   state.context.actions.RUN.play();
// }
