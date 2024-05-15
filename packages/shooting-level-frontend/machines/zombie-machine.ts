import { createMachine } from "xstate";
import { createBaseFSMInput } from "./createBaseFSMInput";

const { baseMachineStateInput, baseMachineConfigInput } = createBaseFSMInput();

console.log("zombie", baseMachineStateInput.id);
export const ZombieMachine = createMachine(
  baseMachineStateInput,
  baseMachineConfigInput
);
