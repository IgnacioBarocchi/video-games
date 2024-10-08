export const IDLE_STATE = "IDLE_STATE";
export const MOVE_STATE = "MOVE_STATE";
export const USING_SKILL_1_STATE = "USING_SKILL_1_STATE";
export const USING_SKILL_2_STATE = "USING_SKILL_2_STATE";
export const USING_SKILL_3_STATE = "USING_SKILL_3_STATE";
export const REACTING_TO_SKILL_1_STATE = "REACTING_TO_SKILL_1_STATE";
export const REACTING_TO_SKILL_2_STATE = "REACTING_TO_SKILL_2_STATE";
export const TAKING_DAMAGE_STATE = "TAKING_DAMAGE_STATE";
export const DEATH_STATE = "DEATH";
export const INACTIVE_STATE = "INACTIVE_STATE";

export const USING_SKILL_1_EVENT = "SKILL_1_EVENT";
export const USING_SKILL_2_EVENT = "SKILL_2_EVENT";
export const USING_SKILL_3_EVENT = "SKILL_3_EVENT";
export const REACTING_TO_SKILL_1_EVENT = "REACTING_TO_SKILL_1_EVENT";
export const REACTING_TO_SKILL_2_EVENT = "REACTING_TO_SKILL_2_EVENT";
export const IDLE_EVENT = "IDLE_EVENT";
export const MOVE_EVENT = "MOVE_EVENT";
export const DEATH_EVENT = "DEATH_EVENT";
export const INACTIVE_EVENT = "INACTIVE_EVENT";
export const SET_CONTEXT = "SET_CONTEXT";

export const FSMSkillStates = [
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  USING_SKILL_3_STATE,
];

export type FSMStates =
  | typeof IDLE_STATE
  | typeof MOVE_STATE
  | typeof USING_SKILL_1_STATE
  | typeof USING_SKILL_2_STATE
  | typeof USING_SKILL_3_STATE
  | typeof REACTING_TO_SKILL_1_STATE
  | typeof REACTING_TO_SKILL_2_STATE
  | typeof DEATH_STATE;

// TODO: car state
export const STOP_STATE = "STOP_STATE";
export const RUNNING_STATE = "RUNNING_STATE";
export const ACCELERATING_STATE = "ACCELERATING_STATE";
export const STOP_EVENT = "STOP_EVENT";
export const RUNNING_EVENT = "RUNNING_EVENT";
export const ACCELERATING_EVENT = "ACCELERATING_EVENT";
export const CRASH_STATE = "CRASH_STATE";
export const CRASH_EVENT = "CRASH_EVENT";
