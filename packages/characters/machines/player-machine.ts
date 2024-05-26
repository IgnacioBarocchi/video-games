import { createMachine } from "xstate";
import { createBaseFSMInput } from "./createLiskovFSMInput";
const { baseMachineStateInput, baseMachineConfigInput } = createBaseFSMInput();

export const PlayerMachine = createMachine(
  baseMachineStateInput,
  baseMachineConfigInput
);
