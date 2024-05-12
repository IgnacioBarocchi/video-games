//! EN CONTEXT TIENEN QUE TENER LOS MAPAS DE DURACION Y DE NOMBRES POR ESTADO
import { createMachine, assign } from "xstate";
import { nanoid } from "nanoid";
import { getFSMOneShotPlayerFrom, stopAll } from "../lib/animationHelper";

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

const reactToSkill = (context, state) => {
  const animationNameByFSMState = new Map(
    JSON.parse(localStorage.characterFSMStates)
  );

  const animationDurationByFSMState = new Map(
    JSON.parse(localStorage.characterFSMDurations)
  );

  stopAll(
    FSMSkillStates.map(
      (skill) =>
        context.actions![animationNameByFSMState.get(skill as FSMStates)!]
    )
  );

  getFSMOneShotPlayerFrom(
    state,
    animationNameByFSMState,
    animationDurationByFSMState
  ).with(context);
};

// const setContext = {
//   actions: [
//     (context) => console.log(`Before:`, context),
//     assign({
//       characterFSMDurations: (
//         _,
//         event: Pick<FSMContext, "characterFSMDurations">
//       ) => {
//         console.log("characterFSMDurations", event);
//         if (event.characterFSMDurations) {
//           return event.characterFSMDurations;
//         }
//       },
//     }),
//     assign({
//       animationNameByFSMState: (
//         _,
//         event: Pick<FSMContext, "animationNameByFSMState">
//       ) => {
//         console.log("animationNameByFSMState", event);

//         if (event.animationNameByFSMState) {
//           return event.animationNameByFSMState;
//         }
//       },
//     }),
//     assign({
//       animationNameByFSMState: (
//         _,
//         event: Pick<FSMContext, "animationNameByFSMState">
//       ) => {
//         console.log("animationNameByFSMState", event);

//         if (event.animationNameByFSMState) {
//           return event.animationNameByFSMState;
//         }
//       },
//     }),

//     assign({
//       rigidBody: (_, event: Pick<FSMContext, "rigidBody">) => {
//         console.log("rigidBody", event);

//         return event.rigidBody;
//       },
//     }),
//     assign({
//       mesh: (_, event: Pick<FSMContext, "mesh">) => {
//         console.log("mesh", event);

//         if (event.mesh) {
//           return event.mesh;
//         }
//       },
//     }),
//     assign({
//       actions: (context: FSMContext, event: Pick<FSMContext, "actions">) => {
//         console.log("actions", event);

//         if (event.actions) {
//           event.actions[
//             context.animationNameByFSMState.get(IDLE_STATE)!
//           ]?.play();
//           return event.actions;
//         }
//       },
//     }),
//   ],
// };

const config = {
  actions: {
    reactToSkill1: (context: FSMContext) => {
      reactToSkill(context, REACTING_TO_SKILL_1_STATE);
    },
    reactToSkill2: (context: FSMContext) => {
      reactToSkill(context, REACTING_TO_SKILL_2_STATE);
    },
  },
};

export const characterMachine = createMachine(
  {
    id,
    initial: IDLE_STATE,
    // initial: "active",
    // preserveActionOrder: true,
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
    // context: { count: 0 },
    states: {
      // active: {
      //   on: {
      //     SET_CONTEXT: {
      //       actions: [
      //         (context) => console.log(`Before: ${context.count}`), // "Before: 2"
      //         assign({ count: (context) => context.count + 1 }), // count === 1
      //         assign({ count: (context) => context.count + 1 }), // count === 2
      //         (context) => console.log(`After: ${context.count}`), // "After: 2"
      //       ],
      //     },
      //   },
      // },
      [IDLE_STATE]: {
        on: {
          MOVE_EVENT: MOVE_STATE,
          SKILL_1_EVENT: USING_SKILL_1_STATE,
          SKILL_2_EVENT: USING_SKILL_2_STATE,
          SKILL_3_EVENT: USING_SKILL_3_STATE,
          DEATH_EVENT: DEATH_STATE,
          SET_CONTEXT: {
            actions: [
              (context) => console.log(`Before:`, context),
              assign({
                characterFSMDurations: ({
                  context,
                  event,
                }: {
                  context: FSMContext;
                  event: Pick<FSMContext, "characterFSMDurations">;
                }) => {
                  console.log("1");

                  if (event?.characterFSMDurations) {
                    return event.characterFSMDurations;
                  }
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
                  console.log("2");

                  if (event?.animationNameByFSMState) {
                    return event.animationNameByFSMState;
                  }
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
                  console.log("6");

                  if (event?.actions) {
                    // const animationName =
                    //   context.animationNameByFSMState.get(IDLE_STATE)!;
                    // console.log(animationName);
                    // event.actions[animationName]?.play();
                    return event.actions;
                  }
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
                  console.log("4");

                  if (event?.rigidBody) {
                    return event.rigidBody;
                  }
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
                  console.log("5", context);

                  if (event?.mesh) {
                    const animationName =
                      context.animationNameByFSMState.get(IDLE_STATE)!;
                    context.actions[animationName]?.play();
                    return event.mesh;
                  }
                },
              }),
            ],
          },
        },
      },
      [MOVE_STATE]: {
        on: {
          IDLE_EVENT: IDLE_STATE,
          SKILL_1_EVENT: USING_SKILL_1_STATE,
          SKILL_2_EVENT: USING_SKILL_2_STATE,
          SKILL_3_EVENT: USING_SKILL_3_STATE,
          DEATH_EVENT: DEATH_STATE,
        },
      },
      [USING_SKILL_1_STATE]: {
        on: {
          IDLE_EVENT: REACTING_TO_SKILL_1_STATE,
          MOVE_EVENT: MOVE_STATE,
          DEATH_EVENT: DEATH_STATE,
        },
      },
      [USING_SKILL_2_STATE]: {
        on: {
          IDLE_EVENT: REACTING_TO_SKILL_2_STATE,
          MOVE_EVENT: MOVE_STATE,
          DEATH_EVENT: DEATH_STATE,
        },
      },
      [USING_SKILL_3_STATE]: {
        on: {
          MOVE_EVENT: MOVE_STATE,
          IDLE_EVENT: IDLE_STATE,
          DEATH_EVENT: DEATH_STATE,
        },
      },
      [REACTING_TO_SKILL_1_STATE]: {
        on: {
          IDLE_EVENT: IDLE_STATE,
          MOVE_EVENT: MOVE_STATE,
          DEATH_EVENT: DEATH_STATE,
        },
      },
      [REACTING_TO_SKILL_2_STATE]: {
        on: {
          IDLE_EVENT: IDLE_STATE,
          MOVE_EVENT: MOVE_STATE,
          DEATH_EVENT: DEATH_STATE,
        },
      },
      [DEATH_STATE]: {
        type: "final",
      },
      // setContext,
    },
  },
  config
);
