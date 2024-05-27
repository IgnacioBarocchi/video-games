import { assign, createMachine } from "xstate";
import { nanoid } from "nanoid";
import {
  DEATH_EVENT,
  DEATH_STATE,
  FSMStates,
  INACTIVE_STATE,
  MOVE_EVENT,
  MOVE_STATE,
  USING_SKILL_1_EVENT,
  USING_SKILL_1_STATE,
} from "./machine-constants";
import { ComplexFSMContext } from "./createLiskovFSMInput";
import {
  getFSMOneShotPlayerFrom,
  pickAction,
  playFinalAnimation,
} from "../lib/animationHelper";
import { LoopOnce } from "three";
// todo rename set context to set context event and add it to constants
const description =
  "This machine does not take into account the HP of the [NPC]. Is meant to be implemented in the car game. Author: Ignacio Barocchi";

export type SimpleNPCFSMContext = Omit<
  ComplexFSMContext,
  "initialHP" | "currentHP" | "damageTaken" | "userControlled"
>;

export const simpleZombieMachine = createMachine(
  {
    id: nanoid(15),
    initial: MOVE_STATE,
    description,
    context: {
      rigidBody: null,
      mesh: null,
      actions: null,
      characterFSMDurations: new Map(),
      animationNameByFSMState: new Map(),
    },
    states: {
      [MOVE_STATE]: {
        entry: [
          ({ context }) => {
            const moveAnimationName =
              context.animationNameByFSMState?.get(MOVE_STATE)!;
            if (!moveAnimationName) {
              return;
            }
            context.actions[moveAnimationName].play();
          },
        ],
        on: {
          [USING_SKILL_1_EVENT]: {
            target: USING_SKILL_1_STATE,
          },
          [DEATH_EVENT]: {
            target: DEATH_STATE,
          },
          SET_CONTEXT: {
            actions: [
              assign({
                characterFSMDurations: ({
                  context,
                  event,
                }: {
                  context: SimpleNPCFSMContext;
                  event: Pick<SimpleNPCFSMContext, "characterFSMDurations">;
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
                  context: SimpleNPCFSMContext;
                  event: Pick<SimpleNPCFSMContext, "animationNameByFSMState">;
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
                  context: SimpleNPCFSMContext;
                  event: Pick<SimpleNPCFSMContext, "actions">;
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
                  context: SimpleNPCFSMContext;
                  event: Pick<SimpleNPCFSMContext, "rigidBody">;
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
                  context: SimpleNPCFSMContext;
                  event: Pick<SimpleNPCFSMContext, "mesh">;
                }) => {
                  if (event?.mesh) {
                    const animationName =
                      context.animationNameByFSMState.get(MOVE_STATE)!;
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
      [USING_SKILL_1_STATE]: {
        entry: [
          ({ context }) => {
            getFSMOneShotPlayerFrom(USING_SKILL_1_STATE).with(context);
          },
        ],
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
        entry: [
          ({ context }) => {
            for (const state of [
              MOVE_STATE,
              USING_SKILL_1_STATE,
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
  },
  {
    delays: {
      DEATH_STATE_DELAY: ({ context }: { context: SimpleNPCFSMContext }) => {
        return context.characterFSMDurations?.get(DEATH_STATE);
      },
    },
  }
);
