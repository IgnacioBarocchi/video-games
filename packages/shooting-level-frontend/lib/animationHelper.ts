import { AnimationAction, LoopOnce } from "three";
import {
  DEATH_STATE,
  FSMStates,
  IDLE_STATE,
  MOVE_STATE,
} from "../machines/fsmbeta";

export const blendAnimationTransition = (action: AnimationAction | null) => {
  if (!action) return;
  action.reset()?.fadeIn(0.2)?.play();
};

export const playOneShotAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action?.reset()?.play();
};

export const easeOutAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action?.fadeOut(0.2);
};

export const stopAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action.fadeOut(0.2);
  action?.stop();
};

export const stopAll = (actions: AnimationAction[] | null) => {
  if (!actions) return;

  for (const action of actions) {
    action.fadeOut(0.2).stop();
  }
};

export const playFinalAnimation = (action: AnimationAction | null) => {
  if (!action) return;
  action.setLoop(LoopOnce, 1);
  action.clampWhenFinished = true;
  action.enabled = true;
  action.reset().play();
};

export const getFSMOneShotPlayerFrom = (
  state: FSMStates,
  animationNameByFSMState,
  animationDurationByFSMState
) => {
  return {
    with: (context: FSMContext) => {
      if (state === DEATH_STATE) {
        throw new Error("use play final animation");
        // don't play audios here
      }

      if (context.actions) {
        const action =
          context.actions[animationNameByFSMState.get(state)!] ??
          context.actions[animationNameByFSMState.get(IDLE_STATE)!];

        easeOutAnimation(
          context.actions[animationNameByFSMState.get(IDLE_STATE)!]
        );
        easeOutAnimation(
          context.actions[animationNameByFSMState.get(MOVE_STATE)!]
        );
        playOneShotAnimation(action);

        setTimeout(() => {
          easeOutAnimation(action);
        }, animationDurationByFSMState.get(state));
      }
    },
  };
};
