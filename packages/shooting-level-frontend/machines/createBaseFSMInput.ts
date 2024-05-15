import { assign } from "xstate";
import { nanoid } from "nanoid";
import { getFSMOneShotPlayerFrom, stopAll } from "../lib/animationHelper";
import { RapierRigidBody } from "@react-three/rapier";

export const IDLE_STATE = "IDLE_STATE";
export const MOVE_STATE = "MOVE_STATE";
export const USING_SKILL_1_STATE = "USING_SKILL_1_STATE";
export const USING_SKILL_2_STATE = "USING_SKILL_2_STATE";
export const USING_SKILL_3_STATE = "USING_SKILL_3_STATE";
export const REACTING_TO_SKILL_1_STATE = "REACTING_TO_SKILL_1_STATE";
export const REACTING_TO_SKILL_2_STATE = "REACTING_TO_SKILL_2_STATE";
export const TAKING_DAMAGE_STATE = "TAKING_DAMAGE_STATE";
export const DEATH_STATE = "DEATH";

export const USING_SKILL_1_EVENT = "SKILL_1_EVENT";
export const USING_SKILL_2_EVENT = "SKILL_2_EVENT";
export const USING_SKILL_3_EVENT = "SKILL_3_EVENT";
export const REACTING_TO_SKILL_1_EVENT = "REACTING_TO_SKILL_1_EVENT";
export const REACTING_TO_SKILL_2_EVENT = "REACTING_TO_SKILL_2_EVENT";
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

export const createBaseFSMInput = () => {
  const baseMachineConfigInput = {
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
      REACTING_TO_SKILL_1_STATE_DELAY: ({
        context,
      }: {
        context: FSMContext;
      }) => {
        return context.characterFSMDurations?.get(REACTING_TO_SKILL_1_STATE);
      },
      REACTING_TO_SKILL_2_STATE_DELAY: ({
        context,
      }: {
        context: FSMContext;
      }) => {
        return context.characterFSMDurations?.get(REACTING_TO_SKILL_2_STATE);
      },
    },
  };

  const baseMachineStateInput = {
    id: nanoid(),
    initial: IDLE_STATE,
    internal: true,
    context: {
      initialHP: 100,
      currentHP: 100,
      rigidBody: null,
      mesh: null,
      actions: null,
      characterFSMDurations: new Map(),
      animationNameByFSMState: new Map(),
      // canUseSkill1InTarget: false,
      // canUseSkill2InTarget: false,
    },
    states: {
      [IDLE_STATE]: {
        entry: [
          ({ context }) => {
            if (!context?.actions?.RUN || !context?.actions?.MOVE) {
              return;
            }

            context.actions.RUN.clampWhenFinished = true;
            context?.actions?.RUN?.stop();
            context?.actions?.IDLE?.play();
          },
        ],
        on: {
          [MOVE_EVENT]: MOVE_STATE,
          [USING_SKILL_1_EVENT]: USING_SKILL_1_STATE,
          [USING_SKILL_2_EVENT]: USING_SKILL_2_STATE,
          [USING_SKILL_3_EVENT]: USING_SKILL_3_STATE,
          [REACTING_TO_SKILL_1_EVENT]: REACTING_TO_SKILL_1_STATE,
          [REACTING_TO_SKILL_2_EVENT]: REACTING_TO_SKILL_2_STATE,
          [DEATH_EVENT]: DEATH_STATE,
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
            if (!context?.actions?.RUN || !context?.actions?.MOVE) {
              return;
            }
            context.actions.IDLE.clampWhenFinished = true;
            context?.actions?.IDLE?.stop();
            context?.actions?.RUN?.play();
          },
        ],
        on: {
          [IDLE_EVENT]: IDLE_STATE,
          [USING_SKILL_1_EVENT]: USING_SKILL_1_STATE,
          [USING_SKILL_2_EVENT]: USING_SKILL_2_STATE,
          [USING_SKILL_3_EVENT]: USING_SKILL_3_STATE,
          [REACTING_TO_SKILL_1_EVENT]: REACTING_TO_SKILL_1_STATE,
          [REACTING_TO_SKILL_2_EVENT]: REACTING_TO_SKILL_2_STATE,
          [DEATH_EVENT]: DEATH_STATE,
        },
      },
      [USING_SKILL_1_STATE]: {
        entry: [
          ({ context }) => {
            getFSMOneShotPlayerFrom(USING_SKILL_1_STATE).with(context);
          },
        ],
        after: { USING_SKILL_1_STATE_DELAY: IDLE_STATE },
      },
      [USING_SKILL_2_STATE]: {
        entry: [
          ({ context }) => {
            getFSMOneShotPlayerFrom(USING_SKILL_2_STATE).with(context);
          },
        ],
        after: { USING_SKILL_2_STATE_DELAY: IDLE_STATE },
      },
      [USING_SKILL_3_STATE]: {
        entry: [
          ({ context }) => {
            getFSMOneShotPlayerFrom(USING_SKILL_3_STATE).with(context);
          },
        ],
        after: { USING_SKILL_3_STATE_DELAY: IDLE_STATE },
      },
      [REACTING_TO_SKILL_1_STATE]: {
        always: [
          {
            target: DEATH_STATE,
            guard: (context: FSMContext) => context.currentHP <= 0,
          },
        ],
        entry: [
          assign({
            currentHP: ({
              context,
            }: {
              context: FSMContext;
              event: Pick<FSMContext, "currentHP">;
            }) => {
              return context.currentHP - 50;
            },
          }),
        ],
        after: { REACTING_TO_SKILL_1_DELAY: IDLE_STATE },
      },
      [REACTING_TO_SKILL_2_STATE]: {
        always: [
          {
            target: DEATH_STATE,
            guard: (context: FSMContext) => context.currentHP <= 0,
          },
        ],
        entry: [
          assign({
            currentHP: ({
              context,
            }: {
              context: FSMContext;
              event: Pick<FSMContext, "currentHP">;
            }) => {
              return context.currentHP - 100;
            },
          }),
        ],
        after: { REACTING_TO_SKILL_2_DELAY: IDLE_STATE },
      },
      [DEATH_STATE]: {
        entry: [({ context }) => {}],
        type: "final",
      },
    },
  };

  return { baseMachineStateInput, baseMachineConfigInput };
};
