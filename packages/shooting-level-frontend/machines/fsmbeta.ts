import { createMachine, assign } from "xstate";
import { nanoid } from "nanoid";
import { getFSMOneShotPlayerFrom, stopAll } from "../lib/animationHelper";
import { RapierRigidBody } from "@react-three/rapier";

const id = nanoid();

export const IDLE_STATE = "IDLE_STATE";
export const MOVE_STATE = "MOVE_STATE";
export const USING_SKILL_1_STATE = "USING_SKILL_1_STATE";
export const USING_SKILL_2_STATE = "USING_SKILL_2_STATE";
export const USING_SKILL_3_STATE = "USING_SKILL_3_STATE";
export const REACTING_TO_SKILL_1_STATE = "REACTING_TO_SKILL_1_STATE";
export const REACTING_TO_SKILL_2_STATE = "REACTING_TO_SKILL_2_STATE";
export const DEATH_STATE = "DEATH";

export const SKILL_1_EVENT = "SKILL_1_EVENT";
export const SKILL_2_EVENT = "SKILL_2_EVENT";
export const SKILL_3_EVENT = "SKILL_3_EVENT";
export const IDLE_EVENT = "IDLE_EVENT";
export const MOVE_EVENT = "MOVE_EVENT";
export const DEATH_EVENT = "DEATH_EVENT";

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

export type FSMContext = {
  initialHP: number;
  currentHP: number;
  damageTaken: number;
  rigidBody: RapierRigidBody | null;
  mesh: Group<Object3DEventMap> | null;
  actions: { [x: string]: AnimationAction } | null;
  characterFSMDurations: Map<FSMStates, string>;
  animationNameByFSMState: Map<FSMStates, number>;
};

const config = {
  delays: {
    USING_SKILL_1_STATE_DELAY: ({ context }: { context: FSMContext }) => {
      return context.characterFSMDurations?.get(USING_SKILL_1_STATE);
    },
    USING_SKILL_2_STATE_DELAY: ({ context }: { context: FSMContext }) => {
      return context.characterFSMDurations?.get(USING_SKILL_2_STATE);
    },
    USING_SKILL_3_STATE_DELAY: ({ context }: { context: FSMContext }) => {
      return context.characterFSMDurations?.get(USING_SKILL_3_STATE);
    },
  },
};

export const characterMachine = createMachine(
  {
    id,
    initial: IDLE_STATE,
    context: {
      initialHP: 100,
      currentHP: 100,
      damageTaken: 0,
      rigidBody: null,
      mesh: null,
      actions: null,
      characterFSMDurations: new Map(),
      animationNameByFSMState: new Map(),
    },
    states: {
      [IDLE_STATE]: {
        entry: [
          ({ context }) => {
            if (!context.actions) {
              return;
            }

            context.actions.RUN.clampWhenFinished = true;
            context?.actions?.RUN?.stop();
            context?.actions?.IDLE?.play();
          },
        ],
        on: {
          MOVE_EVENT: MOVE_STATE,
          SKILL_1_EVENT: USING_SKILL_1_STATE,
          SKILL_2_EVENT: USING_SKILL_2_STATE,
          SKILL_3_EVENT: USING_SKILL_3_STATE,
          DEATH_EVENT: DEATH_STATE,
          SET_CONTEXT: {
            actions: [
              assign({
                characterFSMDurations: ({
                  context,
                  event,
                }: {
                  context: FSMContext;
                  event: Pick<FSMContext, "characterFSMDurations">;
                }) => {
                  if (event?.characterFSMDurations) {
                    return event.characterFSMDurations;
                  }

                  return context.characterFSMDurations;
                },
              }),
              assign({
                animationNameByFSMState: ({
                  context,
                  event,
                }: {
                  context: FSMContext;
                  event: Pick<FSMContext, "animationNameByFSMState">;
                }) => {
                  if (event?.animationNameByFSMState) {
                    return event.animationNameByFSMState;
                  }

                  return context.animationNameByFSMState;
                },
              }),
              assign({
                actions: ({
                  context,
                  event,
                }: {
                  context: FSMContext;
                  event: Pick<FSMContext, "actions">;
                }) => {
                  if (event?.actions) {
                    return event.actions;
                  }

                  return context.actions;
                },
              }),
              assign({
                rigidBody: ({
                  context,
                  event,
                }: {
                  context: FSMContext;
                  event: Pick<FSMContext, "rigidBody">;
                }) => {
                  if (event?.rigidBody) {
                    return event.rigidBody;
                  }

                  return context.rigidBody;
                },
              }),
              assign({
                mesh: ({
                  context,
                  event,
                }: {
                  context: FSMContext;
                  event: Pick<FSMContext, "mesh">;
                }) => {
                  if (event?.mesh) {
                    console.log(event.mesh);
                    const animationName =
                      context.animationNameByFSMState.get(IDLE_STATE)!;
                    context.actions[animationName]?.play();
                    return event.mesh;
                  }

                  return context.mesh;
                },
              }),
            ],
          },
        },
      },
      [MOVE_STATE]: {
        entry: [
          ({ context }) => {
            context.actions.IDLE.clampWhenFinished = true;
            context?.actions?.IDLE?.stop();
            context?.actions?.RUN?.play();
          },
        ],
        on: {
          IDLE_EVENT: IDLE_STATE,
          SKILL_1_EVENT: USING_SKILL_1_STATE,
          SKILL_2_EVENT: USING_SKILL_2_STATE,
          SKILL_3_EVENT: USING_SKILL_3_STATE,
          DEATH_EVENT: DEATH_STATE,
        },
      },
      [USING_SKILL_1_STATE]: {
        entry: [
          ({ context }) => {
            getFSMOneShotPlayerFrom(USING_SKILL_1_STATE).with(context);
          },
        ],
        after: { USING_SKILL_1_STATE_DELAY: IDLE_STATE },
        // on: {
        //   IDLE_EVENT: IDLE_STATE,
        //   MOVE_EVENT: MOVE_STATE,
        //   DEATH_EVENT: DEATH_STATE,
        // },
      },
      [USING_SKILL_2_STATE]: {
        entry: [
          ({ context }) => {
            getFSMOneShotPlayerFrom(USING_SKILL_2_STATE).with(context);
          },
        ],
        after: { USING_SKILL_2_STATE_DELAY: IDLE_STATE },
        // on: {
        //   IDLE_EVENT: IDLE_STATE,
        //   MOVE_EVENT: MOVE_STATE,
        //   DEATH_EVENT: DEATH_STATE,
        // },
      },
      [USING_SKILL_3_STATE]: {
        entry: [
          ({ context }) => {
            getFSMOneShotPlayerFrom(USING_SKILL_3_STATE).with(context);
          },
        ],
        after: { USING_SKILL_3_STATE_DELAY: IDLE_STATE },
        // on: {
        //   MOVE_EVENT: MOVE_STATE,
        //   IDLE_EVENT: IDLE_STATE,
        //   DEATH_EVENT: DEATH_STATE,
        // },
      },
      [REACTING_TO_SKILL_1_STATE]: {
        entry: [({ context }) => {}],
        after: { 3000: IDLE_STATE },
        // on: {
        //   IDLE_EVENT: IDLE_STATE,
        //   MOVE_EVENT: MOVE_STATE,
        //   DEATH_EVENT: DEATH_STATE,
        // },
      },
      [REACTING_TO_SKILL_2_STATE]: {
        entry: [({ context }) => {}],
        after: { 3000: IDLE_STATE },
        // on: {
        //   IDLE_EVENT: IDLE_STATE,
        //   MOVE_EVENT: MOVE_STATE,
        //   DEATH_EVENT: DEATH_STATE,
        // },
      },
      [DEATH_STATE]: {
        entry: [({ context }) => {}],
        type: "final",
      },
    },
  },
  config
);

// actions: {
//   reactToSkill1: (context: FSMContext) => {
//     reactToSkill(context, REACTING_TO_SKILL_1_STATE);
//   },
//   reactToSkill2: (context: FSMContext) => {
//     reactToSkill(context, REACTING_TO_SKILL_2_STATE);
//   },
// },

// const reactToSkill = (context, state) => {
//   const animationNameByFSMState = new Map(
//     JSON.parse(localStorage.characterFSMStates)
//   );

//   const animationDurationByFSMState = new Map(
//     JSON.parse(localStorage.characterFSMDurations)
//   );

//   stopAll(
//     FSMSkillStates.map(
//       (skill) =>
//         context.actions![animationNameByFSMState.get(skill as FSMStates)!]
//     )
//   );

//   getFSMOneShotPlayerFrom(
//     state,
//     animationNameByFSMState,
//     animationDurationByFSMState
//   ).with(context);
// };
