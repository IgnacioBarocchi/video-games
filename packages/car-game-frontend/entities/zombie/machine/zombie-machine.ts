import { createMachine } from "xstate";
import { nanoid } from "nanoid";

export const CHASING_STATE = "chasing";
export const ATTACKING_STATE = "attacking";
export const HIT_STATE = "hit";
export const INACTIVE_STATE = "inactive";

export const CHASE_EVENT = "CHASE";
export const ATTACK_EVENT = "ATTACK";
export const HIT_EVENT = "HIT";

export const enemyMachine = createMachine({
  id: nanoid(15),
  initial: CHASING_STATE,
  states: {
    [CHASING_STATE]: {
      on: {
        [ATTACK_EVENT]: {
          target: ATTACKING_STATE,
        },
        [HIT_EVENT]: {
          target: HIT_STATE,
        },
      },
    },
    [ATTACKING_STATE]: {
      on: {
        [CHASE_EVENT]: {
          target: CHASING_STATE,
        },
        [HIT_EVENT]: {
          target: HIT_STATE,
        },
      },
    },
    [HIT_STATE]: {
      after: { 3000: INACTIVE_STATE },
    },
    [INACTIVE_STATE]: {
      type: "final",
    },
  },
});
