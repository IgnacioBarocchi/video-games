import { nanoid } from "nanoid";
import {
  ACCELERATING_EVENT,
  ACCELERATING_STATE,
  MOVE_STATE,
  RUNNING_EVENT,
  RUNNING_STATE,
  SET_CONTEXT,
  STOP_EVENT,
  STOP_STATE,
} from "./machine-constants";
import { assign, createMachine } from "xstate";
import { ComplexFSMContext } from "./createLiskovFSMInput";

const description = "Car FMS";

export const simpleCarMachine = createMachine({
  id: nanoid(15),
  initial: STOP_STATE,
  description,
  context: {
    rigidBody: null,
    mesh: null,
  },
  states: {
    [STOP_STATE]: {
      on: {
        [STOP_EVENT]: {
          target: STOP_STATE,
        },
        [RUNNING_EVENT]: {
          target: RUNNING_STATE,
        },
        [ACCELERATING_EVENT]: {
          target: ACCELERATING_STATE,
        },
        [SET_CONTEXT]: {
          actions: [
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

                // return context.rigidBody;
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
                  return event.mesh;
                }

                // return context.mesh;
              },
            }),
          ],
        },
      },
    },
    [RUNNING_STATE]: {
      on: {
        [STOP_EVENT]: {
          target: STOP_STATE,
        },
        [RUNNING_EVENT]: {
          target: RUNNING_STATE,
        },
        [ACCELERATING_EVENT]: {
          target: ACCELERATING_STATE,
        },
      },
    },
    [ACCELERATING_STATE]: {
      on: {
        [STOP_EVENT]: {
          target: STOP_STATE,
        },
        [RUNNING_EVENT]: {
          target: RUNNING_STATE,
        },
        [ACCELERATING_EVENT]: {
          target: ACCELERATING_STATE,
        },
      },
    },
  },
});
