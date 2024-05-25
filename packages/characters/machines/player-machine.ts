import { createMachine } from "xstate";
import { createBaseFSMInput } from "./createBaseFSMInput";
const { baseMachineStateInput, baseMachineConfigInput } = createBaseFSMInput();

export const PlayerMachine = createMachine(
  baseMachineStateInput,
  baseMachineConfigInput
);
