import {
  IDLE_STATE,
  MOVE_STATE,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  USING_SKILL_3_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
  DEATH_STATE,
  SET_CONTEXT,
} from "../../machines/machine-constants";

const milliseconds = 1000;
export const AnimationSetup = (params) => {
  const { nodes, actions, playerObjectReferences } = params;
  nodes.BULLET_TRAIL_MESH.visible = false;
  nodes.BULLET_TRAIL_MESH_1.visible = false;

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
    [USING_SKILL_1_STATE, actions.SHOOTING?.getClip().duration! * milliseconds],
    [USING_SKILL_2_STATE, actions.MAUL?.getClip().duration! * milliseconds],
    [USING_SKILL_3_STATE, actions.ROLL?.getClip().duration! * milliseconds],
    // *
    [
      REACTING_TO_SKILL_1_STATE,
      actions.DEATH?.getClip().duration! * milliseconds,
    ],
    [
      REACTING_TO_SKILL_2_STATE,
      actions.DEATH?.getClip().duration! * milliseconds,
    ],
    // *
    [DEATH_STATE, actions.DEATH?.getClip().duration! * milliseconds],
  ]);

  return null;
};
