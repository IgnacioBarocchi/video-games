import { createMachine } from "xstate";
import { nanoid } from "nanoid";
import {
  DEATH_EVENT,
  DEATH_STATE,
  INACTIVE_STATE,
  MOVE_EVENT,
  MOVE_STATE,
  USING_SKILL_1_EVENT,
  USING_SKILL_1_STATE,
} from "./machine-constants";

const description =
  "This machine does not take into account the HP of the NPC. Is meant to be implemented in the car game";

export const simpleZombieMachine = createMachine({
  id: nanoid(15),
  initial: MOVE_STATE,
  description,
  states: {
    [MOVE_STATE]: {
      on: {
        [USING_SKILL_1_EVENT]: {
          target: USING_SKILL_1_STATE,
        },
        [DEATH_EVENT]: {
          target: DEATH_STATE,
        },
      },
    },
    [USING_SKILL_1_STATE]: {
      on: {
        [MOVE_EVENT]: {
          target: MOVE_STATE,
        },
        [DEATH_EVENT]: {
          target: DEATH_STATE,
        },
      },
    },
    [DEATH_STATE]: {
      after: { 3000: INACTIVE_STATE },
    },
    [INACTIVE_STATE]: {
      type: "final",
    },
  },
});
