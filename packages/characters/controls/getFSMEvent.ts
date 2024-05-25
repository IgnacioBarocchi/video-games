import { Keys } from "../lib/keysMap";
import {
  MOVE_EVENT,
  USING_SKILL_3_EVENT,
  USING_SKILL_2_EVENT,
  USING_SKILL_1_EVENT,
  IDLE_EVENT,
} from "../machines/createBaseFSMInput";

export const getFSMEvent = (keys: Keys) => {
  const { forward, backward, leftward, rightward, skill_1, skill_2, skill_3 } =
    keys;
  if (forward || backward || leftward || rightward) {
    return MOVE_EVENT;
  }

  if (skill_3) return USING_SKILL_3_EVENT;

  if (skill_2) return USING_SKILL_2_EVENT;

  if (skill_1) return USING_SKILL_1_EVENT;

  return IDLE_EVENT;
};
