import { Input } from "./input";
import {
  MOVE_EVENT,
  USING_SKILL_3_EVENT,
  USING_SKILL_2_EVENT,
  USING_SKILL_1_EVENT,
  IDLE_EVENT,
} from "../machines/machine-constants";

export const getFSMEvent = (input: Input) => {
  const {
    FORWARD,
    BACKWARD,
    LEFT,
    RIGHT,
    USE_SKILL_1,
    USE_SKILL_2,
    USE_SKILL_3,
  } = input;

  if (FORWARD || BACKWARD || LEFT || RIGHT) {
    return MOVE_EVENT;
  }

  if (USE_SKILL_3) {
    //! console.log("USE_SKILL_3", USE_SKILL_3);
    return USING_SKILL_3_EVENT;
  }

  if (USE_SKILL_2) {
    //! console.log("USE_SKILL_2", USE_SKILL_2);
    return USING_SKILL_2_EVENT;
  }

  if (USE_SKILL_1) {
    //! console.log("USE_SKILL_1", USE_SKILL_1);
    return USING_SKILL_1_EVENT;
  }

  return IDLE_EVENT;
};
