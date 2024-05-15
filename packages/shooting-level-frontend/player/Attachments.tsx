import { useContext, useCallback, useEffect, memo } from "react";
import { useActor } from "@xstate/react";
import { Context } from "../providers/player-context-provider";
import { USING_SKILL_2_STATE } from "../machines/createBaseFSMInput";
import { useSelector } from "@xstate/react";

const usingSkill2Selector = (state) => {
  return state.value === USING_SKILL_2_STATE;
};

export const Attachments = ({ nodes }) => {
  const playerActor = useContext(Context);
  const maulIsHanded = useSelector(playerActor, usingSkill2Selector);

  const updateMaulPosition = (isHanded: boolean) => {
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
    if (maulIsHanded) {
      updateMaulPosition(true);
    } else {
      updateMaulPosition(false);
    }
  }, [maulIsHanded]);

  return <></>;
};
