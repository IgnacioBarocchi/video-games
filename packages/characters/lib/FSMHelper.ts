// TODO: in further versions this should be controlled by the FSM itself
import {
  DEATH_STATE,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  USING_SKILL_3_STATE,
} from "../machines/createBaseFSMInput";
import { FSMStates } from "./getBaseMachineInput";

export const canMove = (stateValue: FSMStates) => {
  return ![
    USING_SKILL_1_STATE,
    USING_SKILL_2_STATE,
    USING_SKILL_3_STATE,
  ].includes(stateValue);
};

// export const canTransitionState = (stateValue: FSMStates) =>
//   !stateValue ||
//   !stateValue.startsWith(USING_SKILL_1_STATE) ||
//   stateValue !== USING_SKILL_2_STATE ||
//   stateValue !== DEATH_STATE;
