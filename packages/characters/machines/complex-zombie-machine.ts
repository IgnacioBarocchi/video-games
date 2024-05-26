import { createMachine } from "xstate";
import { createBaseFSMInput } from "./createLiskovFSMInput";

const { baseMachineStateInput, baseMachineConfigInput } = createBaseFSMInput();

export const complexZombieMachine = createMachine(
  baseMachineStateInput,
  baseMachineConfigInput
);
