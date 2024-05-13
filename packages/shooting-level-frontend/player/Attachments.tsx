import { useCallback, useEffect, memo } from "react";
import { useActor } from "@xstate/react";
import { Context } from "../providers/player-context-provider";
import { USING_SKILL_2_STATE } from "../machines/fsmbeta";

export const Attachments = ({ nodes, stateValue }) => {
  const updateMaulPosition = (isHanded: boolean) => {
    console.log({ isHanded });
    const {
      HANDED_MAUL_MESH,
      HANDED_MAUL_MESH_1,
      HANDED_MAUL_MESH_2,
      PACKED_MAUL_MESH,
      PACKED_MAUL_MESH_1,
      PACKED_MAUL_MESH_2,
      PACKED_MAUL_MESH_3,
      RIFLE,
    } = nodes;

    HANDED_MAUL_MESH.visible = isHanded;
    HANDED_MAUL_MESH_1.visible = isHanded;
    HANDED_MAUL_MESH_2.visible = isHanded;
    PACKED_MAUL_MESH.visible = !isHanded;
    PACKED_MAUL_MESH_1.visible = !isHanded;
    PACKED_MAUL_MESH_2.visible = !isHanded;
    PACKED_MAUL_MESH_3.visible = !isHanded;
    RIFLE.visible = !isHanded;
  };

  useEffect(() => {
    console.log("val ", stateValue);
    if (stateValue === USING_SKILL_2_STATE) {
      updateMaulPosition(true);
    } else {
      updateMaulPosition(false);
    }
  }, [stateValue]);

  return <></>;
};
