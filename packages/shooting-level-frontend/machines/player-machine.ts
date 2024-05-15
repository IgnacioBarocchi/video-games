import { createMachine } from "xstate";
import { createBaseFSMInput } from "./createBaseFSMInput";
const { baseMachineStateInput, baseMachineConfigInput } = createBaseFSMInput();

console.log("player", baseMachineStateInput.id);
export const PlayerMachine = createMachine(
  baseMachineStateInput,
  baseMachineConfigInput
);
