import { createMachine } from "xstate";
import { createBaseFSMInput } from "./createBaseFSMInput";

const { baseMachineStateInput, baseMachineConfigInput } = createBaseFSMInput();

export const ZombieMachine = createMachine(
  baseMachineStateInput,
  baseMachineConfigInput
);
