import { AnimationAction, Group, Object3DEventMap, LoopOnce } from "three";
import { assign } from "xstate";
import { nanoid } from "nanoid";
import {
  getFSMOneShotPlayerFrom,
  pickAction,
  playFinalAnimation,
} from "../lib/animationHelper";
import { RapierRigidBody } from "@react-three/rapier";
import {
  FSMStates,
  USING_SKILL_1_STATE,
  USING_SKILL_2_STATE,
  USING_SKILL_3_STATE,
  REACTING_TO_SKILL_1_STATE,
  REACTING_TO_SKILL_2_STATE,
  DEATH_STATE,
  IDLE_STATE,
  MOVE_STATE,
  MOVE_EVENT,
  USING_SKILL_1_EVENT,
  USING_SKILL_2_EVENT,
  USING_SKILL_3_EVENT,
  REACTING_TO_SKILL_1_EVENT,
  REACTING_TO_SKILL_2_EVENT,
  DEATH_EVENT,
  IDLE_EVENT,
  INACTIVE_STATE,
} from "./machine-constants";
const description =
  "Machine that does not violate the LSP. It can be used for [Players] or [NPC's]. Author: Ignacio Barocchi";

export type ComplexFSMContext = {
  initialHP: number;
  currentHP: number;
  damageTaken: number;
  rigidBody: RapierRigidBody | null;
  mesh: Group<Object3DEventMap> | null;
  actions: { [x: string]: AnimationAction } | null;
  characterFSMDurations: Map<FSMStates, string>;
  animationNameByFSMState: Map<FSMStates, number>;
  userControlled: boolean;
};

export const createBaseFSMInput = () => {
  const baseMachineConfigInput = {
    delays: {
      USING_SKILL_1_STATE_DELAY: ({
        context,
      }: {
        context: ComplexFSMContext;
      }) => {
        return context.characterFSMDurations?.get(USING_SKILL_1_STATE);
      },
      USING_SKILL_2_STATE_DELAY: ({
        context,
      }: {
        context: ComplexFSMContext;
      }) => {
        return context.characterFSMDurations?.get(USING_SKILL_2_STATE);
      },
      USING_SKILL_3_STATE_DELAY: ({
        context,
      }: {
        context: ComplexFSMContext;
      }) => {
        return context.characterFSMDurations?.get(USING_SKILL_3_STATE);
      },
      REACTING_TO_SKILL_1_STATE_DELAY: ({
        context,
      }: {
        context: ComplexFSMContext;
      }) => {
        return context.characterFSMDurations?.get(REACTING_TO_SKILL_1_STATE);
      },
      REACTING_TO_SKILL_2_STATE_DELAY: ({
        context,
      }: {
        context: ComplexFSMContext;
      }) => {
        return context.characterFSMDurations?.get(REACTING_TO_SKILL_2_STATE);
      },
      DEATH_STATE_DELAY: ({ context }: { context: ComplexFSMContext }) => {
        return context.characterFSMDurations?.get(DEATH_STATE);
      },
    },
    guards: {
      isDead: ({ context }: { context: ComplexFSMContext }) => {
        const isDeadB = context.currentHP <= 0;
        return isDeadB;
      },
    },
  };

  const baseMachineStateInput = {
    id: nanoid(15),
    description,
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
    },
    states: {
      [IDLE_STATE]: {
        entry: [
          ({ context }) => {
            // console.info("ENTRY", IDLE_STATE);
            const idleAnimationName =
              context.animationNameByFSMState?.get(IDLE_STATE)!;
            const moveAnimationName =
              context.animationNameByFSMState?.get(MOVE_STATE)!;

            if (!idleAnimationName || !moveAnimationName) {
              return;
            }
            context.actions[moveAnimationName].clampWhenFinished = true;
            context.actions[moveAnimationName].stop();
            context.actions[idleAnimationName].play();
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
                  context: ComplexFSMContext;
                  event: Pick<ComplexFSMContext, "characterFSMDurations">;
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
                  context: ComplexFSMContext;
                  event: Pick<ComplexFSMContext, "animationNameByFSMState">;
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
                  context: ComplexFSMContext;
                  event: Pick<ComplexFSMContext, "actions">;
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
                  context: ComplexFSMContext;
                  event: Pick<ComplexFSMContext, "rigidBody">;
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
                  context: ComplexFSMContext;
                  event: Pick<ComplexFSMContext, "mesh">;
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
              assign({
                userControlled: ({
                  context,
                  event,
                }: {
                  context: ComplexFSMContext;
                  event: Pick<ComplexFSMContext, "userControlled">;
                }) => {
                  return event.userControlled;
                },
              }),
            ],
          },
        },
      },
      [MOVE_STATE]: {
        entry: [
          ({ context }) => {
            // console.info("ENTRY", MOVE_STATE);
            const idleAnimationName =
              context.animationNameByFSMState?.get(IDLE_STATE)!;
            const moveAnimationName =
              context.animationNameByFSMState?.get(MOVE_STATE)!;

            if (!idleAnimationName || !moveAnimationName) {
              return;
            }

            context.actions[idleAnimationName].clampWhenFinished = true;
            context.actions[idleAnimationName].stop();
            context.actions[moveAnimationName].play();
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
            // console.info("ENTRY", USING_SKILL_1_STATE);
            getFSMOneShotPlayerFrom(USING_SKILL_1_STATE).with(context);
          },
        ],
        after: { USING_SKILL_1_STATE_DELAY: IDLE_STATE },
      },
      [USING_SKILL_2_STATE]: {
        entry: [
          ({ context }) => {
            // console.info("ENTRY", USING_SKILL_2_STATE);
            getFSMOneShotPlayerFrom(USING_SKILL_2_STATE).with(context);
          },
        ],
        after: { USING_SKILL_2_STATE_DELAY: IDLE_STATE },
      },
      [USING_SKILL_3_STATE]: {
        entry: [
          ({ context }) => {
            // console.info("ENTRY", USING_SKILL_3_STATE);
            getFSMOneShotPlayerFrom(USING_SKILL_3_STATE).with(context);
          },
        ],
        after: { USING_SKILL_3_STATE_DELAY: IDLE_STATE },
      },
      [REACTING_TO_SKILL_1_STATE]: {
        always: [
          {
            guard: "isDead",
            target: DEATH_STATE,
          },
        ],
        entry: [
          assign({
            currentHP: ({
              context,
            }: {
              context: ComplexFSMContext;
              event: Pick<ComplexFSMContext, "currentHP">;
            }) => {
              getFSMOneShotPlayerFrom(REACTING_TO_SKILL_1_STATE).with(context);
              pickAction(IDLE_STATE).from(context).stop();
              pickAction(MOVE_STATE).from(context).stop();

              return context.currentHP - 100;
            },
          }),
        ],
        after: { REACTING_TO_SKILL_1_STATE_DELAY: IDLE_STATE },
      },
      [REACTING_TO_SKILL_2_STATE]: {
        always: [
          {
            guard: "isDead",
            target: DEATH_STATE,
          },
        ],
        entry: [
          assign({
            currentHP: ({
              context,
            }: {
              context: ComplexFSMContext;
              event: Pick<ComplexFSMContext, "currentHP">;
            }) => {
              getFSMOneShotPlayerFrom(REACTING_TO_SKILL_2_STATE).with(context);
              pickAction(IDLE_STATE).from(context).stop();
              pickAction(MOVE_STATE).from(context).stop();

              return context.currentHP - 100;
            },
          }),
        ],
        after: { REACTING_TO_SKILL_2_STATE_DELAY: IDLE_STATE },
      },
      [DEATH_STATE]: {
        entry: [
          ({ context }) => {
            for (const state of [
              IDLE_STATE,
              MOVE_STATE,
              USING_SKILL_1_STATE,
              USING_SKILL_2_STATE,
              USING_SKILL_3_STATE,
              REACTING_TO_SKILL_1_STATE,
              REACTING_TO_SKILL_2_STATE,
            ] as FSMStates[]) {
              const action = pickAction(state).from(context);
              action.reset().setLoop(LoopOnce, 1).stop();
            }

            playFinalAnimation(pickAction(DEATH_STATE).from(context));
          },
        ],
        after: { DEATH_STATE_DELAY: INACTIVE_STATE },
      },
      [INACTIVE_STATE]: {
        type: "final",
      },
    },
  };

  return { baseMachineStateInput, baseMachineConfigInput };
};
